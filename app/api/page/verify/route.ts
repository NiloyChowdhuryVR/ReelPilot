import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { nodeId, facebookId, accessToken } = await request.json();

        if (!facebookId || !accessToken) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        // Verify with Facebook Graph API
        let name = '';
        try {
            const fbRes = await axios.get(`https://graph.facebook.com/v19.0/${facebookId}?fields=name&access_token=${accessToken}`);
            name = fbRes.data.name;
        } catch (fbError) {
            console.error('Facebook API Error:', fbError);
            return NextResponse.json({ error: 'Invalid Page ID or Access Token' }, { status: 400 });
        }

        const page = await prisma.page.upsert({
            where: { nodeId },
            update: {
                facebookId,
                accessToken,
                name,
            },
            create: {
                nodeId,
                facebookId,
                accessToken,
                name,
            },
        });

        return NextResponse.json(page);
    } catch (error) {
        console.error('Error verifying page:', error);
        return NextResponse.json({ error: 'Failed to verify page' }, { status: 500 });
    }
}
