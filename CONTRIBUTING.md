# Contributing to VectorShift

Thank you for your interest in contributing to VectorShift.

## Development Setup

1. **Backend**

   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```

2. **Frontend**

   ```bash
   cd frontend
   npm install
   npm start
   ```

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only
- `style:` formatting, no code change
- `refactor:` code change, no feature/fix
- `chore:` maintenance

## Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Code Style

- **Python:** Follow PEP 8
- **JavaScript:** ESLint (project config)
- Add docstrings to new backend endpoints
