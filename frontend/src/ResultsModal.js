import { useStore } from './store';
import styles from './ResultsModal.module.css';

export const ResultsModal = () => {
  const result = useStore((s) => s.result);

  const close = () => useStore.setState({ result: null });

  if (!result) return null;

  const isError = !!result.error;

  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{isError ? 'Validation Failed' : 'Validation Results'}</h3>
          <button className={styles.closeBtn} onClick={close} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.body}>
          {isError ? (
            <div className={styles.error}>
              <p>{result.error}</p>
              <p className={styles.hint}>
                Ensure the backend is running at <code>http://localhost:8000</code>
              </p>
            </div>
          ) : (
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{result.num_nodes}</span>
                <span className={styles.statLabel}>Nodes</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{result.num_edges}</span>
                <span className={styles.statLabel}>Edges</span>
              </div>
              <div className={styles.stat}>
                <span className={`${styles.statValue} ${result.is_dag ? styles.valid : styles.invalid}`}>
                  {result.is_dag ? '✓ Valid' : '✕ Invalid'}
                </span>
                <span className={styles.statLabel}>DAG</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
