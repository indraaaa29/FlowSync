'use client';

import React from 'react';
import styles from './UI.module.css';

interface StatusBadgeProps {
  label: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function StatusBadge({ label, type = 'info', className = '' }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[`badge_${type}`]} ${className}`}>
      {label}
    </span>
  );
}
