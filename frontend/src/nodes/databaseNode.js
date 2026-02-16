import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './baseNode.module.css';

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'PostgreSQL');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM table');

  const handleTypeChange = (e) => {
    setDbType(e.target.value);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Database"
      targetHandles={[{ id: `${id}-connection` }]}
      sourceHandles={[{ id: `${id}-result` }]}
      width={240}
      height={140}
      colorVariant="blue"
    >
      <label className={styles.label}>
        Database Type:
        <select value={dbType} onChange={handleTypeChange} className={styles.select}>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MySQL">MySQL</option>
          <option value="MongoDB">MongoDB</option>
          <option value="SQLite">SQLite</option>
        </select>
      </label>
      <label className={styles.label}>
        Query:
        <textarea 
          value={query} 
          onChange={handleQueryChange}
          className={`${styles.textarea} ${styles.textareaMonospace}`}
          placeholder="SQL query"
        />
      </label>
    </BaseNode>
  );
}
