'use client';

import React, { useEffect, useState } from 'react';
import { Terminal, X } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

export default function StatusLog() {
  const { logs, clearLogs } = useWorkflowStore();
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-neutral-800 border border-neutral-700 p-3 rounded-full shadow-lg hover:bg-neutral-700 transition-colors z-50"
      >
        <Terminal size={20} className="text-blue-400" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl z-50 flex flex-col max-h-80">
      <div className="flex items-center justify-between p-3 border-b border-neutral-800 bg-neutral-800 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-blue-400" />
          <span className="text-xs font-bold text-neutral-300">Automation Logs</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearLogs} className="text-xs text-neutral-500 hover:text-white">Clear</button>
          <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="text-neutral-600 italic text-center py-4">No logs yet...</div>
        ) : (
          logs.map((log, i) => {
            const isPosted = log.message.toLowerCase().includes('posted video');
            return (
              <div key={i} className="flex gap-2">
                <span className="text-neutral-500 shrink-0">[{log.timestamp}]</span>
                <span className={`${
                  isPosted ? 'text-yellow-400 font-bold animate-pulse' :
                  log.type === 'error' ? 'text-red-400' : 
                  log.type === 'success' ? 'text-green-400' : 
                  'text-blue-300'
                }`}>
                  {log.message}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
