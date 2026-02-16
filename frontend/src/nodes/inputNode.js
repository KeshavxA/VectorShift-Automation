import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './baseNode.module.css';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      sourceHandles={[{ id: `${id}-value` }]}
      colorVariant="blue"
    >
      <label className={styles.label}>
        Name:
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Type:
        <select value={inputType} onChange={handleTypeChange} className={styles.select}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}
