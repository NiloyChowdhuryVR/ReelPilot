import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const nodeId = searchParams.get('nodeId');
        const url = searchParams.get('url');

        if (!nodeId || !url) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        // Delete the video from the database
        await prisma.videoQueue.deleteMany({
            where: {
                nodeId,
                url,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting video:', error);
        return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
    }
}
