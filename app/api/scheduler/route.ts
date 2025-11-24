import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

// This endpoint is called by GitHub Actions cron job
export async function POST(request: Request) {
    try {
        // Verify authentication from GitHub Actions
        const authHeader = request.headers.get('authorization');
        const expectedToken = process.env.CRON_SECRET;

        if (!expectedToken) {
            console.error('CRON_SECRET not configured');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
            console.error('Unauthorized scheduler access attempt');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const settings = await prisma.settings.findUnique({ where: { id: 1 } });
        if (!settings?.isRunning) {
            return NextResponse.json({ message: 'Automation is paused' });
        }

        // Get all workflows and process each one
        const workflows = await prisma.workflow.findMany();
        const allResults: any[] = [];

        for (const workflow of workflows) {
            const nodes = JSON.parse(workflow.nodes);
            const edges = JSON.parse(workflow.edges);

            // Find paths from User -> Page -> Video
            const pageNodes = nodes.filter((n: any) => n.type === 'pageNode');

            for (const pageNode of pageNodes) {
                // Find connected video nodes
                const videoEdges = edges.filter((e: any) => e.source === pageNode.id);

                for (const edge of videoEdges) {
                    const videoNode = nodes.find((n: any) => n.id === edge.target);
                    if (videoNode && videoNode.type === 'videoNode') {
                        // Process this pair
                        const pageData = await prisma.page.findUnique({ where: { nodeId: pageNode.id } });

                        // Get videos from the node's queue data (workflow is source of truth)
                        const videoQueue = videoNode.data?.queue || [];
                        const videoToPost = videoQueue[0]; // Get first video

                        if (pageData && videoToPost) {
                            // Get caption - either from video or from connected caption node
                            let caption = 'Posted via ReelPilot';

                            // Check if video has custom caption
                            if (typeof videoToPost === 'object' && videoToPost.caption) {
                                caption = videoToPost.caption;

                                // If chainDefault is true, append the default caption
                                if (videoToPost.chainDefault) {
                                    // Find connected caption node
                                    const captionEdge = edges.find((e: any) =>
                                        e.source === pageNode.id &&
                                        nodes.find((n: any) => n.id === e.target && n.type === 'captionNode')
                                    );

                                    if (captionEdge) {
                                        const captionNode = nodes.find((n: any) => n.id === captionEdge.target);
                                        if (captionNode?.data?.caption) {
                                            caption = `${caption}\n\n${captionNode.data.caption}`;
                                        }
                                    }
                                }
                            } else if (typeof videoToPost !== 'object' || !videoToPost.caption) {
                                // No custom caption, use default caption node if available
                                const captionEdge = edges.find((e: any) =>
                                    e.source === pageNode.id &&
                                    nodes.find((n: any) => n.id === e.target && n.type === 'captionNode')
                                );

                                if (captionEdge) {
                                    const captionNode = nodes.find((n: any) => n.id === captionEdge.target);
                                    if (captionNode?.data?.caption) {
                                        caption = captionNode.data.caption;
                                    }
                                }
                            }

                            try {
                                // Get video URL
                                const videoUrl = typeof videoToPost === 'string' ? videoToPost : videoToPost.url;

                                // Post video to Facebook
                                console.log(`Posting video ${videoUrl} to page ${pageData.name} with caption: ${caption}`);

                                await axios.post(`https://graph.facebook.com/v19.0/${pageData.facebookId}/videos`, null, {
                                    params: {
                                        access_token: pageData.accessToken,
                                        file_url: videoUrl,
                                        description: caption
                                    }
                                });

                                allResults.push({
                                    nodeId: videoNode.id,
                                    page: pageData.name,
                                    video: videoUrl,
                                    status: 'Posted'
                                });
                            } catch (postError: any) {
                                console.error('Facebook Post Error:', postError.response?.data || postError.message);
                                const videoUrl = typeof videoToPost === 'string' ? videoToPost : videoToPost.url;
                                allResults.push({
                                    page: pageData.name,
                                    video: videoUrl,
                                    status: 'Error: ' + (postError.response?.data?.error?.message || postError.message)
                                });
                            }
                        }
                    }
                }
            }
        }

        return NextResponse.json({ success: true, results: allResults });
    } catch (error) {
        console.error('Scheduler error:', error);
        return NextResponse.json({ error: 'Scheduler failed' }, { status: 500 });
    }
}
