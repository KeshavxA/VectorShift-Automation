import styles from './draggableNode.module.css';

const colorVariantMap = {
  blue: styles.blue,
  purple: styles.purple,
  orange: styles.orange,
  green: styles.green,
  yellow: styles.yellow,
  red: styles.red,
};

export const DraggableNode = ({ type, label, colorVariant = 'blue' }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    const nodeClasses = `${styles.draggableNode} ${colorVariantMap[colorVariant] || styles.blue}`;
  
    return (
      <div
        className={nodeClasses}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span className={styles.label}>{label}</span>
      </div>
    );
  };
  