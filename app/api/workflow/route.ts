import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nodes, edges, workflowId } = body;

        if (!workflowId) {
            return NextResponse.json({ error: 'Workflow ID required' }, { status: 400 });
        }

        const workflow = await prisma.workflow.update({
            where: { id: workflowId },
            data: {
                nodes: JSON.stringify(nodes),
                edges: JSON.stringify(edges),
            },
        });

        return NextResponse.json(workflow);
    } catch (error) {
        console.error('Error saving workflow:', error);
        return NextResponse.json({ error: 'Failed to save workflow' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const workflowId = searchParams.get('id');

        if (!workflowId) {
            return NextResponse.json({ error: 'Workflow ID required' }, { status: 400 });
        }

        const workflow = await prisma.workflow.findUnique({
            where: { id: workflowId },
        });

        if (!workflow) {
            return NextResponse.json({ nodes: [], edges: [] });
        }

        return NextResponse.json({
            nodes: JSON.parse(workflow.nodes),
            edges: JSON.parse(workflow.edges),
        });
    } catch (error) {
        console.error('Error loading workflow:', error);
        return NextResponse.json({ error: 'Failed to load workflow' }, { status: 500 });
    }
}
