import { create } from 'zustand';
import { Edge, Node, OnNodesChange, OnEdgesChange, applyNodeChanges, applyEdgeChanges, addEdge, Connection } from 'reactflow';
import axios from 'axios';
import { LogEntry } from '@/components/StatusLog';

interface WorkflowInfo {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface WorkflowState {
    nodes: Node[];
    edges: Edge[];
    isRunning: boolean;
    interval: number;
    logs: LogEntry[];
    activeWorkflowId: string | null;
    workflows: WorkflowInfo[];

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: (connection: Connection) => void;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    addNode: (node: Node) => void;

    toggleRunning: () => void;
    setInterval: (interval: number) => void;
    saveWorkflow: () => Promise<void>;
    loadWorkflow: (id: string) => Promise<void>;

    fetchWorkflows: () => Promise<void>;
    createWorkflow: (name?: string) => Promise<void>;
    switchWorkflow: (id: string) => Promise<void>;
    deleteWorkflow: (id: string) => Promise<void>;
    renameWorkflow: (id: string, name: string) => Promise<void>;
    resetWorkflow: () => Promise<void>;

    addLog: (message: string, type: 'info' | 'success' | 'error') => void;
    clearLogs: () => void;
    removeVideoFromNode: (nodeId: string, videoUrl: string) => Promise<void>;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
    nodes: [],
    edges: [],
    isRunning: false,
    interval: 30,
    logs: [],
    activeWorkflowId: null,
    workflows: [],

    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },

    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    addNode: (node) => {
        set({ nodes: [...get().nodes, node] });
    },

    toggleRunning: async () => {
        const newStatus = !get().isRunning;

        if (newStatus) {
            await get().saveWorkflow();
        }

        set({ isRunning: newStatus });
        try {
            await axios.post('/api/settings', { isRunning: newStatus });
            get().addLog(`Automation ${newStatus ? 'started' : 'paused'}`, 'info');
        } catch (error) {
            console.error("Failed to update running status", error);
            get().addLog('Failed to update running status', 'error');
        }
    },

    setInterval: (interval) => set({ interval }),

    saveWorkflow: async () => {
        const { nodes, edges, activeWorkflowId } = get();
        if (!activeWorkflowId) {
            get().addLog('No active workflow', 'error');
            return;
        }

        try {
            await axios.post('/api/workflow', { nodes, edges, workflowId: activeWorkflowId });
            get().addLog('Workflow saved successfully', 'success');
        } catch (error) {
            console.error('Failed to save workflow:', error);
            get().addLog('Failed to save workflow', 'error');
        }
    },

    loadWorkflow: async (id: string) => {
        try {
            const response = await axios.get(`/api/workflow?id=${id}`);
            if (response.data) {
                set({
                    nodes: response.data.nodes || [],
                    edges: response.data.edges || [],
                    activeWorkflowId: id
                });
                get().addLog('Workflow loaded', 'info');
            }
        } catch (error) {
            console.error('Failed to load workflow:', error);
            get().addLog('Failed to load workflow', 'error');
        }
    },

    fetchWorkflows: async () => {
        try {
            const response = await axios.get('/api/workflows');
            set({ workflows: response.data });
        } catch (error) {
            console.error('Failed to fetch workflows:', error);
        }
    },

    createWorkflow: async (name?: string) => {
        try {
            const response = await axios.post('/api/workflows', { name });
            await get().fetchWorkflows();
            await get().switchWorkflow(response.data.id);
            get().addLog(`Created workflow: ${response.data.name}`, 'success');
        } catch (error) {
            console.error('Failed to create workflow:', error);
            get().addLog('Failed to create workflow', 'error');
        }
    },

    switchWorkflow: async (id: string) => {
        await get().loadWorkflow(id);
    },

    deleteWorkflow: async (id: string) => {
        try {
            await axios.delete(`/api/workflows?id=${id}`);
            await get().fetchWorkflows();

            // If deleted workflow was active, switch to first available
            if (get().activeWorkflowId === id) {
                const workflows = get().workflows;
                if (workflows.length > 0) {
                    await get().switchWorkflow(workflows[0].id);
                } else {
                    set({ nodes: [], edges: [], activeWorkflowId: null });
                }
            }

            get().addLog('Workflow deleted', 'success');
        } catch (error) {
            console.error('Failed to delete workflow:', error);
            get().addLog('Failed to delete workflow', 'error');
        }
    },

    renameWorkflow: async (id: string, name: string) => {
        try {
            await axios.patch('/api/workflows', { id, name });
            await get().fetchWorkflows();
            get().addLog('Workflow renamed', 'success');
        } catch (error) {
            console.error('Failed to rename workflow:', error);
            get().addLog('Failed to rename workflow', 'error');
        }
    },

    resetWorkflow: async () => {
        set({
            nodes: [{
                id: 'user-1',
                type: 'userNode',
                position: { x: 250, y: 250 },
                data: { label: 'User' },
            }],
            edges: []
        });
        await get().saveWorkflow();
        get().addLog('Workflow reset', 'info');
    },

    addLog: (message, type) => {
        const timestamp = new Date().toLocaleTimeString();
        set(state => ({
            logs: [...state.logs, { timestamp, message, type }].slice(-100)
        }));
    },

    clearLogs: () => set({ logs: [] }),

    removeVideoFromNode: async (nodeId: string, videoUrl: string) => {
        set(state => ({
            nodes: state.nodes.map(node => {
                if (node.id === nodeId) {
                    const currentQueue = node.data.queue || [];
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            queue: currentQueue.filter((item: any) => {
                                const itemUrl = typeof item === 'string' ? item : item.url;
                                return itemUrl !== videoUrl;
                            })
                        }
                    };
                }
                return node;
            })
        }));

        await get().saveWorkflow();
    }
}));
