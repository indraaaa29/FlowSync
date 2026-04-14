'use client';
import { useState } from 'react';
import styles from './sentiment.module.css';
import { MetricCard, SectionContainer, StatusBadge } from '@/components/UI';

interface Zone { id:string; name:string; icon:string; sentiment:number; revenue:number; revenueDelta:number; waitTime:number; footfall:number; feedbackCount:number; topComment:string; }
const zones: Zone[] = [
  { id:'z1', name:'Fan Kitchen', icon:'restaurant', sentiment:42, revenue:18450, revenueDelta:-8, waitTime:20, footfall:3200, feedbackCount:128, topComment:'"Way too long of a wait for just a hot dog."' },
  { id:'z2', name:'Merch Hub', icon:'storefront', sentiment:78, revenue:32800, revenueDelta:15, waitTime:5, footfall:2100, feedbackCount:64, topComment:'"Great selection! Got my jersey in 5 mins."' },
  { id:'z3', name:'Brew Bar', icon:'local_cafe', sentiment:65, revenue:12300, revenueDelta:2, waitTime:8, footfall:1800, feedbackCount:45, topComment:'"Decent coffee, could use more staff."' },
  { id:'z4', name:'VIP Lounge', icon:'diamond', sentiment:91, revenue:45200, revenueDelta:22, waitTime:0, footfall:480, feedbackCount:18, topComment:'"Exceptional service, worth every penny."' },
  { id:'z5', name:'North Concourse', icon:'route', sentiment:55, revenue:0, revenueDelta:0, waitTime:12, footfall:5600, feedbackCount:92, topComment:'"Too crowded, hard to move around."' },
  { id:'z6', name:'East Stand', icon:'stadium', sentiment:83, revenue:0, revenueDelta:0, waitTime:2, footfall:8200, feedbackCount:156, topComment:'"Amazing atmosphere!"' },
];

const getStatus = (s:number) => s>=75?'success':s>=50?'warning':'danger';
const emoji = (s:number) => s>=75?'sentiment_very_satisfied':s>=50?'sentiment_neutral':'sentiment_very_dissatisfied';
const label = (s:number) => s>=75?'Positive':s>=50?'Neutral':'Frustrated';

