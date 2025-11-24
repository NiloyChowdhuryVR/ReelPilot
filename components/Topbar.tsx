'use client';

import React from 'react';
import { Play, Pause, Save, Cloud } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';

export default function Topbar() {
  const { isRunning, toggleRunning, saveWorkflow } = useWorkflowStore();

  return (
    <div className="h-16 bg-black border-b border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Workflow Editor</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={saveWorkflow}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg">
          <Cloud size={14} className="text-blue-400" />
          <span className="text-xs text-gray-400">Cloud Automation</span>
          <span className={`text-xs font-medium ${isRunning ? 'text-green-400' : 'text-gray-500'}`}>
            {isRunning ? 'Active' : 'Paused'}
          </span>
        </div>

        <button
          onClick={toggleRunning}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
            isRunning
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isRunning ? (
            <>
              <Pause size={16} />
              Pause Automation
            </>
          ) : (
            <>
              <Play size={16} />
              Start Automation
            </>
          )}
        </button>
      </div>
    </div>
  );
}
