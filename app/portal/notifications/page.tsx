'use client';
import Link from 'next/link';
import styles from '@/app/portal/portal.module.css';

const notifs = [
  { id:1, icon:'campaign', title:'Gate Recommendation', desc:'Use Gate 3 for fastest entry. Gate 2 is at capacity.', time:'2 min ago', unread:true },
  { id:2, icon:'restaurant', title:'Queue Alert', desc:'Fan Kitchen wait time reduced to 12 minutes.', time:'8 min ago', unread:true },
  { id:3, icon:'stadium', title:'Match Starting', desc:'The match begins in 15 minutes. Head to your seat.', time:'15 min ago', unread:false },
  { id:4, icon:'local_offer', title:'Special Offer', desc:'20% off at Merch Hub for the next 30 minutes!', time:'25 min ago', unread:false },
];

export default function NotificationsPage() {
  return (
    <>
      <div className={styles.portalHeader}><div className={styles.greeting}><h2>Notifications</h2><p>Stay updated during the event</p></div></div>
      
      <div className={styles.navGrid}>
        {notifs.map(n=>(
          <div key={n.id} className={styles.navCard} style={{cursor:'default',background:n.unread?'rgba(0,58,160,0.04)':'var(--surface-container-lowest)'}}>
            <div className={styles.navCardIcon} style={{background:n.unread?'rgba(0,58,160,0.1)':'var(--surface-container-low)'}}><span className="material-symbols-outlined" style={{color:n.unread?'var(--primary)':'var(--on-surface-variant)'}}>{n.icon}</span></div>
            <div className={styles.navCardText}><h4>{n.title}</h4><p>{n.desc}</p><p style={{fontSize:'0.6rem',marginTop:'0.25rem',color:'var(--outline)'}}>{n.time}</p></div>
            {n.unread && <div style={{width:8,height:8,borderRadius:'50%',background:'var(--primary)',flexShrink:0}} />}
          </div>
        ))}
      </div>
    </>
  );
}
