'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login
    router.push('/admin/dashboard');
  };

  return (
    <div className={styles.page}>
      {/* Visual Side */}
      <section className={styles.visualSide}>
        <div className={styles.logoBox}>FS</div>
        <h1 className={styles.visualTitle}>Command your venue, in real time.</h1>
        <p className={styles.visualSub}>
          FlowSync Admin Console provides the high-fidelity orchestration tools 
          needed to manage complex crowd dynamics, staff dispatch, and venue health.
        </p>
      </section>

      {/* Form Side */}
      <main className={styles.formSide}>
        <div className={styles.formWrap}>
          <header>
            <h2 className={styles.formTitle}>Welcome back</h2>
            <p className={styles.subtitle}>Sign in to your orchestrator account</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputField}>
              <label className={styles.label}>Email Address</label>
              <input 
                type="email" 
                className={styles.input}
                placeholder="admin@flowsync.io" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
              />
            </div>

            <div className={styles.inputField}>
              <div className={styles.labelRow}>
                <label className={styles.label}>Password</label>
                <Link href="/admin/forgot-password" className={styles.forgotLink}>
                  Forgot password?
                </Link>
              </div>
              <input 
                type="password" 
                className={styles.input}
                placeholder="••••••••" 
                value={pass} 
                onChange={e => setPass(e.target.value)} 
                required
              />
            </div>

            <label className={styles.checkRow}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Keep me signed in</span>
            </label>

            <button type="submit" className={styles.signInBtn}>
              Sign In
            </button>
          </form>

          <footer className={styles.footer}>
            <p>Back to <Link href="/">FlowSync Hub</Link></p>
          </footer>
        </div>
      </main>
    </div>
  );
}
