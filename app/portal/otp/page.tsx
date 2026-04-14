'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/auth.module.css';

export default function PortalOTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (i: number, v: string) => { if (!/^\d*$/.test(v)) return; const n=[...otp]; n[i]=v; setOtp(n); if(v && i<5) inputRefs.current[i+1]?.focus(); };
  const handleKeyDown = (i: number, e: React.KeyboardEvent) => { if (e.key==='Backspace' && !otp[i] && i>0) inputRefs.current[i-1]?.focus(); };
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); router.push('/portal/home'); };

  return (
    <div className={styles.mobileAuth}>
      <div className={styles.mobileAuthCard}>
        <div className={styles.mobileAuthLogo}><span>FS</span><h2>FlowSync</h2></div>
        <h3>Verify Code</h3>
        <p className={styles.subtitle}>Enter the 6-digit code</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.otpInputs}>
            {otp.map((d,i) => (
              <input key={i} ref={el => { inputRefs.current[i] = el; }} type="text" maxLength={1} value={d} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} />
            ))}
          </div>
          <div className={styles.resendRow}>Didn't get it? <button type="button">Resend</button></div>
          <button type="submit" className={styles.btnPrimary}>Verify & Continue</button>
        </form>
      </div>
    </div>
  );
}
