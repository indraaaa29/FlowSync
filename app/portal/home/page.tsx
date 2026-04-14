'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/portal/portal.module.css';

export default function PortalHome() {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <div className={styles.portalHeader}>
        <div className={styles.greeting}>
          <p>Good evening</p>
          <h2>Hey, Attendee! 👋</h2>
        </div>
      </div>

      {/* Ticket card */}
      <div className={styles.ticketCard} onClick={() => setShowQR(true)}>
        <div className={styles.ticketInfo}>
          <h3>IPL 2026 — Match Day 14</h3>
          <p>Gate 3 · Block D · Row 12 · Seat 4</p>
        </div>
        <span className={styles.ticketQR}>🎫</span>
      </div>

      <h3 className={styles.sectionTitle}>Quick Access</h3>
      <div className={styles.navGrid}>
        <Link href="/portal/queue" className={`${styles.navCard} ${styles.navCardUrgent}`}>
          <div className={styles.navCardIcon}><span className="material-symbols-outlined" style={{color:'var(--primary)'}}>restaurant</span></div>
          <div className={styles.navCardText}><h4>Food & Drinks</h4><p>Fan Kitchen: ~20 min wait</p></div>
          <span className={styles.navCardAction}>View</span>
        </Link>
        <Link href="/portal/queue" className={styles.navCard}>
          <div className={styles.navCardIcon}><span className="material-symbols-outlined">wc</span></div>
          <div className={styles.navCardText}><h4>Washrooms</h4><p>Nearest: South Wing — 3 min</p></div>
          <span className={styles.navCardAction}>View</span>
        </Link>
        <Link href="/portal/tickets" className={styles.navCard}>
          <div className={styles.navCardIcon}><span className="material-symbols-outlined">confirmation_number</span></div>
          <div className={styles.navCardText}><h4>My Tickets</h4><p>Tap to view your event pass</p></div>
          <span className={styles.navCardAction}>View</span>
        </Link>
        <Link href="/portal/help" className={styles.navCard}>
          <div className={styles.navCardIcon}><span className="material-symbols-outlined">support_agent</span></div>
          <div className={styles.navCardText}><h4>Help & Support</h4><p>FAQ, emergency, contact</p></div>
          <span className={styles.navCardAction}>View</span>
        </Link>
      </div>

      <div className={styles.liveUpdate}>
        <div className={styles.liveHeader}><div className={styles.livePulse}/><span>Live Update</span></div>
        <p>Gate 2 is experiencing high volume. We recommend using <strong>Gate 3</strong> for faster entry.</p>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className={styles.qrOverlay} onClick={() => setShowQR(false)}>
          <div className={styles.qrModal} onClick={e => e.stopPropagation()}>
            <h3>Event Pass</h3>
            <p>IPL 2026 — Match Day 14</p>
            <div className={styles.qrCode} />
            <p>Gate 3 · Block D · Row 12 · Seat 4</p>
            <button className={styles.qrClose} onClick={() => setShowQR(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
