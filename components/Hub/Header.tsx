'use client';
import styles from './Hub.module.css';
import ThemeToggle from '@/components/ThemeToggle';

export default function HubHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={`material-symbols-outlined ${styles.brandIcon}`}>hub</span>
        <span className={styles.brandName}>FlowSync</span>
      </div>
      <div className={styles.headerActions} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <ThemeToggle />
        <button className={styles.accountBtn}>
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}
