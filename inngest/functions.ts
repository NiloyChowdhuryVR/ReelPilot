import { inngest } from "./client";
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

// Scheduled function that runs every 30 minutes
export const scheduledVideoPost = inngest.createFunction(
    {
        id: "scheduled-video-post",
        name: "Scheduled Video Post"
    },
    { cron: "*/30 * * * *" }, // Every 30 minutes
    async ({ event, step }) => {
        return await step.run("post-videos", async () => {
            try {
                const settings = await prisma.settings.findUnique({ where: { id: 1 } });

                if (!settings?.isRunning) {
                    return { message: 'Automation is paused', results: [] };
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

                                // Get videos from the node's queue data
                                const videoQueue = videoNode.data?.queue || [];
                                const videoToPost = videoQueue[0];

                                if (pageData && videoToPost) {
                                    // Get caption
                                    let caption = 'Posted via ReelPilot';

                                    if (typeof videoToPost === 'object' && videoToPost.caption) {
                                        caption = videoToPost.caption;

                                        if (videoToPost.chainDefault) {
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
                                        const videoUrl = typeof videoToPost === 'string' ? videoToPost : videoToPost.url;

                                        console.log(`Posting video ${videoUrl} to page ${pageData.name}`);

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

                return { success: true, results: allResults };
            } catch (error) {
                console.error('Scheduler error:', error);
                throw error;
            }
        });
    }
);
