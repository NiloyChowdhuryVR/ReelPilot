'use client';

import { useWorkflowStore } from '@/store/workflowStore';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Scheduler() {
  const { addLog } = useWorkflowStore();

  // Manual trigger function (can be called from UI if needed)
  const triggerScheduler = async () => {
    try {
      console.log('Manually triggering scheduler...');
      addLog('Manually triggering scheduler...', 'info');
      const response = await axios.post('/api/scheduler');
      
      if (response.data.results && response.data.results.length > 0) {
        response.data.results.forEach((res: any) => {
          addLog(`Posted video to ${res.page}: ${res.video}`, 'success');
        });
        toast.success(`Posted ${response.data.results.length} video(s)`);
      } else if (response.data.message) {
        addLog(response.data.message, 'info');
        toast(response.data.message);
      } else {
        addLog('Scheduler ran, no videos to post', 'info');
        toast('No videos to post');
      }
    } catch (error) {
      console.error('Scheduler failed:', error);
      addLog('Scheduler failed to run', 'error');
      toast.error('Failed to run scheduler');
    }
  };

  // Expose trigger function globally for manual use
  if (typeof window !== 'undefined') {
    (window as any).triggerScheduler = triggerScheduler;
  }

  return null; // No automatic scheduling, handled by GitHub Actions
}