export default function SentimentPage() {
  const [sel, setSel] = useState<Zone|null>(null);
  const [sort, setSort] = useState<'sentiment'|'revenue'|'waitTime'>('sentiment');
  const sorted = [...zones].sort((a,b) => sort==='sentiment'?a.sentiment-b.sentiment:sort==='revenue'?b.revenue-a.revenue:b.waitTime-a.waitTime);
  const avg = Math.round(zones.reduce((s,z)=>s+z.sentiment,0)/zones.length);
  const totalRev = zones.reduce((s,z)=>s+z.revenue,0);
  const totalFoot = zones.reduce((s,z)=>s+z.footfall,0);
  const risk = zones.filter(z=>z.sentiment<50).length;

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}><div><h1 className={styles.pageTitle}>Sentiment & Revenue</h1><p className={styles.pageSubtitle}>Real-time venue experience intelligence</p></div><div className={styles.liveIndicator}><span className={styles.liveDot}/>Live</div></header>

      <div className={styles.statsRow}>
        <MetricCard label="Avg. Sentiment" value={`${avg}%`} icon={emoji(avg)} status={getStatus(avg)} />
        <MetricCard label="Total Revenue" value={`$${(totalRev/1000).toFixed(1)}k`} icon="payments" />
        <MetricCard label="Total Footfall" value={`${(totalFoot/1000).toFixed(1)}k`} icon="footprint" />
        <MetricCard label="Zones at Risk" value={risk} icon="report" status="danger" />
      </div>

      <div className={styles.contentGrid}>
        <SectionContainer 
          title="Venue Sentiment Map" 
          icon="grid_view"
          headerAction={
            <div className={styles.sortControls}>
              {(['sentiment','revenue','waitTime'] as const).map(s=>(
                <button key={s} className={`${styles.sortBtn} ${sort===s?styles.sortBtnActive:''}`} onClick={()=>setSort(s)}>{s==='sentiment'?'Sentiment':s==='revenue'?'Revenue':'Wait Time'}</button>
              ))}
            </div>
          }
        >
          <div className={styles.heatGrid}>
            {sorted.map(z=>(
              <button key={z.id} className={`${styles.heatCard} ${sel?.id===z.id?styles.heatCardActive:''}`} onClick={()=>setSel(z)} style={{borderTop:`3px solid var(--${getStatus(z.sentiment)})`}}>
                <div className={styles.heatTop}><div className={styles.heatIcon} style={{background:`var(--${getStatus(z.sentiment)})20`}}><span className="material-symbols-outlined" style={{color:`var(--${getStatus(z.sentiment)})`,fontSize:'20px'}}>{z.icon}</span></div><span style={{color:`var(--${getStatus(z.sentiment)})`,fontWeight:800,fontSize:'0.85rem'}}>{z.sentiment}%</span></div>
                <p className={styles.heatName}>{z.name}</p>
                <div className={styles.heatMeta}>{z.revenue>0&&<span>${(z.revenue/1000).toFixed(1)}k</span>}<span>{z.waitTime}m wait</span></div>
                <div className={styles.sentTrack}><div className={styles.sentFill} style={{width:`${z.sentiment}%`,background:`var(--${getStatus(z.sentiment)})`}}/></div>
              </button>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer title="Zone Detail" icon="info">
          {sel ? (
            <div className={styles.detail}>
              <div className={styles.detailHead}>
                <div className={styles.detailIcon} style={{background:`var(--${getStatus(sel.sentiment)})20`}}>
                  <span className="material-symbols-outlined" style={{color:`var(--${getStatus(sel.sentiment)})`,fontSize:'28px'}}>{sel.icon}</span>
                </div>
                <div>
                  <h2 className={styles.detailName}>{sel.name}</h2>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem'}}>
                    <StatusBadge label={label(sel.sentiment)} type={getStatus(sel.sentiment)} />
                    <span style={{fontWeight: 700, fontSize: '0.9rem', color: `var(--${getStatus(sel.sentiment)})` }}>{sel.sentiment}%</span>
                  </div>
                </div>
              </div>
              <div className={styles.metricsGrid}>
                <div className={styles.metricBox}><span className={styles.mLabel}>Revenue</span><span className={styles.mValue}>{sel.revenue>0?`$${(sel.revenue/1000).toFixed(1)}k`:'—'}</span>{sel.revenueDelta!==0&&<span style={{color:sel.revenueDelta>0?'var(--success)':'var(--error)',fontSize:'0.7rem',fontWeight:700}}>{sel.revenueDelta>0?'+':''}{sel.revenueDelta}%</span>}</div>
                <div className={styles.metricBox}><span className={styles.mLabel}>Avg. Wait</span><span className={styles.mValue}>{sel.waitTime}m</span></div>
                <div className={styles.metricBox}><span className={styles.mLabel}>Footfall</span><span className={styles.mValue}>{sel.footfall.toLocaleString()}</span></div>
                <div className={styles.metricBox}><span className={styles.mLabel}>Feedback</span><span className={styles.mValue}>{sel.feedbackCount}</span></div>
              </div>
              <div className={styles.commentCard}><span className="material-symbols-outlined" style={{color:'var(--primary)',fontSize:'18px'}}>format_quote</span><p className={styles.commentText}>{sel.topComment}</p></div>
              {sel.sentiment<50&&<div className={styles.actionSuggestion}><span className="material-symbols-outlined" style={{fontSize:'18px'}}>lightbulb</span><div><p style={{fontWeight:700,fontSize:'0.8rem'}}>Recommended Action</p><p style={{fontSize:'0.78rem',opacity:0.85}}>High wait time detected. Consider dispatching additional staff to {sel.name}.</p></div></div>}
            </div>
          ) : (
            <div className={styles.emptyDetail}><span className="material-symbols-outlined" style={{fontSize:'3rem',color:'var(--outline-variant)'}}>touch_app</span><p>Select a zone to view details</p></div>
          )}
        </SectionContainer>
      </div>
    </div>
  );
}
