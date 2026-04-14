'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/auth.module.css';

export default function PortalSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/portal/otp');
  };

  return (
    <div className={styles.mobileAuth}>
      <div className={styles.mobileAuthCard}>
        <div className={styles.mobileAuthLogo}>
          <span>FS</span>
          <h2>FlowSync</h2>
        </div>
        <h3>Join the Hub</h3>
        <p className={styles.subtitle}>Create your attendee account</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <p style={{fontSize: '0.75rem', color: 'var(--on-surface-variant)', marginBottom: '1.5rem', textAlign: 'center'}}>
            By joining, you agree to our Terms of Service and Privacy Policy.
          </p>
          <button type="submit" className={styles.btnPrimary}>Create Account</button>
        </form>
        <p className={styles.authFooter}>
          Already have an account? <Link href="/portal/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
