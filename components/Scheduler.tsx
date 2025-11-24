'use client';

import { useEffect } from 'react';
import { useWorkflowStore } from '@/store/workflowStore';
import axios from 'axios';

export default function Scheduler() {
  const { isRunning, interval, addLog, removeVideoFromNode } = useWorkflowStore();

  useEffect(() => {
    if (!isRunning) return;

    const runScheduler = async () => {
      try {
        console.log('Running scheduler...');
        addLog('Running scheduler...', 'info');
        const response = await axios.post('/api/scheduler');
        
        if (response.data.results && response.data.results.length > 0) {
            response.data.results.forEach((res: any) => {
                addLog(`Posted video to ${res.page}: ${res.video}`, 'success');
                if (res.nodeId) {
                    removeVideoFromNode(res.nodeId, res.video);
                }
            });
        } else if (response.data.message) {
            addLog(response.data.message, 'info');
        } else {
            addLog('Scheduler ran, no videos to post', 'info');
        }
      } catch (error) {
        console.error('Scheduler failed:', error);
        addLog('Scheduler failed to run', 'error');
      }
    };

    // Run immediately on start
    runScheduler();

    // Then run on interval
    const timer = setInterval(runScheduler, interval * 60 * 1000);

    return () => clearInterval(timer);
  }, [isRunning, interval]);

  return null;
}
