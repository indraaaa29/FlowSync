'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './portal.module.css';

const navItems = [
  { href: '/portal/home', icon: 'home', label: 'Home' },
  { href: '/portal/queue', icon: 'fastfood', label: 'Queue' },
  { href: '/portal/tickets', icon: 'qr_code_2', label: 'Ticket' },
  { href: '/portal/notifications', icon: 'notifications', label: 'Alerts' },
  { href: '/portal/profile', icon: 'person', label: 'Profile' },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If we are on login/signup/otp/forgot-password, we don't show the shell or bottom nav
  const isAuthPage = ['/portal/login', '/portal/signup', '/portal/otp', '/portal/forgot-password'].some(path => pathname?.startsWith(path));

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.portalShell}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      
      <div className={styles.portalContent}>
        {children}
      </div>

      <nav className={styles.bottomNav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navTab} ${isActive ? styles.navTabActive : ''}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
