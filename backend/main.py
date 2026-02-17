"""
Vector Shift Backend API

Provides pipeline validation endpoints. Accepts nodes and edges from the frontend,
validates the pipeline as a DAG (Directed Acyclic Graph), and returns metrics.
"""

from typing import Any, Dict, List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Vector Shift API", description="Pipeline validation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost", "http://127.0.0.1", "http://127.0.0.1:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    """Health check endpoint. Returns Pong when the server is running."""
    return {'Ping': 'Pong'}


@app.get('/health')
def health_check():
    """
    Detailed health check for monitoring and load balancers.
    Returns status, version info, and service name.
    """
    return {
        'status': 'healthy',
        'service': 'VectorShift API',
        'version': '1.0',
    }


class Edge(BaseModel):
    source: str
    target: str


class PipelinePayload(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Edge]


def is_dag(nodes: List[Dict[str, Any]], edges: List[Edge]) -> bool:
    """
    Validate that the pipeline graph is a DAG (no cycles).
    Uses Kahn's algorithm (topological sort) to detect cycles.
    """
    node_ids = {n.get("id") for n in nodes if isinstance(n, dict)}
    node_ids.discard(None)

    indeg: Dict[str, int] = {nid: 0 for nid in node_ids}
    adj: Dict[str, List[str]] = {nid: [] for nid in node_ids}

    for e in edges:
        if e.source in indeg and e.target in indeg:
            adj[e.source].append(e.target)
            indeg[e.target] += 1

    queue = [nid for nid, d in indeg.items() if d == 0]
    seen = 0

    while queue:
        u = queue.pop()
        seen += 1
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)

    return seen == len(indeg)


@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    """
    Parse and validate a pipeline. Returns node count, edge count, and DAG validity.
    """
    return {
        "num_nodes": len(payload.nodes),
        "num_edges": len(payload.edges),
        "is_dag": is_dag(payload.nodes, payload.edges),
    }
