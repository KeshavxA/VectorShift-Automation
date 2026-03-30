/**
 * Pipeline parse endpoint.
 * - Local dev: FastAPI at http://localhost:8000/pipelines/parse
 * - Vercel: serverless at /api/parse (set REACT_APP_PARSE_URL in .env.production)
 */
export function getParseUrl() {
  if (process.env.REACT_APP_PARSE_URL) {
    return process.env.REACT_APP_PARSE_URL;
  }
  const base = process.env.REACT_APP_API_BASE || 'http://localhost:8000';
  return `${base.replace(/\/$/, '')}/pipelines/parse`;
}
