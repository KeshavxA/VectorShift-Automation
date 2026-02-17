# Vector Shift

A visual pipeline builder for AI and data workflows. Design node-based pipelines using a drag-and-drop canvas, connect nodes to define data flow, and validate pipeline structure via a FastAPI backend.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run-full-execution-steps)
- [Docker](#docker-one-command-run)
- [Usage](#usage)
- [Node Types](#node-types)
- [Project Structure](#project-structure)
- [API](#api)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

![Pipeline Builder](https://img.shields.io/badge/React-18.2-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green) ![ReactFlow](https://img.shields.io/badge/ReactFlow-11.8-purple)

---

## Features

- **Visual pipeline editor** — Drag-and-drop nodes onto a canvas
- **9 node types** — Input, LLM, Output, Text, Note, Filter, Database, Auth, Logger
- **Connection validation** — Backend validates pipeline as a DAG (Directed Acyclic Graph)
- **Export/Import** — Save pipelines as JSON, load from file
- **Pipeline templates** — Pre-built examples (Simple LLM, Data Pipeline, Auth Flow)
- **Results modal** — Clean validation results instead of browser alerts
- **Docker deployment** — One-command run with `docker-compose up`
- **Modern stack** — React 18, ReactFlow, Zustand, FastAPI, Pydantic

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Toolbar    │  │  Canvas UI   │  │ Pipeline Actions │   │
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

## How to Run (Full Execution Steps)

### Step 1: Open terminal and go to project folder

```bash
cd /path/to/Vector-Shift
```

Replace `/path/to/Vector-Shift` with your actual project path (e.g. `~/Desktop/Vector-Shift`).

---

### Step 2: Set up the backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
```

On **Windows (Command Prompt):**
```bash
.venv\Scripts\activate
```

On **Windows (PowerShell):**
```bash
.venv\Scripts\Activate.ps1
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

---

### Step 3: Set up the frontend

Open a **new terminal** (keep the backend terminal open), then:

```bash
cd /path/to/Vector-Shift/frontend
npm install
```

---

### Step 4: Run the backend (Terminal 1)

In the backend terminal (with `.venv` activated):

```bash
cd /path/to/Vector-Shift/backend
source .venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

**Backend runs on:** [http://localhost:8000](http://localhost:8000)

---

### Step 5: Run the frontend (Terminal 2)

In a **second terminal**:

```bash
cd /path/to/Vector-Shift/frontend
npm start
```

The frontend runs on **port 3000** by default. If port 3000 is in use, Create React App will prompt to use 3001 instead.

Expected output:
```
Compiled successfully!
You can now view frontend in the browser.
  Local:            http://localhost:3000
```

**Frontend runs on:** [http://localhost:3000](http://localhost:3000)

---

### Step 6: Use the app

1. Open **http://localhost:3000** in your browser.
2. Drag nodes from the toolbar onto the canvas.
3. Connect nodes and click **Validate** to run pipeline validation.

**API docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Ports summary

| Service  | Port | URL                    |
|----------|------|------------------------|
| Frontend | 3000 | http://localhost:3000  |
| Backend  | 8000 | http://localhost:8000  |

---

## Docker (one-command run)

```bash
docker-compose up --build
```

- **App:** [http://localhost](http://localhost) (port 80)
- **Backend API:** [http://localhost:8000](http://localhost:8000)

---

## Usage

1. **Add nodes** — Drag node types from the toolbar onto the canvas.
2. **Connect nodes** — Drag from a node’s handle to another node’s handle.
3. **Validate** — Click **Validate** to run DAG validation and see results in a modal.
4. **Export** — Save your pipeline as a JSON file.
5. **Import** — Load a pipeline from a previously exported JSON file.
6. **Templates** — Click a template button to load a pre-built example pipeline.

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

Create a `.env` file from `frontend/env.example` for local overrides. **Never commit `.env`** (it's in `.gitignore`).

| Variable             | Default                | Description                    |
|----------------------|------------------------|--------------------------------|
| `REACT_APP_API_BASE` | `http://localhost:8000`| Backend base URL for API calls |
| `PORT`               | `3000`                 | Frontend dev server port       |

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
| `Address already in use` / Port 3000 or 8000 in use | Kill the process: `lsof -i :8000` then `kill <PID>`, or `kill $(lsof -t -i :8000)` |
| CORS errors | Backend allows `http://localhost:3000` by default |
| Watchpack EMFILE (too many open files) | Increase file descriptors: `ulimit -n 10240` (macOS/Linux) |

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
