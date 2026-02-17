import { useStore } from './store';
import styles from './PipelineStats.module.css';

export const PipelineStats = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  return (
    <div className={styles.stats} title="Live pipeline statistics">
      <span className={styles.stat}>{nodes.length} nodes</span>
      <span className={styles.sep}>·</span>
      <span className={styles.stat}>{edges.length} edges</span>
    </div>
  );
};
