import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './baseNode.module.css';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  const handleTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Filter"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[{ id: `${id}-output` }]}
      colorVariant="purple"
    >
      <label className={styles.label}>
        Filter Type:
        <select value={filterType} onChange={handleTypeChange} className={styles.select}>
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
          <option value="regex">Regex</option>
        </select>
      </label>
      <label className={styles.label}>
        Value:
        <input 
          type="text" 
          value={filterValue} 
          onChange={handleValueChange}
          className={styles.input}
          placeholder="Filter value"
        />
      </label>
    </BaseNode>
  );
}
