'use client';

import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { MessageSquare, Trash2 } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import toast from 'react-hot-toast';

export default function CaptionNode({ id, data }: NodeProps) {
  const [caption, setCaption] = useState(data.caption || '');
  const { nodes, saveWorkflow } = useWorkflowStore();

  const handleCaptionChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCaption = e.target.value;
    setCaption(newCaption);
    data.caption = newCaption;
    await saveWorkflow();
  };

  const handleDelete = () => {
    const updatedNodes = nodes.filter(n => n.id !== id);
    useWorkflowStore.setState({ nodes: updatedNodes });
    saveWorkflow();
    toast.success('Caption node deleted');
  };

  return (
    <div className="bg-neutral-800 border-2 border-yellow-500 rounded-xl p-4 shadow-lg w-64 relative">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-yellow-500 border-2 border-neutral-800" 
      />
      
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1 hover:bg-neutral-700 rounded transition-colors"
        title="Delete node"
      >
        <Trash2 size={14} className="text-neutral-400 hover:text-red-500" />
      </button>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-500/20 rounded-lg">
          <MessageSquare size={20} className="text-yellow-500" />
        </div>
        <div>
          <h3 className="font-bold text-white">Default Caption</h3>
          <p className="text-xs text-neutral-400">For all videos</p>
        </div>
      </div>

      <textarea
        value={caption}
        onChange={handleCaptionChange}
        className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500 resize-none"
        placeholder="Enter default caption/tags..."
        rows={4}
      />
    </div>
  );
}
