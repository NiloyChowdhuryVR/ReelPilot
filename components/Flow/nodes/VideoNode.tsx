'use client';

import React, { useState, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Video, Plus, X, Link as LinkIcon, Trash2, Link2, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useWorkflowStore } from '@/store/workflowStore';
import toast from 'react-hot-toast';

export default function VideoNode({ id, data }: NodeProps) {
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [chainDefaultCaption, setChainDefaultCaption] = useState(false);
  const [queue, setQueue] = useState<{ url: string; caption?: string; chainDefault?: boolean }[]>(data.queue || []);
  const { saveWorkflow, nodes } = useWorkflowStore();

  // Sync local state with node data changes (e.g., when scheduler removes a video)
  useEffect(() => {
    setQueue(data.queue || []);
  }, [data.queue]);

  const addVideo = async () => {
    if (!videoUrl) return;
    
    // Update local state and node data
    const newVideo = { 
      url: videoUrl, 
      caption: caption || undefined,
      chainDefault: chainDefaultCaption 
    };
    const newQueue = [...queue, newVideo];
    setQueue(newQueue);
    data.queue = newQueue;
    
    // Save to database
    try {
        await axios.post('/api/video/add', { nodeId: id, url: videoUrl, caption });
        // Save workflow to persist the queue
        await saveWorkflow();
    } catch (e) {
        console.error("Failed to add video", e);
    }

    setVideoUrl('');
    setCaption('');
    setChainDefaultCaption(false);
  };

  const removeVideo = async (index: number) => {
    const videoItem = queue[index];
    const videoUrl = typeof videoItem === 'string' ? videoItem : videoItem.url;
    const newQueue = queue.filter((_, i) => i !== index);
    setQueue(newQueue);
    data.queue = newQueue;
    
    // Delete from database
    try {
      await axios.delete(`/api/video/delete?nodeId=${id}&url=${encodeURIComponent(videoUrl)}`);
    } catch (e) {
      console.error("Failed to delete video from database", e);
    }
    
    // Save workflow to persist the change
    await saveWorkflow();
  };

  const handleDelete = () => {
    const updatedNodes = nodes.filter(n => n.id !== id);
    useWorkflowStore.setState({ nodes: updatedNodes });
    saveWorkflow();
    toast.success('Video node deleted');
  };

  return (
    <>
      <div className="bg-neutral-800 border-2 border-red-500 rounded-xl p-4 shadow-lg w-64 relative">
        <Handle 
          type="target" 
          position={Position.Left} 
          className="w-3 h-3 bg-red-500 border-2 border-neutral-800" 
        />
        
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1 hover:bg-neutral-700 rounded transition-colors"
          title="Delete node"
        >
          <Trash2 size={14} className="text-neutral-400 hover:text-red-500" />
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Video size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="font-bold text-white">Video Queue</h3>
            <p className="text-xs text-neutral-400">{queue.length} videos queued</p>
          </div>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="w-full py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Manage Queue
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-neutral-800 rounded-xl w-[600px] max-h-[80vh] flex flex-col shadow-2xl border border-neutral-700">
            <div className="p-4 border-b border-neutral-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">Video Queue Management</h2>
                <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              
              {/* Auto-chain toggle */}
              <label className="flex items-center gap-2 p-2 bg-neutral-900 rounded-lg cursor-pointer hover:bg-neutral-800 transition-colors">
                <input
                  type="checkbox"
                  checked={chainDefaultCaption}
                  onChange={(e) => setChainDefaultCaption(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
                <div className="flex items-center gap-2 flex-1">
                  <Link2 size={14} className={chainDefaultCaption ? 'text-blue-400' : 'text-neutral-500'} />
                  <span className="text-sm">Auto-chain default caption for all videos</span>
                </div>
              </label>
            </div>
            
            <div className="p-4 border-b border-neutral-700 space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    type="text" 
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-600 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-red-500"
                    placeholder="Paste video URL here..."
                  />
                </div>
                <button 
                  onClick={addVideo}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Add
                </button>
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 resize-none"
                placeholder="Custom caption (optional - leave empty to use default caption node)"
                rows={2}
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {queue.length === 0 ? (
                <div className="text-center text-neutral-500 py-8">
                  <Video size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No videos in queue</p>
                  <p className="text-xs mt-1">Add videos above to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {queue.map((item, i) => (
                    <div 
                      key={i} 
                      className="group relative bg-neutral-900 border border-neutral-700 rounded-lg p-3 hover:border-neutral-600 transition-colors"
                    >
                      {/* Header with index and delete button */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 bg-red-500/20 text-red-400 rounded text-xs font-bold">
                            {i + 1}
                          </span>
                          {item.chainDefault && (
                            <div className="group/chain relative">
                              <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400">
                                <Link2 size={12} />
                                <span>Chained</span>
                              </div>
                              <div className="absolute left-0 top-full mt-1 w-40 bg-neutral-800 border border-neutral-700 rounded p-2 text-xs text-neutral-300 opacity-0 group-hover/chain:opacity-100 pointer-events-none transition-opacity z-10 shadow-lg">
                                Default caption will be appended
                              </div>
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => removeVideo(i)}
                          className="p-1.5 hover:bg-red-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove video"
                        >
                          <Trash2 size={14} className="text-neutral-500 hover:text-red-500" />
                        </button>
                      </div>

                      {/* Video URL */}
                      <div className="mb-2">
                        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                          <LinkIcon size={12} />
                          <span>Video URL</span>
                        </div>
                        <div className="bg-neutral-800 rounded px-2 py-1.5 text-xs text-neutral-300 font-mono break-all">
                          {item.url}
                        </div>
                      </div>

                      {/* Caption if exists */}
                      {item.caption && (
                        <div>
                          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                            <MessageSquare size={12} />
                            <span>Custom Caption</span>
                          </div>
                          <div className="bg-neutral-800 rounded px-2 py-1.5 text-xs text-neutral-300 italic">
                            {item.caption}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
