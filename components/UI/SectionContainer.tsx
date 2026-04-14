'use client';

import React from 'react';
import styles from './UI.module.css';

interface SectionContainerProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  className?: string;
}

export function SectionContainer({ title, icon, children, headerAction, className = '' }: SectionContainerProps) {
  return (
    <div className={`${styles.sectionContainer} ${className}`}>
      {(title || icon) && (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem'}}>
          <h3 className={styles.sectionTitle} style={{marginBottom: 0}}>
            {icon && <span className="material-symbols-outlined" style={{color: 'var(--primary)', fontSize: '1.2rem'}}>{icon}</span>}
            {title}
          </h3>
          {headerAction}
        </div>
      )}
      {children}
    </div>
  );
}
