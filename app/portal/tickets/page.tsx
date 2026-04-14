'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/portal/portal.module.css';

export default function TicketsPage() {
  const [showQR, setShowQR] = useState(false);
  return (
    <>
      <div className={styles.portalHeader}><div className={styles.greeting}><h2>My Tickets</h2><p>Your event passes</p></div></div>
      
      <div className={styles.ticketCard} onClick={()=>setShowQR(true)} style={{cursor:'pointer',flexDirection:'column',alignItems:'center',gap:'1rem',padding:'2rem'}}>
        <span style={{fontSize:'3rem'}}>🎫</span>
        <div style={{textAlign:'center'}}><h3 style={{fontSize:'1.1rem',marginBottom:'0.25rem'}}>IPL 2026 — Match Day 14</h3><p style={{opacity:0.85,fontSize:'0.85rem'}}>Gate 3 · Block D · Row 12 · Seat 4</p><p style={{opacity:0.7,fontSize:'0.75rem',marginTop:'0.5rem'}}>10 April 2026 · 19:00 IST</p></div>
        <div style={{background:'rgba(255,255,255,0.2)',padding:'0.5rem 1.5rem',borderRadius:999,fontSize:'0.8rem',fontWeight:700,marginTop:'0.5rem'}}>Tap to view QR Pass</div>
      </div>
      <p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--on-surface-variant)',marginTop:'1rem'}}>Present this QR code at the gate for entry</p>

      {showQR && <div className={styles.qrOverlay} onClick={()=>setShowQR(false)}><div className={styles.qrModal} onClick={e=>e.stopPropagation()}><h3>Event Pass</h3><p>IPL 2026 — Match Day 14</p><div className={styles.qrCode}/><p>Gate 3 · Block D · Row 12 · Seat 4</p><button className={styles.qrClose} onClick={()=>setShowQR(false)}>Close</button></div></div>}
    </>
  );
}
