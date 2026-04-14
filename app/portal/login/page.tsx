'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/auth.module.css';

export default function PortalLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/portal/home');
  };

  return (
    <div className={styles.mobileAuth}>
      <div className={styles.mobileAuthCard}>
        <div className={styles.mobileAuthLogo}>
          <span>FS</span>
          <h2>FlowSync</h2>
        </div>
        <h3>Attendee Portal</h3>
        <p className={styles.subtitle}>Sign in to access your event</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label>Password</label>
              <Link href="/portal/forgot-password" className={styles.forgotLink}>Forgot?</Link>
            </div>
            <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} />
          </div>
          <button type="submit" className={styles.btnPrimary}>Sign In</button>
        </form>
        <p className={styles.authFooter}>Back to <Link href="/">FlowSync Hub</Link></p>
      </div>
    </div>
  );
}
