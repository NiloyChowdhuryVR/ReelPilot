'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Toaster } from 'react-hot-toast';

import Scheduler from './Scheduler';
import StatusLog from './StatusLog';
import WorkflowSidebar from './WorkflowSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#fff',
            },
          },
        }}
      />
      <Scheduler />
      <StatusLog />
      <WorkflowSidebar />
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 relative bg-gradient-to-br from-black via-gray-950 to-black">
          {children}
        </main>
      </div>
    </div>
  );
}
