import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { interval, isRunning } = await request.json();

        const settings = await prisma.settings.upsert({
            where: { id: 1 },
            update: {
                ...(interval !== undefined && { interval }),
                ...(isRunning !== undefined && { isRunning }),
            },
            create: {
                interval: interval || 30,
                isRunning: isRunning || false,
            },
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
