'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login/login.module.css';

export default function AdminOTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/dashboard');
  };

  return (
    <div className={styles.page}>
      <section className={styles.visualSide}>
        <div className={styles.logoBox}>FS</div>
        <h1 className={styles.visualTitle}>Almost there.</h1>
        <p className={styles.visualSub}>Enter the 6-digit code sent to your email to verify your identity.</p>
      </section>
      <main className={styles.formSide}>
        <div className={styles.formWrap}>
          <h2 className={styles.formTitle}>Verify Code</h2>
          <p className={styles.subtitle}>Enter the 6-digit code sent to your email</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.otpInputs}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                />
              ))}
            </div>
            <div className={styles.resendRow}>
              Didn't receive the code? <button type="button" className={styles.resendBtn}>Resend</button>
            </div>
            <button type="submit" className={styles.signInBtn} style={{width:'100%'}}>Verify & Continue</button>
          </form>
        </div>
      </main>
    </div>
  );
}
