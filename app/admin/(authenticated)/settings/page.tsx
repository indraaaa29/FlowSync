'use client';
import { useState } from 'react';
import { SectionContainer } from '@/components/UI';

export default function SettingsPage() {
  const [venue, setVenue] = useState('National Stadium — Delhi');
  const [eventName, setEventName] = useState('IPL 2026 — Match Day 14');
  const [capacity, setCapacity] = useState('25000');
  const [alertThreshold, setAlertThreshold] = useState('85');
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000); };

  const inputStyle: React.CSSProperties = { width:'100%', padding:'0.75rem 1rem', borderRadius:'0.75rem', border:'1.5px solid var(--outline-variant)', background:'var(--surface-container-low)', fontFamily:'var(--font-body)', fontSize:'0.9rem', outline:'none', color: 'var(--on-surface)' };
  const labelStyle: React.CSSProperties = { display:'block', fontWeight:600, fontSize:'0.8rem', marginBottom:'0.5rem', color:'var(--on-surface-variant)' };

  return (
    <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
      <h1 style={{fontFamily:'var(--font-display)',fontSize:'1.75rem',fontWeight:800,letterSpacing:'-0.02em',marginBottom:'0.25rem'}}>Settings</h1>
      <p style={{fontSize:'0.85rem',color:'var(--on-surface-variant)',marginBottom:'2rem'}}>Venue & event configuration</p>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'1.5rem'}}>
        <SectionContainer title="Venue Details" icon="location_on">
          <div style={{marginBottom:'1.25rem'}}><label style={labelStyle}>Venue Name</label><input style={inputStyle} value={venue} onChange={e=>setVenue(e.target.value)} /></div>
          <div style={{marginBottom:'1.25rem'}}><label style={labelStyle}>Event Name</label><input style={inputStyle} value={eventName} onChange={e=>setEventName(e.target.value)} /></div>
          <div><label style={labelStyle}>Total Capacity</label><input style={inputStyle} value={capacity} onChange={e=>setCapacity(e.target.value)} type="number" /></div>
        </SectionContainer>

        <SectionContainer title="Alert Thresholds" icon="tune">
          <div><label style={labelStyle}>Gate Overload Threshold (%)</label><input style={inputStyle} value={alertThreshold} onChange={e=>setAlertThreshold(e.target.value)} type="number" /></div>
          <div style={{marginTop:'2rem'}}>
            <button onClick={save} style={{background:saved ? 'var(--success)' : 'var(--primary)', color:'white', border:'none', padding:'0.75rem 2rem', borderRadius:999, fontWeight:700, fontSize:'0.9rem', cursor:'pointer', transition:'all 0.3s', width:'100%'}}>
              {saved ? '✓ Saved' : 'Save Changes'}
            </button>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
