import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './baseNode.module.css';

export const LoggerNode = ({ id, data }) => {
  const [logLevel, setLogLevel] = useState(data?.logLevel || 'INFO');
  const [logFormat, setLogFormat] = useState(data?.logFormat || 'JSON');

  const handleLevelChange = (e) => {
    setLogLevel(e.target.value);
  };

  const handleFormatChange = (e) => {
    setLogFormat(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Logger"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[{ id: `${id}-output` }]}
      colorVariant="green"
    >
      <label className={styles.label}>
        Log Level:
        <select value={logLevel} onChange={handleLevelChange} className={styles.select}>
          <option value="DEBUG">DEBUG</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>
      </label>
      <label className={styles.label}>
        Format:
        <select value={logFormat} onChange={handleFormatChange} className={styles.select}>
          <option value="JSON">JSON</option>
          <option value="Text">Text</option>
          <option value="CSV">CSV</option>
        </select>
      </label>
    </BaseNode>
  );
}
