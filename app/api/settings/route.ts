import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const settings = await prisma.settings.findUnique({
            where: { id: 1 }
        });

        if (!settings) {
            // Return default settings if none exist
            return NextResponse.json({
                id: 1,
                interval: 30,
                isRunning: false
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

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
