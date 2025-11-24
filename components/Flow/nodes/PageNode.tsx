'use client';

import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { LayoutTemplate, Check, X, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useWorkflowStore } from '@/store/workflowStore';
import toast from 'react-hot-toast';

export default function PageNode({ id, data }: NodeProps) {
  const [facebookId, setFacebookId] = useState(data.facebookId || '');
  const [accessToken, setAccessToken] = useState(data.accessToken || '');
  const [pageName, setPageName] = useState(data.pageName || '');
  const [isVerified, setIsVerified] = useState(data.isVerified || false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { nodes, saveWorkflow } = useWorkflowStore();

  const verifyPage = async () => {
    if (!facebookId || !accessToken) return;
    
    setIsVerifying(true);
    try {
      const response = await axios.post('/api/page/verify', {
        nodeId: id,
        facebookId,
        accessToken
      });
      
      setPageName(response.data.name || 'Facebook Page');
      setIsVerified(true);
      
      // Update node data
      data.facebookId = facebookId;
      data.accessToken = accessToken;
      data.pageName = response.data.name;
      data.isVerified = true;
      
      await saveWorkflow();
    } catch (error) {
      console.error(error);
      setIsVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDelete = () => {
    const updatedNodes = nodes.filter(n => n.id !== id);
    useWorkflowStore.setState({ nodes: updatedNodes });
    saveWorkflow();
    toast.success('Page node deleted');
  };

  return (
    <div className="bg-neutral-800 border-2 border-purple-500 rounded-xl p-4 shadow-lg w-80 relative">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-purple-500 border-2 border-neutral-800" 
      />
      
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1 hover:bg-neutral-700 rounded transition-colors"
        title="Delete node"
      >
        <Trash2 size={14} className="text-neutral-400 hover:text-red-500" />
      </button>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <LayoutTemplate size={20} className="text-purple-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white">{pageName || 'Facebook Page'}</h3>
          <p className="text-xs text-neutral-400">
            {isVerified ? '✓ Verified' : 'Not verified'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-neutral-500 block mb-1">Page ID</label>
          <input 
            type="text" 
            value={facebookId}
            onChange={(e) => setFacebookId(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-500"
            placeholder="123456789"
          />
        </div>
        
        <div>
          <label className="text-xs text-neutral-500 block mb-1">Access Token</label>
          <input 
            type="password" 
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-500"
            placeholder="EAAB..."
          />
        </div>
        
        <button
          onClick={verifyPage}
          disabled={isVerifying || !facebookId || !accessToken}
          className="w-full py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-neutral-700 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
        >
          {isVerifying ? 'Verifying...' : 'Verify Page'}
        </button>
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-purple-500 border-2 border-neutral-800" 
      />
    </div>
  );
}
