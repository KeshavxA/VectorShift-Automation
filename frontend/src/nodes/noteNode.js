import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './baseNode.module.css';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add your note here...');

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Note"
      width={220}
      height={120}
      colorVariant="yellow"
    >
      <label className={styles.label}>
        Note:
        <textarea 
          value={note} 
          onChange={handleNoteChange}
          className={styles.textarea}
          placeholder="Add your note here..."
        />
      </label>
    </BaseNode>
  );
}
