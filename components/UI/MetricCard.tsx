'use client';

import React from 'react';
import styles from './UI.module.css';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  status?: 'success' | 'warning' | 'danger' | 'info';
}

export const MetricCard = ({ label, value, icon, trend, trendUp, status }: MetricCardProps) => {
  return (
    <div className={`${styles.metricCard} ${status ? styles[`metricCard_${status}`] : ''}`}>
      <div className={styles.iconWrap}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className={styles.metricText}>
        <p className={styles.label}>{label}</p>
        <div className={styles.main}>
          <h2 className={styles.value}>{value}</h2>
          {trend && (
            <span className={`${styles.statusBadge} ${trendUp ? styles.badge_success : styles.badge_danger}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
