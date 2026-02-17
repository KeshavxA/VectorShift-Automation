import { useRef } from 'react';
import { useStore } from './store';
import { pipelineTemplates } from './templates';
import styles from './PipelineActions.module.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

export const PipelineActions = () => {
  const fileInputRef = useRef(null);

  const { nodes, edges, loadPipeline, clearCanvas } = useStore();

  const handleExport = () => {
    const data = { nodes, edges, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pipeline-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        const n = Array.isArray(data.nodes) ? data.nodes : [];
        const ed = Array.isArray(data.edges) ? data.edges : [];
        loadPipeline(n, ed);
      } catch (err) {
        alert('Invalid pipeline file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleLoadTemplate = (template) => {
    loadPipeline(template.pipeline.nodes, template.pipeline.edges);
  };

  const handleClear = () => {
    if (nodes.length || edges.length) {
      if (window.confirm('Clear the canvas? This cannot be undone.')) {
        clearCanvas();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const safeNodes = Array.isArray(nodes)
        ? nodes.map((n) => ({ id: n?.id, type: n?.type, position: n?.position, data: n?.data }))
        : [];
      const safeEdges = Array.isArray(edges)
        ? edges.map((e) => ({ id: e?.id, source: e?.source, target: e?.target }))
        : [];

      const res = await fetch(`${API_BASE}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: safeNodes, edges: safeEdges }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed (${res.status}): ${text}`);
      }

      const data = await res.json();
      useStore.setState({
        result: {
          num_nodes: data.num_nodes,
          num_edges: data.num_edges,
          is_dag: data.is_dag,
          open: true,
        },
      });
    } catch (err) {
      useStore.setState({
        result: {
          error: err?.message || String(err),
          open: true,
        },
      });
    }
  };

  return (
    <div className={styles.actions}>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={handleSubmit} title="Validate pipeline">
          ▶ Validate
        </button>
        <button className={styles.btn} onClick={handleExport} title="Export as JSON">
          ↓ Export
        </button>
        <button className={styles.btn} onClick={handleImportClick} title="Import from JSON">
          ↑ Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportFile}
          style={{ display: 'none' }}
        />
        <button className={styles.btnClear} onClick={handleClear} title="Clear canvas">
          ✕ Clear
        </button>
      </div>
      <div className={styles.templates}>
        <span className={styles.templatesLabel}>Templates:</span>
        {pipelineTemplates.map((t) => (
          <button
            key={t.id}
            className={styles.templateBtn}
            onClick={() => handleLoadTemplate(t)}
            title={t.description}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
};
