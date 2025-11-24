'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  ReactFlowProvider,
  Node,
  Connection,
  Edge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useWorkflowStore } from '@/store/workflowStore';
import UserNode from './nodes/UserNode';
import PageNode from './nodes/PageNode';
import VideoNode from './nodes/VideoNode';
import CaptionNode from './nodes/CaptionNode';

const nodeTypes = {
  userNode: UserNode,
  pageNode: PageNode,
  videoNode: VideoNode,
  captionNode: CaptionNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

function FlowEditorContent() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    addNode,
    fetchWorkflows,
    workflows,
    activeWorkflowId,
    switchWorkflow,
    createWorkflow
  } = useWorkflowStore();

  useEffect(() => {
    const initializeWorkflows = async () => {
      await fetchWorkflows();
      const currentWorkflows = useWorkflowStore.getState().workflows;
      
      if (currentWorkflows.length === 0) {
        // Create a default workflow if none exist
        await createWorkflow('My First Workflow');
      } else if (!activeWorkflowId) {
        // Load the first workflow if none is active
        await switchWorkflow(currentWorkflows[0].id);
      }
    };
    
    initializeWorkflows();
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode]
  );

  const isValidConnection = (connection: Connection) => {
    const sourceNode = nodes.find(n => n.id === connection.source);
    const targetNode = nodes.find(n => n.id === connection.target);

    if (!sourceNode || !targetNode) return false;

    // User -> Page
    if (sourceNode.type === 'userNode' && targetNode.type === 'pageNode') return true;
    
    // Page -> Video
    if (sourceNode.type === 'pageNode' && targetNode.type === 'videoNode') return true;
    
    // Page -> Caption
    if (sourceNode.type === 'pageNode' && targetNode.type === 'captionNode') return true;

    return false;
  };

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        isValidConnection={isValidConnection}
        defaultViewport={defaultViewport}
        fitView
        className="bg-neutral-900"
      >
        <Background color="#333" gap={20} />
        <Controls 
          className="!bg-gray-900 !border-gray-700 [&_button]:!bg-gray-800 [&_button]:!border-gray-700 [&_button]:!text-white [&_button:hover]:!bg-gray-700 [&_button]:!fill-white"
        />
      </ReactFlow>
      
      <style jsx global>{`
        .react-flow__controls {
          background: #111827 !important;
          border: 1px solid #374151 !important;
        }
        .react-flow__controls button {
          background: #1f2937 !important;
          border-bottom: 1px solid #374151 !important;
          color: white !important;
        }
        .react-flow__controls button:hover {
          background: #374151 !important;
        }
        .react-flow__controls button svg {
          fill: white !important;
        }
        .react-flow__controls button path {
          fill: white !important;
        }
      `}</style>
    </div>
  );
}

export default function FlowEditor() {
  return (
    <ReactFlowProvider>
      <FlowEditorContent />
    </ReactFlowProvider>
  );
}
