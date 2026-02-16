from typing import Any, Dict, List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost", "http://127.0.0.1", "http://127.0.0.1:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class Edge(BaseModel):
    source: str
    target: str


class PipelinePayload(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Edge]


def is_dag(nodes: List[Dict[str, Any]], edges: List[Edge]) -> bool:
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
    return {
        "num_nodes": len(payload.nodes),
        "num_edges": len(payload.edges),
        "is_dag": is_dag(payload.nodes, payload.edges),
    }
