import { BaseNode } from './baseNode';
import styles from './baseNode.module.css';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      targetHandles={[
        { id: `${id}-system`, style: { top: `${100/3}%` } },
        { id: `${id}-prompt`, style: { top: `${200/3}%` } }
      ]}
      sourceHandles={[{ id: `${id}-response` }]}
      colorVariant="orange"
    >
      <span className={styles.text}>This is a LLM.</span>
    </BaseNode>
  );
}
