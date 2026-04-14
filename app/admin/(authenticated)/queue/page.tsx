'use client';

import styles from './queue.module.css';
import { MetricCard, SectionContainer } from '@/components/UI';

const foodQueues = [
  { name: 'Fan Kitchen — Main', wait: 20, trend: 'high', pace: 4 },
  { name: 'Brew Bar', wait: 8, trend: 'moderate', pace: 3 },
  { name: 'Pizza Counter', wait: 5, trend: 'low', pace: 2 },
];

const washroomQueues = [
  { name: 'North Concourse — Men', wait: 12, trend: 'high', pace: 4 },
  { name: 'North Concourse — Women', wait: 15, trend: 'high', pace: 5 },
  { name: 'South Wing', wait: 3, trend: 'low', pace: 1 },
  { name: 'VIP Lounge', wait: 0, trend: 'low', pace: 0 },
];

export default function QueueMonitorPage() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div><h1 className={styles.pageTitle}>Queue Monitor</h1><p className={styles.pageSubtitle}>Food & washroom queue intelligence</p></div>
        <div className={styles.liveIndicator}><span className={styles.liveDot} /> Live</div>
      </header>

      <div className={styles.summaryRow}>
        <MetricCard label="Avg. Wait" value="11 min" icon="timer" />
        <MetricCard label="Over 15 min" value="2 queues" icon="warning" status="danger" />
        <MetricCard label="Under 5 min" value="3 queues" icon="check_circle" status="success" />
      </div>

      <div className={styles.queueSections}>
        {/* Food */}
        <SectionContainer title="Food & Beverage" icon="restaurant" className={styles.sectionCard}>
          {foodQueues.map(q => (
            <div key={q.name} className={styles.queueItem}>
              <div className={styles.queueInfo}>
                <p className={styles.queueName}>{q.name}</p>
                <div className={styles.paceDots}>{Array.from({length:5}).map((_,i) => <div key={i} className={`${styles.paceDot} ${i < q.pace ? styles.paceDotActive : ''}`} />)}</div>
              </div>
              <div className={styles.queueWait} style={{color: q.wait > 15 ? 'var(--error)' : q.wait > 8 ? 'var(--warning)' : 'var(--success)'}}>
                {q.wait} min
              </div>
            </div>
          ))}
        </SectionContainer>

        {/* Washrooms */}
        <SectionContainer title="Washrooms" icon="wc" className={styles.sectionCard}>
          {washroomQueues.map(q => (
            <div key={q.name} className={styles.queueItem}>
              <div className={styles.queueInfo}>
                <p className={styles.queueName}>{q.name}</p>
                <div className={styles.paceDots}>{Array.from({length:5}).map((_,i) => <div key={i} className={`${styles.paceDot} ${i < q.pace ? styles.paceDotActive : ''}`} />)}</div>
              </div>
              <div className={styles.queueWait} style={{color: q.wait > 15 ? 'var(--error)' : q.wait > 8 ? 'var(--warning)' : 'var(--success)'}}>
                {q.wait > 0 ? `${q.wait} min` : 'No wait'}
              </div>
            </div>
          ))}
        </SectionContainer>
      </div>

      <div className={styles.actionPanel}>
        <span className="material-symbols-outlined" style={{fontSize:'2rem', color:'var(--primary)'}}>campaign</span>
        <h4>Smart Redirect Available</h4>
        <p>Redirect attendees from North Concourse washrooms to South Wing to reduce wait by ~12 minutes.</p>
        <button className={styles.actionBtn}>Activate Smart Redirect</button>
      </div>
    </div>
  );
}
