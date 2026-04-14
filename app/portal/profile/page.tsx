'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/app/portal/portal.module.css';
import { useTheme } from '@/components/ThemeProvider';

export default function ProfilePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [showLogout, setShowLogout] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');

  const inputStyle: React.CSSProperties = { width:'100%', padding:'0.7rem 1rem', borderRadius:'0.75rem', border:'1.5px solid var(--surface-container-highest)', background:'var(--surface-container-low)', fontFamily:'var(--font-body)', fontSize:'0.85rem', outline:'none' };

  return (
    <>
      <div className={styles.portalHeader}><div className={styles.greeting}><h2>Profile</h2><p>Manage your account</p></div></div>
      
      {/* Avatar */}
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'2rem'}}>
        <div style={{width:80,height:80,borderRadius:'50%',background:'linear-gradient(135deg,var(--primary),#004fd2)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.75rem',fontWeight:800,marginBottom:'0.75rem'}}>JD</div>
        <h3 style={{fontWeight:700,fontSize:'1.1rem'}}>{name}</h3>
        <p style={{fontSize:'0.8rem',color:'var(--on-surface-variant)'}}>{email}</p>
      </div>

      {editing ? (
        <div style={{background:'var(--surface-container-lowest)',borderRadius:'1.25rem',padding:'1.5rem',marginBottom:'1rem'}}>
          <div style={{marginBottom:'1rem'}}><label style={{display:'block',fontWeight:600,fontSize:'0.8rem',marginBottom:'0.4rem'}}>Name</label><input style={inputStyle} value={name} onChange={e=>setName(e.target.value)}/></div>
          <div style={{marginBottom:'1rem'}}><label style={{display:'block',fontWeight:600,fontSize:'0.8rem',marginBottom:'0.4rem'}}>Email</label><input style={inputStyle} value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div style={{marginBottom:'1.5rem'}}><label style={{display:'block',fontWeight:600,fontSize:'0.8rem',marginBottom:'0.4rem'}}>Phone</label><input style={inputStyle} value={phone} onChange={e=>setPhone(e.target.value)}/></div>
          <button onClick={()=>setEditing(false)} style={{width:'100%',padding:'0.75rem',borderRadius:999,background:'linear-gradient(135deg,var(--primary),#004fd2)',color:'white',border:'none',fontWeight:700,cursor:'pointer'}}>Save Changes</button>
        </div>
      ) : (
        <div className={styles.navGrid}>
          <button className={styles.navCard} onClick={()=>setEditing(true)}>
            <div className={styles.navCardIcon}><span className="material-symbols-outlined" style={{color:'var(--primary)'}}>edit</span></div>
            <div className={styles.navCardText}><h4>Edit Profile</h4><p>Update your personal info</p></div>
          </button>
          <Link href="/portal/tickets" className={styles.navCard}>
            <div className={styles.navCardIcon}><span className="material-symbols-outlined">confirmation_number</span></div>
            <div className={styles.navCardText}><h4>My Tickets</h4><p>View your event passes</p></div>
          </Link>
          <button className={styles.navCard} onClick={toggleTheme}>
            <div className={styles.navCardIcon}>
              <span className="material-symbols-outlined">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
            </div>
            <div className={styles.navCardText}>
              <h4>Appearance</h4>
              <p>Switch to {theme === 'light' ? 'dark' : 'light'} mode</p>
            </div>
            <div className={styles.navCardAction}>
              {theme === 'light' ? 'Light' : 'Dark'}
            </div>
          </button>
          <Link href="/portal/help" className={styles.navCard}>
            <div className={styles.navCardIcon}><span className="material-symbols-outlined">help</span></div>
            <div className={styles.navCardText}><h4>Help & Support</h4><p>FAQ and contact info</p></div>
          </Link>
          <button className={styles.navCard} onClick={()=>setShowLogout(true)}>
            <div className={styles.navCardIcon} style={{background: 'var(--surface-container-high)'}}><span className="material-symbols-outlined" style={{color:'#c62828'}}>logout</span></div>
            <div className={styles.navCardText}><h4 style={{color:'#c62828'}}>Sign Out</h4><p>Log out of your account</p></div>
          </button>
        </div>
      )}

      {showLogout && (
        <div className={styles.qrOverlay} onClick={()=>setShowLogout(false)}>
          <div className={styles.qrModal} onClick={e=>e.stopPropagation()}>
            <div style={{width:64,height:64,background:'#fff1f0',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem',fontSize:'1.75rem'}}>👋</div>
            <h3>Sign Out?</h3>
            <p style={{marginBottom:'1.5rem'}}>Are you sure you want to log out?</p>
            <button onClick={()=>router.push('/')} style={{width:'100%',padding:'0.75rem',borderRadius:999,background:'#c62828',color:'white',border:'none',fontWeight:700,cursor:'pointer',marginBottom:'0.5rem'}}>Yes, Sign Out</button>
            <button className={styles.qrClose} onClick={()=>setShowLogout(false)} style={{width:'100%'}}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
