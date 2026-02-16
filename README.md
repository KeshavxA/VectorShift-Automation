# Vector Shift

A visual pipeline builder for AI and data workflows. Design node-based pipelines using a drag-and-drop canvas, connect nodes to define data flow, and validate pipeline structure via a FastAPI backend.

![Pipeline Builder](https://img.shields.io/badge/React-18.2-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green) ![ReactFlow](https://img.shields.io/badge/ReactFlow-11.8-purple)

---

## Features

- **Visual pipeline editor** — Drag-and-drop nodes onto a canvas
- **9 node types** — Input, LLM, Output, Text, Note, Filter, Database, Auth, Logger
- **Connection validation** — Backend validates pipeline as a DAG (Directed Acyclic Graph)
- **Modern stack** — React 18, ReactFlow, Zustand, FastAPI, Pydantic
- **Hot reload** — Development servers support live reload for both frontend and backend

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Toolbar    │  │  Canvas UI   │  │  Submit Button   │   │
│  │  (drag nodes)│  │  (ReactFlow) │  │  (parse pipeline)│   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
│                           │                                  │
│                    Zustand Store                             │
└───────────────────────────│──────────────────────────────────┘
                            │ POST /pipelines/parse
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (FastAPI)                         │
│  • Parse pipeline (nodes + edges)                            │
│  • Validate DAG structure                                    │
│  • Return node count, edge count, is_dag                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.10+ (3.13 recommended)
- **Git** (optional)

---

## Quick Start

### 1. Clone or navigate to the project

```bash
cd Vector-Shift
```

### 2. Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

### 4. Run the project

**Terminal 1 — Backend (port 8000):**

```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 — Frontend (port 3000):**

```bash
cd frontend
npm start
```

### 5. Open in browser

- **App:** [http://localhost:3000](http://localhost:3000)
- **API docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Usage

1. **Add nodes** — Drag node types from the toolbar onto the canvas.
2. **Connect nodes** — Drag from a node’s handle to another node’s handle.
3. **Submit** — Click **Submit** to send the pipeline to the backend and see validation results (node count, edge count, DAG status).

---

## Node Types

| Node       | Color  | Purpose                    |
|-----------|--------|----------------------------|
| Input     | Blue   | Pipeline entry point       |
| LLM       | Orange | LLM / model invocation     |
| Output    | Purple | Pipeline result            |
| Text      | Green  | Text processing            |
| Note      | Yellow | Annotations / notes        |
| Filter    | Purple | Conditional filtering      |
| Database  | Blue   | Data access                |
| Auth      | Red    | Authentication             |
| Logger    | Green  | Logging                    |

---

## Project Structure

```
Vector-Shift/
├── backend/
│   ├── main.py           # FastAPI app, CORS, /pipelines/parse
│   ├── requirements.txt  # fastapi, uvicorn, pydantic
│   └── .venv/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── ui.js         # ReactFlow canvas
│   │   ├── toolbar.js    # Node palette
│   │   ├── submit.js     # Submit & API call
│   │   ├── store.js      # Zustand state
│   │   ├── draggableNode.js
│   │   └── nodes/        # InputNode, LLMNode, etc.
│   └── package.json
└── README.md
```

---

## API

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| GET    | `/`                | Health check (`Ping: Pong`)          |
| POST   | `/pipelines/parse` | Parse pipeline and validate DAG      |

**Request body (POST `/pipelines/parse`):**

```json
{
  "nodes": [{"id": "...", "type": "...", "position": {...}, "data": {...}}],
  "edges": [{"source": "input-1", "target": "llm-1"}]
}
```

**Response:**

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

---

## Environment Variables

| Variable           | Default                | Description               |
|--------------------|------------------------|---------------------------|
| `REACT_APP_API_BASE` | `http://localhost:8000` | Backend base URL for API  |

---

## Tech Stack

| Layer    | Technology                          |
|----------|--------------------------------------|
| Frontend | React 18, ReactFlow 11, Zustand      |
| Backend  | FastAPI, Pydantic v2, Uvicorn        |
| Styling  | CSS Modules                          |

---

## Scripts

| Command       | Description                 |
|---------------|-----------------------------|
| `npm start`   | Start React dev server      |
| `npm run build` | Production build          |
| `npm test`    | Run tests                   |
| `uvicorn main:app --reload` | Start FastAPI with reload |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Request failed (Failed to fetch)` | Ensure backend is running on port 8000 |
| Port 3000 or 8000 in use | Use different ports or stop the process |
| CORS errors | Backend allows `http://localhost:3000` by default |
| Watchpack EMFILE (too many open files) | Increase file descriptors: `ulimit -n 10240` (macOS/Linux) |

---

---

## Deploy to GitHub

This project is ready to push to GitHub. To deploy to **VectorShift-Automation**:

### 1. Create the repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Set **Repository name** to `VectorShift-Automation`
3. Choose **Public** (or Private)
4. Do **not** initialize with a README (you already have one)
5. Click **Create repository**

### 2. Push your code

If your GitHub username is different from `keshavsharma`, update the remote:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/VectorShift-Automation.git
```

Then push:

```bash
git push -u origin main
```

---

## License

Private project.
# VectorShift-Automation
