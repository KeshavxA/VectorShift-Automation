"""Vercel serverless handler for POST /api/parse (pipeline DAG validation)."""
import json
from http.server import BaseHTTPRequestHandler


def is_dag(nodes, edges):
    node_ids = {n.get("id") for n in nodes if isinstance(n, dict)}
    node_ids.discard(None)
    indeg = {nid: 0 for nid in node_ids}
    adj = {nid: [] for nid in node_ids}
    for e in edges:
        if not isinstance(e, dict):
            continue
        s, t = e.get("source"), e.get("target")
        if s in indeg and t in indeg:
            adj[s].append(t)
            indeg[t] += 1
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


class handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length).decode("utf-8") if length else "{}"
            data = json.loads(raw)
            nodes = data.get("nodes") or []
            edges = data.get("edges") or []
            if not isinstance(nodes, list):
                nodes = []
            if not isinstance(edges, list):
                edges = []
            body = json.dumps(
                {
                    "num_nodes": len(nodes),
                    "num_edges": len(edges),
                    "is_dag": is_dag(nodes, edges),
                }
            ).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._cors()
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except (json.JSONDecodeError, ValueError):
            err = json.dumps({"error": "Invalid JSON"}).encode("utf-8")
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self._cors()
            self.end_headers()
            self.wfile.write(err)
