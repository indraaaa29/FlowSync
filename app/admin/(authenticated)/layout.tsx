'use client';

import Sidebar from '@/components/Sidebar/Sidebar';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './adminLayout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.contentArea}>
        <header className={styles.topBar}>
          <div className={styles.headerLeft}>
            {/* Context-aware title could go here if managed by state */}
          </div>
          <div className={styles.headerRight}>
            <ThemeToggle />
            <div className={styles.userBadge}>
              <span className="material-symbols-outlined">account_circle</span>
              <span className={styles.userName}>Admin</span>
            </div>
          </div>
        </header>
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
