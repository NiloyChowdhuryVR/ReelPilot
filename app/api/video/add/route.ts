import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { nodeId, url } = await request.json();

        const video = await prisma.videoQueue.create({
            data: {
                nodeId,
                url,
                status: 'PENDING',
            },
        });

        return NextResponse.json(video);
    } catch (error) {
        console.error('Error adding video:', error);
        return NextResponse.json({ error: 'Failed to add video' }, { status: 500 });
    }
}
