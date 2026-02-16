import { DraggableNode } from './draggableNode';
import styles from './toolbar.module.css';

export const PipelineToolbar = () => {

    return (
        <div className={styles.toolbar}>
            <div className={styles.nodesContainer}>
                <DraggableNode type='customInput' label='Input' colorVariant='blue' />
                <DraggableNode type='llm' label='LLM' colorVariant='orange' />
                <DraggableNode type='customOutput' label='Output' colorVariant='purple' />
                <DraggableNode type='text' label='Text' colorVariant='green' />
                <DraggableNode type='note' label='Note' colorVariant='yellow' />
                <DraggableNode type='filter' label='Filter' colorVariant='purple' />
                <DraggableNode type='database' label='Database' colorVariant='blue' />
                <DraggableNode type='auth' label='Auth' colorVariant='red' />
                <DraggableNode type='logger' label='Logger' colorVariant='green' />
            </div>
        </div>
    );
};
