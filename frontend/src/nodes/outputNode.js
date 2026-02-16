import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './baseNode.module.css';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      targetHandles={[{ id: `${id}-value` }]}
      colorVariant="purple"
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
        <select value={outputType} onChange={handleTypeChange} className={styles.select}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}
