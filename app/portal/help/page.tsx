'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/portal/portal.module.css';

const faqs = [
  { q:'Where do I find my gate?', a:'Your gate assignment is shown on your ticket card. We recommend Gate 3 for fastest entry.' },
  { q:'How do I check queue times?', a:'Tap "Queue" in the bottom nav to see real-time food and washroom wait times.' },
  { q:'What if I lose my phone?', a:'Visit the Help Desk near Gate 1. Staff can verify your identity and reissue your digital pass.' },
  { q:'Is there wheelchair access?', a:'Yes! All gates have wheelchair-accessible entry. Staff at each gate can assist you.' },
];

export default function HelpPage() {
  const [open, setOpen] = useState<number|null>(null);

  return (
    <div className={styles.portalShell}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <div className={styles.portalHeader}><div className={styles.greeting}><h2>Help & Support</h2><p>We're here to help</p></div></div>
      <div className={styles.portalContent}>
        {/* Emergency */}
        <div style={{background:'#ffeaea',borderRadius:'1.25rem',padding:'1.25rem',display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1.5rem'}}>
          <span className="material-symbols-outlined" style={{color:'#c62828',fontSize:'2rem'}}>emergency</span>
          <div><h4 style={{fontWeight:700,color:'#c62828'}}>Emergency?</h4><p style={{fontSize:'0.8rem',color:'#c62828',opacity:0.85}}>Call venue security: +91 11 2345 6789</p></div>
        </div>

        <h3 className={styles.sectionTitle}>FAQ</h3>
        <div className={styles.navGrid}>
          {faqs.map((f,i)=>(
            <button key={i} className={styles.navCard} onClick={()=>setOpen(open===i?null:i)} style={{flexDirection:'column',alignItems:'flex-start',gap:'0.5rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem',width:'100%'}}>
                <span className="material-symbols-outlined" style={{color:'var(--primary)',fontSize:'1.2rem'}}>help</span>
                <h4 style={{flex:1,fontSize:'0.9rem',fontWeight:600}}>{f.q}</h4>
                <span className="material-symbols-outlined" style={{fontSize:'1.2rem',color:'var(--on-surface-variant)',transition:'0.2s',transform:open===i?'rotate(180deg)':'rotate(0deg)'}}>expand_more</span>
              </div>
              {open===i && <p style={{fontSize:'0.82rem',color:'var(--on-surface-variant)',lineHeight:1.6,paddingLeft:'2rem'}}>{f.a}</p>}
            </button>
          ))}
        </div>

        <div style={{background:'var(--surface-container-lowest)',borderRadius:'1.25rem',padding:'1.5rem',marginTop:'1.5rem',textAlign:'center'}}>
          <span className="material-symbols-outlined" style={{fontSize:'2rem',color:'var(--primary)',marginBottom:'0.5rem'}}>support_agent</span>
          <h4 style={{fontWeight:700,marginBottom:'0.25rem'}}>Need more help?</h4>
          <p style={{fontSize:'0.82rem',color:'var(--on-surface-variant)',marginBottom:'1rem'}}>Visit the Help Desk near Gate 1 or chat with our team.</p>
          <button style={{background:'linear-gradient(135deg,var(--primary),#004fd2)',color:'white',border:'none',padding:'0.6rem 1.5rem',borderRadius:999,fontWeight:700,fontSize:'0.85rem',cursor:'pointer'}}>Start Live Chat</button>
        </div>
      </div>
      <nav className={styles.bottomNav}>
        <Link href="/portal/home" className={styles.navTab}><span className="material-symbols-outlined">home</span>Home</Link>
        <Link href="/portal/queue" className={styles.navTab}><span className="material-symbols-outlined">fastfood</span>Queue</Link>
        <Link href="/portal/tickets" className={styles.navTab}><span className="material-symbols-outlined">qr_code_2</span>Ticket</Link>
        <Link href="/portal/notifications" className={styles.navTab}><span className="material-symbols-outlined">notifications</span>Alerts</Link>
        <Link href="/portal/profile" className={styles.navTab}><span className="material-symbols-outlined">person</span>Profile</Link>
      </nav>
    </div>
  );
}
