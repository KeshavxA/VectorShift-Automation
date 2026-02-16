import { Handle, Position } from 'reactflow';
import styles from './baseNode.module.css';

const colorVariantMap = {
  blue: styles.containerBlue,
  purple: styles.containerPurple,
  orange: styles.containerOrange,
  green: styles.containerGreen,
  yellow: styles.containerYellow,
  red: styles.containerRed,
};

export const BaseNode = ({ 
  id, 
  title, 
  children, 
  sourceHandles = [], 
  targetHandles = [],
  width = 200,
  height = 80,
  colorVariant = 'blue'
}) => {
  const containerClasses = `${styles.container} ${colorVariantMap[colorVariant] || styles.containerBlue}`;
  const containerStyle = {
    width,
    height,
  };

  return (
    <div className={containerClasses} style={containerStyle}>
      {targetHandles.map((handle, index) => (
        <Handle
          key={`target-${handle.id || index}`}
          type="target"
          position={Position.Left}
          id={handle.id || `${id}-target-${index}`}
          style={handle.style || {}}
          className="react-flow__handle-custom"
          {...handle.props}
        />
      ))}

      {title && (
        <div className={styles.title}>
          {title}
        </div>
      )}

      <div className={styles.content}>
        {children}
      </div>

      {sourceHandles.map((handle, index) => (
        <Handle
          key={`source-${handle.id || index}`}
          type="source"
          position={Position.Right}
          id={handle.id || `${id}-source-${index}`}
          style={handle.style || {}}
          className="react-flow__handle-custom"
          {...handle.props}
        />
      ))}
    </div>
  );
};
