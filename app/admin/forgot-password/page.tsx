'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../login/login.module.css';

export default function AdminForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/otp');
  };

  return (
    <div className={styles.page}>
      <section className={styles.visualSide}>
        <div className={styles.logoBox}>FS</div>
        <h1 className={styles.visualTitle}>Secure access recovery.</h1>
        <p className={styles.visualSub}>We'll send a verification code to your registered email address.</p>
      </section>
      <main className={styles.formSide}>
        <div className={styles.formWrap}>
          <h2 className={styles.formTitle}>Reset Password</h2>
          <p className={styles.subtitle}>Enter your email to receive a verification code</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputField}>
              <label className={styles.label}>Email Address</label>
              <input type="email" className={styles.input} placeholder="admin@flowsync.io" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button type="submit" className={styles.signInBtn}>Send Verification Code</button>
          </form>
          <footer className={styles.footer}>
            <p>Remember your password? <Link href="/admin/login">Sign In</Link></p>
          </footer>
        </div>
      </main>
    </div>
  );
}
