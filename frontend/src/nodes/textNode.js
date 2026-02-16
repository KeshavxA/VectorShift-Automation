import { useEffect, useMemo, useRef, useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './baseNode.module.css';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const [nodeSize, setNodeSize] = useState({ width: 220, height: 120 });

  const variables = useMemo(() => {
    const re = /\{\{\s*([a-zA-Z_][\w.-]*)\s*\}\}/g;
    const found = new Set();
    let m;
    while ((m = re.exec(currText)) !== null) {
      found.add(m[1]);
    }
    return Array.from(found).sort();
  }, [currText]);

  const targetHandles = useMemo(() => {
    const n = variables.length;
    if (n === 0) return [];
    return variables.map((name, idx) => ({
      id: `${id}-var-${name}`,
      style: { top: `${((idx + 1) / (n + 1)) * 100}%` },
      props: { title: name },
    }));
  }, [id, variables]);

  const recomputeSize = (nextText) => {
    const el = textareaRef.current;
    let nextHeight = nodeSize.height;
    if (el) {
      el.style.height = '0px';
      const contentHeight = el.scrollHeight; 
      nextHeight = Math.max(110, Math.min(320, contentHeight + 66));
      el.style.height = `${Math.max(60, Math.min(240, contentHeight))}px`;
    }

    const lines = (nextText || '').split('\n');
    const longest = lines.reduce((m, line) => Math.max(m, line.length), 0);
    const approxPx = 120 + longest * 7; 
    const nextWidth = Math.max(220, Math.min(480, approxPx));

    setNodeSize({ width: nextWidth, height: nextHeight });
  };

  const handleTextChange = (e) => {
    const next = e.target.value;
    setCurrText(next);
    recomputeSize(next);
  };

  useEffect(() => {
    recomputeSize(currText);
  }, []);

  return (
    <BaseNode
      id={id}
      title="Text"
      width={nodeSize.width}
      height={nodeSize.height}
      targetHandles={targetHandles}
      sourceHandles={[{ id: `${id}-output` }]}
      colorVariant="green"
    >
      <label className={styles.label}>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className={styles.textarea}
          placeholder="Type text... use {{variable}} to create inputs"
        />
      </label>
    </BaseNode>
  );
}
