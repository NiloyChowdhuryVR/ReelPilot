'use client';

import React from 'react';
import { LayoutTemplate, Video, MessageSquare } from 'lucide-react';

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-black border-r border-gray-800 p-4">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Nodes</h2>
      
      <div className="space-y-2">
        <div
          className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg cursor-move hover:bg-gray-800 transition-colors border border-gray-800 hover:border-blue-500/50"
          draggable
          onDragStart={(e) => onDragStart(e, 'pageNode')}
        >
          <div className="p-2 bg-purple-500/20 rounded">
            <LayoutTemplate size={16} className="text-purple-400" />
          </div>
          <span className="text-sm font-medium">Facebook Page</span>
        </div>

        <div
          className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg cursor-move hover:bg-gray-800 transition-colors border border-gray-800 hover:border-blue-500/50"
          draggable
          onDragStart={(e) => onDragStart(e, 'videoNode')}
        >
          <div className="p-2 bg-red-500/20 rounded">
            <Video size={16} className="text-red-400" />
          </div>
          <span className="text-sm font-medium">Video Source</span>
        </div>

        <div
          className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg cursor-move hover:bg-gray-800 transition-colors border border-gray-800 hover:border-blue-500/50"
          draggable
          onDragStart={(e) => onDragStart(e, 'captionNode')}
        >
          <div className="p-2 bg-yellow-500/20 rounded">
            <MessageSquare size={16} className="text-yellow-400" />
          </div>
          <span className="text-sm font-medium">Default Caption</span>
        </div>
      </div>
    </aside>
  );
}
