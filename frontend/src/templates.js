export const pipelineTemplates = [
  {
    id: 'simple-llm',
    name: 'Simple LLM Flow',
    description: 'Input → LLM → Output',
    pipeline: {
      nodes: [
        { id: 'customInput-1', type: 'customInput', position: { x: 100, y: 150 }, data: { id: 'customInput-1', nodeType: 'customInput' } },
        { id: 'llm-1', type: 'llm', position: { x: 350, y: 150 }, data: { id: 'llm-1', nodeType: 'llm' } },
        { id: 'customOutput-1', type: 'customOutput', position: { x: 600, y: 150 }, data: { id: 'customOutput-1', nodeType: 'customOutput' } },
      ],
      edges: [
        { id: 'e1-2', source: 'customInput-1', target: 'llm-1', type: 'smoothstep', animated: true },
        { id: 'e2-3', source: 'llm-1', target: 'customOutput-1', type: 'smoothstep', animated: true },
      ],
    },
  },
  {
    id: 'data-pipeline',
    name: 'Data Processing Pipeline',
    description: 'Database → Filter → LLM → Logger → Output',
    pipeline: {
      nodes: [
        { id: 'database-1', type: 'database', position: { x: 80, y: 120 }, data: { id: 'database-1', nodeType: 'database' } },
        { id: 'filter-1', type: 'filter', position: { x: 280, y: 120 }, data: { id: 'filter-1', nodeType: 'filter' } },
        { id: 'llm-1', type: 'llm', position: { x: 480, y: 120 }, data: { id: 'llm-1', nodeType: 'llm' } },
        { id: 'logger-1', type: 'logger', position: { x: 680, y: 80 }, data: { id: 'logger-1', nodeType: 'logger' } },
        { id: 'customOutput-1', type: 'customOutput', position: { x: 680, y: 200 }, data: { id: 'customOutput-1', nodeType: 'customOutput' } },
      ],
      edges: [
        { id: 'e1', source: 'database-1', target: 'filter-1', type: 'smoothstep', animated: true },
        { id: 'e2', source: 'filter-1', target: 'llm-1', type: 'smoothstep', animated: true },
        { id: 'e3', source: 'llm-1', target: 'logger-1', type: 'smoothstep', animated: true },
        { id: 'e4', source: 'llm-1', target: 'customOutput-1', type: 'smoothstep', animated: true },
      ],
    },
  },
  {
    id: 'auth-flow',
    name: 'Auth + LLM Flow',
    description: 'Input → Auth → LLM → Output',
    pipeline: {
      nodes: [
        { id: 'customInput-1', type: 'customInput', position: { x: 80, y: 150 }, data: { id: 'customInput-1', nodeType: 'customInput' } },
        { id: 'auth-1', type: 'auth', position: { x: 280, y: 150 }, data: { id: 'auth-1', nodeType: 'auth' } },
        { id: 'llm-1', type: 'llm', position: { x: 480, y: 150 }, data: { id: 'llm-1', nodeType: 'llm' } },
        { id: 'customOutput-1', type: 'customOutput', position: { x: 680, y: 150 }, data: { id: 'customOutput-1', nodeType: 'customOutput' } },
      ],
      edges: [
        { id: 'e1', source: 'customInput-1', target: 'auth-1', type: 'smoothstep', animated: true },
        { id: 'e2', source: 'auth-1', target: 'llm-1', type: 'smoothstep', animated: true },
        { id: 'e3', source: 'llm-1', target: 'customOutput-1', type: 'smoothstep', animated: true },
      ],
    },
  },
];
