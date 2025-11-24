'use client';

import React from 'react';
import { Play, Pause, Save } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';

export default function Topbar() {
  const { isRunning, toggleRunning, saveWorkflow, interval, setInterval } = useWorkflowStore();

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
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Interval:</label>
          <select
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value={1}>1 minute</option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
          </select>
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
