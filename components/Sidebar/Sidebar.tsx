'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  {
    group: 'OVERVIEW',
    items: [
      { href: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
      { href: '/admin/gates', label: 'Access Gates', icon: 'sensor_door' },
      { href: '/admin/queue', label: 'Queue Monitor', icon: 'hourglass_empty' },
      { href: '/admin/dispatch', label: 'Staff Dispatch', icon: 'groups' },
    ],
  },
  {
    group: 'INSIGHTS',
    items: [
      { href: '/admin/analytics', label: 'Analytics', icon: 'show_chart' },
      { href: '/admin/sentiment', label: 'Sentiment', icon: 'mood' },
    ],
  },
  {
    group: 'SYSTEM',
    items: [
      { href: '/admin/alerts', label: 'Alerts', icon: 'warning', badge: 2 },
      { href: '/admin/settings', label: 'Settings', icon: 'settings' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>FS</div>
          <h2 className={styles.logoText}>FlowSync</h2>
        </div>

        <nav className={styles.nav}>
          {navItems.map((group) => (
            <div key={group.group} className={styles.navGroup}>
              <h3 className={styles.groupTitle}>{group.group}</h3>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${
                    pathname === item.href ? styles.active : ''
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className={styles.linkLabel}>{item.label}</span>
                  {item.badge && (
                    <span className={styles.badge}>{item.badge}</span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className={styles.footer}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>JD</div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>John Doe</p>
              <p className={styles.userRole}>Head Orchestrator</p>
            </div>
            <button 
              className={styles.logoutBtn} 
              title="Logout"
              onClick={() => setShowLogout(true)}
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogout && (
        <div className={styles.modalOverlay} onClick={() => setShowLogout(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalIconBox}>
              <span className="material-symbols-outlined" style={{fontSize: '2rem', color: 'var(--tertiary)'}}>logout</span>
            </div>
            <h3>Sign Out?</h3>
            <p>You will be redirected to the main hub. Any unsaved diagnostic data may be cleared.</p>
            <div className={styles.modalActions}>
              <button 
                className={styles.cancelBtn} 
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmBtn} 
                style={{background: 'var(--tertiary)'}}
                onClick={() => router.push('/')}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
