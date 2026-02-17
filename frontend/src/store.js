import { create } from "zustand";
import {addEdge,applyNodeChanges,applyEdgeChanges,MarkerType,} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  result: null,
  reactFlowInstance: null,
  isValidationLoading: false,
  theme: (() => {
    try {
      return localStorage.getItem('vectorshift-theme') || 'light';
    } catch {
      return 'light';
    }
  })(),
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },
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
      edges: addEdge({ ...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' } }, get().edges),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  loadPipeline: (nodes, edges) => set({ nodes: nodes || [], edges: edges || [] }),
  clearCanvas: () => set({ nodes: [], edges: [], nodeIDs: {} }),
  setReactFlowInstance: (instance) => set({ reactFlowInstance: instance }),
  setIsValidationLoading: (loading) => set({ isValidationLoading: loading }),
  setTheme: (theme) => {
    try {
      localStorage.setItem('vectorshift-theme', theme);
    } catch {}
    set({ theme });
    document.documentElement.setAttribute('data-theme', theme);
  },
  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(next);
  },
  deleteSelectedNodes: () => {
    const { nodes, edges } = get();
    const selectedIds = nodes.filter((n) => n.selected).map((n) => n.id);
    if (selectedIds.length === 0) return;
    const newNodes = nodes.filter((n) => !n.selected);
    const newEdges = edges.filter(
      (e) => !selectedIds.includes(e.source) && !selectedIds.includes(e.target)
    );
    set({ nodes: newNodes, edges: newEdges });
  },
}));
