'use client';

import React from 'react';
import styles from './UI.module.css';

interface AlertCardProps {
  title: string;
  description: string;
  type?: 'danger' | 'warning' | 'success' | 'info';
  time?: string;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

export function AlertCard({ title, description, type = 'info', time, onDismiss, children }: AlertCardProps) {
  return (
    <div className={`${styles.alertCard} ${styles[`alert_${type}`]}`}>
      <div className={styles.alertContent}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <p className={styles.alertTitle}>{title}</p>
          {time && <span style={{fontSize: '0.7rem', opacity: 0.6, fontWeight: 600}}>{time}</span>}
        </div>
        <p className={styles.alertDesc}>{description}</p>
        {children && <div style={{marginTop: '0.75rem'}}>{children}</div>}
      </div>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            opacity: 0.4,
            height: 'fit-content'
          }}
        >
          <span className="material-symbols-outlined" style={{fontSize: '18px'}}>close</span>
        </button>
      )}
    </div>
  );
}
