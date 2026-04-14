'use client';
import styles from './Hub.module.css';

export default function MobileNav() {
  return (
    <nav className={styles.mobileNav}>
      <button className={`${styles.navItem} ${styles.navItemActive}`}>
        <span className="material-symbols-outlined">door_open</span>
        <span className={styles.navLabel}>Gateway</span>
      </button>
      <button className={styles.navItem}>
        <span className="material-symbols-outlined">calendar_today</span>
        <span className={styles.navLabel}>Events</span>
      </button>
      <button className={styles.navItem}>
        <span className="material-symbols-outlined">settings</span>
        <span className={styles.navLabel}>Settings</span>
      </button>
    </nav>
  );
}
