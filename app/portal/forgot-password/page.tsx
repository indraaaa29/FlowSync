'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/auth.module.css';

export default function PortalForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); router.push('/portal/otp'); };

  return (
    <div className={styles.mobileAuth}>
      <div className={styles.mobileAuthCard}>
        <div className={styles.mobileAuthLogo}><span>FS</span><h2>FlowSync</h2></div>
        <h3>Reset Password</h3>
        <p className={styles.subtitle}>Enter your email to receive a code</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button type="submit" className={styles.btnPrimary}>Send Code</button>
        </form>
        <p className={styles.authFooter}><Link href="/portal/login">Back to Sign In</Link></p>
      </div>
    </div>
  );
}
