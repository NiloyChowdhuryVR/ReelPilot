'use client';

import React from 'react';
import { Handle, Position } from 'reactflow';
import { User } from 'lucide-react';

export default function UserNode() {
  return (
    <div className="bg-neutral-800 border-2 border-blue-500 rounded-xl p-4 shadow-lg w-64">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <User size={20} className="text-blue-500" />
        </div>
        <div>
          <h3 className="font-bold text-white">User</h3>
          <p className="text-xs text-neutral-400">Workflow Trigger</p>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-blue-500 border-2 border-neutral-800" 
      />
    </div>
  );
}
