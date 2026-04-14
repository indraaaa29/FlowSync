'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';
import { MetricCard, AlertCard, SectionContainer } from '@/components/UI';

const stats = [
  { label: 'Total Attendees', value: '25.4k', icon: 'groups', trend: '+12%', trendUp: true },
  { label: 'Active Gates', value: '3/3', icon: 'sensor_door', trend: 'All open', trendUp: true },
  { label: 'Avg. Wait Time', value: '8 min', icon: 'schedule', trend: '-2m', trendUp: true },
  { label: 'Staff Deployed', value: '6/11', icon: 'badge', trend: '55%', trendUp: false },
];

const initialAlerts = [
  { id: 1, type: 'danger' as const, title: 'Gate 2 Overloaded', desc: 'Capacity reached 115%. Action suggested: Reroute to Gate 3.', time: '2m ago' },
  { id: 2, type: 'warning' as const, title: 'Fan Kitchen Queue', desc: 'Wait time exceeded 20 minutes. Consider opening secondary counter.', time: '5m ago' },
  { id: 3, type: 'success' as const, title: 'VIP Lounge Stable', desc: 'All zones operating within normal parameters.', time: '12m ago' },
];

const chartData = [38, 52, 45, 62, 78, 85, 92, 88, 73, 60, 45, 35];
const chartLabels = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'];

export default function AdminDashboard() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const dismissAlert = (id: number) => setAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <div className={styles.dashboardContent}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Real-time venue overview</p>
        </div>
        <div className={styles.liveIndicator}><span className={styles.liveDot} /> Live</div>
      </header>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map(s => (
          <MetricCard 
            key={s.label}
            label={s.label}
            value={s.value}
            icon={s.icon}
            trend={s.trend}
            trendUp={s.trendUp}
          />
        ))}
      </div>

      {/* Chart + Alerts row */}
      <div className={styles.contentGrid}>
        <SectionContainer title="Crowd Flow Timeline" icon="show_chart">
          <div className={styles.chartWrap}>
            <div className={styles.fakeChart}>
              {chartData.map((h, i) => (
                <div key={i} className={styles.chartCol}>
                  <div className={styles.chartBar} style={{ height: `${h}%` }}>
                    <span className={styles.chartTooltip}>{Math.round(h * 280)}</span>
                  </div>
                  <span className={styles.chartLabel}>{chartLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>

        <SectionContainer title="Live Alerts" icon="warning">
          {alerts.length > 0 ? (
            <div className={styles.alertList}>
              {alerts.map(a => (
                <AlertCard 
                  key={a.id}
                  type={a.type}
                  title={a.title}
                  description={a.desc}
                  time={a.time}
                >
                  <div className={styles.alertActions}>
                    <Link href="/admin/dispatch" className={styles.alertDispatchBtn}>
                      <span className="material-symbols-outlined" style={{fontSize:'14px'}}>groups</span>
                      Dispatch Staff
                    </Link>
                    <button onClick={() => dismissAlert(a.id)} className={styles.alertDismissBtn}>
                      Dismiss
                    </button>
                  </div>
                </AlertCard>
              ))}
            </div>
          ) : (
            <div className={styles.emptyAlerts}>
              <span className="material-symbols-outlined">check_circle</span>
              <p>No active alerts</p>
            </div>
          )}
        </SectionContainer>
      </div>

      <div style={{marginTop:'1.5rem'}}>
        <SectionContainer title="Stadium Live View" icon="stadium">
          <div className={styles.stadiumMap}>
            <div className={styles.stadiumOval}>
              <div className={styles.stadiumField}>PITCH</div>
              {[
                { name: 'Gate 1', pos: { top: '10%', left: '50%' }, load: 72, color: 'var(--success)' },
                { name: 'Gate 2', pos: { top: '50%', right: '5%' }, load: 115, color: 'var(--error)' },
                { name: 'Gate 3', pos: { bottom: '10%', left: '50%' }, load: 45, color: 'var(--success)' },
              ].map(g => (
                <div key={g.name} className={styles.gateMarker} style={{ ...g.pos, transform: 'translate(-50%,-50%)' }}>
                  <div className={styles.gatePulse} style={{ background: g.color }} />
                  <div className={styles.gateLabel}>{g.name}<br /><small>{g.load}%</small></div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
