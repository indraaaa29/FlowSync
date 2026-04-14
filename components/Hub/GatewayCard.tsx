'use client';
import Link from 'next/link';
import styles from './Hub.module.css';

interface GatewayCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  largeIcon?: string;
}

export default function GatewayCard({ href, icon, title, description, actionLabel, largeIcon }: GatewayCardProps) {
  return (
    <Link href={href} className={styles.gatewayCard}>
      {largeIcon && (
        <span className={`material-symbols-outlined ${styles.bgIcon}`}>
          {largeIcon}
        </span>
      )}
      <div className={styles.cardBody}>
        <div className={styles.iconBox} style={{ background: title === 'Attendee Portal' ? '#111827' : undefined }}>
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>{icon}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.cardAction}>
          {actionLabel}
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
        </div>
      </div>
    </Link>
  );
}
