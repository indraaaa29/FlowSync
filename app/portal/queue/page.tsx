'use client';
import Link from 'next/link';
import styles from '@/app/portal/portal.module.css';

const food = [
  { name:'Fan Kitchen — Main', wait:20, pace:4, tip:'Try Pizza Counter (5 min)' },
  { name:'Brew Bar', wait:8, pace:3, tip:null },
  { name:'Pizza Counter', wait:5, pace:2, tip:null },
  { name:'Ice Cream Stall', wait:3, pace:1, tip:null },
];
const washrooms = [
  { name:'North Concourse — Men', wait:12, pace:4 },
  { name:'North Concourse — Women', wait:15, pace:5 },
  { name:'South Wing', wait:3, pace:1 },
  { name:'VIP Lounge', wait:0, pace:0 },
];

export default function QueuePage() {
  return (
    <>
      <div className={styles.portalHeader}><div className={styles.greeting}><h2>Queue Status</h2><p>Real-time waiting times</p></div></div>
      
      <h3 className={styles.sectionTitle}>🍔 Food & Drinks</h3>
      <div className={styles.navGrid}>
        {food.map(q=>(
          <div key={q.name} className={`${styles.navCard} ${q.wait>15?styles.navCardUrgent:''}`} style={{cursor:'default'}}>
            <div className={styles.navCardIcon}><span className="material-symbols-outlined" style={{color:q.wait>15?'#c62828':q.wait>8?'#f57c00':'#00897b'}}>restaurant</span></div>
            <div className={styles.navCardText}><h4>{q.name}</h4>{q.tip&&<p style={{color:'#00897b',fontWeight:600}}>{q.tip}</p>}</div>
            <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.1rem',color:q.wait>15?'#c62828':q.wait>8?'#f57c00':'#00897b'}}>{q.wait}m</span>
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle} style={{marginTop:'1.5rem'}}>🚻 Washrooms</h3>
      <div className={styles.navGrid}>
        {washrooms.map(q=>(
          <div key={q.name} className={styles.navCard} style={{cursor:'default'}}>
            <div className={styles.navCardIcon}><span className="material-symbols-outlined" style={{color:q.wait>10?'#f57c00':'#00897b'}}>wc</span></div>
            <div className={styles.navCardText}><h4>{q.name}</h4></div>
            <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.1rem',color:q.wait>10?'#f57c00':'#00897b'}}>{q.wait>0?`${q.wait}m`:'Free'}</span>
          </div>
        ))}
      </div>
    </>
  );
}
