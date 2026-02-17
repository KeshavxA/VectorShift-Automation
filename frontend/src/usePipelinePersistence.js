import { useEffect } from 'react';
import { useStore } from './store';

const STORAGE_KEY = 'vectorshift-pipeline';

export const usePipelinePersistence = () => {
  const { nodes, edges } = useStore();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (Array.isArray(data?.nodes) || Array.isArray(data?.edges)) {
          useStore.getState().loadPipeline(data.nodes || [], data.edges || []);
        }
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ nodes, edges, savedAt: new Date().toISOString() })
        );
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [nodes, edges]);
};
