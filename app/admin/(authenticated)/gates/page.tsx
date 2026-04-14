'use client';
import styles from './gates.module.css';
import { MetricCard, SectionContainer, StatusBadge } from '@/components/UI';

const initialGates = [
  { id: 1, name: 'North Gate 1', status: 'open' as const, load: 45, throughput: '120/min' },
  { id: 2, name: 'North Gate 2', status: 'overloaded' as const, load: 92, throughput: '185/min' },
  { id: 3, name: 'East Gate (VIP)', status: 'open' as const, load: 12, throughput: '30/min' },
  { id: 4, name: 'West Gate 1', status: 'open' as const, load: 58, throughput: '142/min' },
  { id: 5, name: 'West Gate 2', status: 'closed' as const, load: 0, throughput: '0/min' },
];

export default function AccessGatesPage() {
  const getStatusType = (status: string) => {
    switch(status) {
      case 'open': return 'success';
      case 'overloaded': return 'danger';
      case 'closed': return 'info';
      default: return 'info';
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Access Gates</h1>
          <p className={styles.pageSubtitle}>Entry point capacity & throughput</p>
        </div>
        <div className={styles.liveIndicator}><span className={styles.liveDot} /> Live</div>
      </header>

      <div className={styles.summaryRow}>
        <MetricCard label="Total Flow" value="477/min" icon="flowsheet" />
        <MetricCard label="Active" value="4 Gates" icon="door_front" status="success" />
        <MetricCard label="Overloaded" value="1 Gate" icon="priority_high" status="danger" />
      </div>

      <SectionContainer title="Gate Status" icon="nest_remote_comfort_sensor">
        <div className={styles.gatesTableWrap}>
          <table className={styles.gatesTable}>
            <thead>
              <tr>
                <th>Gate Name</th>
                <th>Status</th>
                <th>Current Load</th>
                <th>Manual Override</th>
              </tr>
            </thead>
            <tbody>
              {initialGates.map(gate => (
                <tr key={gate.id}>
                  <td className={styles.gateName}>{gate.name}</td>
                  <td>
                    <StatusBadge 
                      label={gate.status.charAt(0).toUpperCase() + gate.status.slice(1)} 
                      type={getStatusType(gate.status)} 
                    />
                  </td>
                  <td>
                    <div className={styles.loadCell}>
                      <div className={styles.loadTrack}>
                        <div className={styles.loadFill} style={{ width: `${gate.load}%`, background: gate.load > 85 ? 'var(--error)' : 'var(--primary)' }} />
                      </div>
                      <span className={styles.loadValue}>{gate.load}%</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.overrideBtn}>Adjust</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionContainer>
      
      <div className={styles.alertPanel}>
        <div className={styles.alertInfo}>
          <span className="material-symbols-outlined" style={{color:'var(--error)'}}>info</span>
          <p><strong>Reroute Recommended:</strong> Gate 2 is approaching critical load. Advise security to redirect North Gate traffic to West Gate 1.</p>
        </div>
        <button className={styles.actionBtn}>Execute Reroute</button>
      </div>
    </div>
  );
}
