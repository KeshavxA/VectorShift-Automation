import { useStore } from './store';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

export const SubmitButton = () => {
    const onSubmit = async () => {
        try {
            const { nodes, edges } = useStore.getState();

            const safeNodes = Array.isArray(nodes)
                ? nodes.map((n) => ({
                    id: n?.id,
                    type: n?.type,
                    position: n?.position,
                    data: n?.data,
                }))
                : [];

            const safeEdges = Array.isArray(edges)
                ? edges.map((e) => ({
                    id: e?.id,
                    source: e?.source,
                    target: e?.target,
                    sourceHandle: e?.sourceHandle,
                    targetHandle: e?.targetHandle,
                }))
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
            alert(
                `Parsed pipeline:\n` +
                `Nodes: ${data.num_nodes}\n` +
                `Edges: ${data.num_edges}\n` +
                `Is DAG: ${data.is_dag ? 'Yes' : 'No'}`
            );
        } catch (err) {
            const errorMsg = err?.message || String(err);
            alert(
                `Failed to parse pipeline: ${errorMsg}\n\n` +
                `Make sure:\n` +
                `1. Backend is running on http://localhost:8000\n` +
                `2. Check browser console for details`
            );
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="button" onClick={onSubmit}>Submit</button>
        </div>
    );
}
