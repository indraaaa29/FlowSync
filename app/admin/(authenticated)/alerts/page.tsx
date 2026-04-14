'use client';

import { useState } from 'react';
import styles from './alerts.module.css';
import { AlertCard } from '@/components/UI';

const alertsData = [
  { id:1, severity:'danger' as const, title:'Gate 2 Capacity Exceeded', desc:'Gate 2 is at 115% capacity. Immediate action required.', time:'2 min ago', read:false },
  { id:2, severity:'warning' as const, title:'Fan Kitchen Queue Alert', desc:'Wait time exceeded 20 minutes at Fan Kitchen.', time:'5 min ago', read:false },
  { id:3, severity:'info' as const, title:'Staff S003 Deployed', desc:'Ananya Reddy deployed to Gate 1 — North.', time:'12 min ago', read:true },
  { id:4, severity:'success' as const, title:'VIP Lounge — All Clear', desc:'All VIP zone metrics within normal parameters.', time:'18 min ago', read:true },
  { id:5, severity:'warning' as const, title:'North Concourse Crowding', desc:'Footfall density increasing in north concourse area.', time:'25 min ago', read:true },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(alertsData);
  const dismiss = (id:number) => setAlerts(p=>p.filter(a=>a.id!==id));
  const markRead = (id:number) => setAlerts(p=>p.map(a=>a.id===id?{...a,read:true}:a));

  return (
    <div className={styles.alertsContent}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Alerts</h1>
          <p className={styles.pageSubtitle}>System notifications & warnings</p>
        </div>
        <span className={styles.unreadCount}>
          {alerts.filter(a=>!a.read).length} unread
        </span>
      </header>

      <div className={styles.alertList}>
        {alerts.map(a=>(
          <AlertCard 
            key={a.id}
            type={a.severity}
            title={a.title}
            description={a.desc}
            time={a.time}
            onDismiss={() => dismiss(a.id)}
          >
            <div className={styles.actions}>
              {!a.read && (
                <button onClick={()=>markRead(a.id)} className={styles.readBtn}>
                  Mark Read
                </button>
              )}
            </div>
          </AlertCard>
        ))}

        {alerts.length === 0 && (
          <div className={styles.emptyState}>
            <span className="material-symbols-outlined">notifications_off</span>
            <p>No active alerts</p>
          </div>
        )}
      </div>
    </div>
  );
}
