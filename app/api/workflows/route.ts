import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: List all workflows
export async function GET() {
    try {
        const workflows = await prisma.workflow.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return NextResponse.json(workflows);
    } catch (error) {
        console.error('Error fetching workflows:', error);
        return NextResponse.json({ error: 'Failed to fetch workflows' }, { status: 500 });
    }
}

// POST: Create new workflow
export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        const workflow = await prisma.workflow.create({
            data: {
                name: name || 'Untitled Workflow',
                nodes: JSON.stringify([{
                    id: 'user-1',
                    type: 'userNode',
                    position: { x: 250, y: 250 },
                    data: { label: 'User' },
                }]),
                edges: JSON.stringify([]),
            },
        });

        return NextResponse.json(workflow);
    } catch (error) {
        console.error('Error creating workflow:', error);
        return NextResponse.json({ error: 'Failed to create workflow' }, { status: 500 });
    }
}

// DELETE: Delete workflow
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Workflow ID required' }, { status: 400 });
        }

        await prisma.workflow.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting workflow:', error);
        return NextResponse.json({ error: 'Failed to delete workflow' }, { status: 500 });
    }
}

// PATCH: Rename workflow
export async function PATCH(request: Request) {
    try {
        const { id, name } = await request.json();

        if (!id || !name) {
            return NextResponse.json({ error: 'ID and name required' }, { status: 400 });
        }

        const workflow = await prisma.workflow.update({
            where: { id },
            data: { name },
        });

        return NextResponse.json(workflow);
    } catch (error) {
        console.error('Error renaming workflow:', error);
        return NextResponse.json({ error: 'Failed to rename workflow' }, { status: 500 });
    }
}
