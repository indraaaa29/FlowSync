'use client';
import { useState } from 'react';
import styles from './dispatch.module.css';
import { MetricCard, SectionContainer, StatusBadge } from '@/components/UI';

const zones = ['Gate 1','Gate 2','Gate 3','North Concourse','South Wing','Fan Kitchen','Merch Hub','Main Stage','VIP Lounge','North Wing','East Stand'];
const initialStaff = [
  { id:'S001', name:'Priya Sharma', role:'Security', status:'available', zone:'' },
  { id:'S002', name:'James Carter', role:'Security', status:'deployed', zone:'Gate 2' },
  { id:'S003', name:'Ananya Reddy', role:'Security', status:'deployed', zone:'Gate 1' },
  { id:'S004', name:'Mike Torres', role:'Security', status:'break', zone:'' },
  { id:'S005', name:'Sara Lin', role:'Hospitality', status:'available', zone:'' },
  { id:'S006', name:'David Okafor', role:'Hospitality', status:'deployed', zone:'Fan Kitchen' },
  { id:'S007', name:'Elena Vasquez', role:'Medical', status:'available', zone:'' },
  { id:'S008', name:'Raj Patel', role:'Medical', status:'deployed', zone:'North Concourse' },
  { id:'S009', name:'Kim Soo-jin', role:'Operations', status:'deployed', zone:'Main Stage' },
  { id:'S010', name:'Alex Dubois', role:'Operations', status:'available', zone:'' },
  { id:'S011', name:'Thomas Wright', role:'Hospitality', status:'available', zone:'' },
];

export default function DispatchPage() {
  const [staff, setStaff] = useState(initialStaff);
  const [modal, setModal] = useState<string|null>(null);
  const [selectedZone, setSelectedZone] = useState('');

  const available = staff.filter(s=>s.status==='available').length;
  const deployed = staff.filter(s=>s.status==='deployed').length;
  const onBreak = staff.filter(s=>s.status==='break').length;

  const deployStaff = () => {
    if(!modal || !selectedZone) return;
    setStaff(prev => prev.map(s => s.id===modal ? {...s, status:'deployed', zone:selectedZone} : s));
    setModal(null); setSelectedZone('');
  };

  const recallStaff = (id:string) => {
    setStaff(prev => prev.map(s => s.id===id ? {...s, status:'available', zone:''} : s));
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div><h1 className={styles.pageTitle}>Staff Dispatch</h1><p className={styles.pageSubtitle}>Command Center</p></div>
        <div className={styles.liveIndicator}><span className={styles.liveDot} /> Live</div>
      </header>

      <div className={styles.statsRow}>
        <MetricCard label="Available" value={available} icon="check_circle" status="success" />
        <MetricCard label="Deployed" value={deployed} icon="directions_run" status="info" />
        <MetricCard label="On Break" value={onBreak} icon="pause_circle" status="warning" />
        <MetricCard label="Total Staff" value={staff.length} icon="groups" />
      </div>

      <SectionContainer title="Staff Roster" icon="badge">
        <div className={styles.rosterList}>
          {staff.map(s => (
            <div key={s.id} className={styles.staffRow}>
              <div className={`${styles.staffAvatar} ${styles[`role_${s.role.toLowerCase()}`]}`}>{s.name[0]}</div>
              <div className={styles.staffInfo}>
                <p className={styles.staffName}>{s.name}</p>
                <p className={styles.staffMeta}>{s.role} • {s.id}</p>
              </div>
              <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                {s.status === 'deployed' && <StatusBadge label={`📍 ${s.zone}`} type="info" />}
                {s.status === 'break' && <StatusBadge label="On Break" type="warning" />}
                {s.status === 'available' && <StatusBadge label="Available" type="success" />}
              </div>
              {s.status === 'available' ? (
                <button className={styles.deployBtn} onClick={() => setModal(s.id)}>
                  <span className="material-symbols-outlined" style={{fontSize:'14px'}}>send</span> Deploy
                </button>
              ) : s.status === 'deployed' ? (
                <button className={styles.recallBtn} onClick={() => recallStaff(s.id)}>
                  <span className="material-symbols-outlined" style={{fontSize:'14px'}}>undo</span> Recall
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Deploy Modal */}
      {modal && (
        <div className={styles.modalOverlay} onClick={() => setModal(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3><span className="material-symbols-outlined" style={{color:'var(--primary)'}}>send</span> Deploy Staff</h3>
              <button className={styles.modalClose} onClick={() => setModal(null)}>✕</button>
            </div>
            <p className={styles.modalSub}>Deploying: <strong>{staff.find(s=>s.id===modal)?.name}</strong></p>
            <h4 className={styles.zoneLabel}>ASSIGN TO ZONE</h4>
            <div className={styles.zoneGrid}>
              {zones.map(z => (
                <button key={z} className={`${styles.zoneBtn} ${selectedZone===z ? styles.zoneBtnActive : ''}`} onClick={() => setSelectedZone(z)}>{z}</button>
              ))}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setModal(null)}>Cancel</button>
              <button className={styles.confirmBtn} onClick={deployStaff} disabled={!selectedZone}>Confirm Dispatch</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
