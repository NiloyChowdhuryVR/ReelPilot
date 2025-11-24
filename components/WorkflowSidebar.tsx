'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Edit2, RotateCcw, Check, X } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import toast from 'react-hot-toast';

export default function WorkflowSidebar() {
  const { 
    workflows, 
    activeWorkflowId, 
    fetchWorkflows, 
    createWorkflow, 
    switchWorkflow, 
    deleteWorkflow, 
    renameWorkflow,
    resetWorkflow 
  } = useWorkflowStore();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const handleRename = async (id: string) => {
    if (editName.trim()) {
      await renameWorkflow(id, editName);
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteWorkflow(id);
    toast.success('Workflow deleted');
  };

  const handleReset = async () => {
    await resetWorkflow();
    toast.success('Workflow reset');
  };

  return (
    <aside className="w-64 bg-black border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Workflows</h2>
        <button
          onClick={() => createWorkflow()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          <Plus size={16} />
          New Workflow
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {workflows.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            No workflows yet
          </div>
        ) : (
          workflows.map((workflow) => (
            <div
              key={workflow.id}
              className={`group relative mb-1 rounded-lg transition-colors cursor-pointer ${
                activeWorkflowId === workflow.id
                  ? 'bg-blue-600/20 border border-blue-500/50'
                  : 'hover:bg-gray-900 border border-transparent hover:border-gray-700'
              }`}
            >
              {editingId === workflow.id ? (
                <div className="flex items-center gap-1 p-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRename(workflow.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    className="flex-1 bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => handleRename(workflow.id)}
                    className="p-1 hover:bg-neutral-700 rounded"
                  >
                    <Check size={14} className="text-green-500" />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1 hover:bg-neutral-700 rounded"
                  >
                    <X size={14} className="text-red-500" />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => switchWorkflow(workflow.id)}
                    className="w-full flex items-center gap-2 p-2 text-left"
                  >
                    <FileText size={16} className={activeWorkflowId === workflow.id ? 'text-blue-400' : 'text-neutral-400'} />
                    <span className="flex-1 text-sm truncate">{workflow.name}</span>
                  </button>
                  
                  {activeWorkflowId === workflow.id && (
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={handleReset}
                        className="p-1 hover:bg-neutral-700 rounded"
                        title="Reset workflow"
                      >
                        <RotateCcw size={14} className="text-neutral-400 hover:text-white" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(workflow.id);
                          setEditName(workflow.name);
                        }}
                        className="p-1 hover:bg-neutral-700 rounded"
                        title="Rename"
                      >
                        <Edit2 size={14} className="text-neutral-400 hover:text-white" />
                      </button>
                      <button
                        onClick={() => handleDelete(workflow.id)}
                        className="p-1 hover:bg-neutral-700 rounded"
                        title="Delete"
                      >
                        <Trash2 size={14} className="text-neutral-400 hover:text-red-500" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
