'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './analytics.module.css';

const timeLabels = ['17:00','17:15','17:30','17:45','18:00','18:15','18:30','18:45','19:00','19:15','19:30','19:45','20:00','20:15','20:30'];
const predicted = [120,280,520,890,1450,2100,2800,3200,3500,3100,2400,1600,900,400,150];
const actual = [95,310,480,950,1600,2350,3100,3500,3800,2900,2200,1400,750,350,0];

const peaks = [
  { label:'Next Peak', time:'19:45', value:'~3,200', icon:'trending_up', semanticClass:'semanticAlert_danger' },
  { label:'Gate 2 Overload', time:'19:20', value:'115%', icon:'warning', semanticClass:'semanticAlert_warning' },
  { label:'Calm Window', time:'20:15', value:'~400', icon:'trending_down', semanticClass:'semanticAlert_success' },
];

export default function AnalyticsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<number|null>(null);
  const [range, setRange] = useState<'all'|'pre'|'during'|'post'>('all');
  const [anim, setAnim] = useState(0);
  const animRef = useRef(0);

  const getSlice = () => {
    switch(range) { case'pre': return{s:0,e:7}; case'during': return{s:6,e:12}; case'post': return{s:10,e:15}; default: return{s:0,e:15}; }
  };

  useEffect(() => {
    setAnim(0);
    let start: number;
    const run = (t: number) => { if(!start)start=t; const p=Math.min((t-start)/800,1); setAnim(p); if(p<1)animRef.current=requestAnimationFrame(run); };
    animRef.current=requestAnimationFrame(run);
    return () => cancelAnimationFrame(animRef.current);
  }, [range]);

  useEffect(() => {
    const c = canvasRef.current; if(!c) return;
    const ctx = c.getContext('2d'); if(!ctx) return;
    const dpr = window.devicePixelRatio||1;
    const r = c.getBoundingClientRect();
    c.width=r.width*dpr; c.height=r.height*dpr;
    ctx.scale(dpr,dpr); ctx.clearRect(0,0,r.width,r.height);

    const {s,e}=getSlice(); const labels=timeLabels.slice(s,e); const pred=predicted.slice(s,e); const act=actual.slice(s,e);
    const pad={t:30,r:20,b:40,l:55}; const cw=r.width-pad.l-pad.r; const ch=r.height-pad.t-pad.b;
    const mx=Math.max(...pred,...act)*1.1; const xs=cw/(labels.length-1);
    const gx=(i:number)=>pad.l+i*xs; const gy=(v:number)=>pad.t+ch-(v/mx)*ch;

    // Grid
    ctx.strokeStyle='rgba(0,0,0,0.05)'; ctx.lineWidth=1;
    for(let i=0;i<=4;i++){const y=pad.t+(ch/4)*i; ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(r.width-pad.r,y);ctx.stroke(); ctx.fillStyle='#9e9e9e';ctx.font='11px Inter,sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(mx*(1-i/4)).toLocaleString(),pad.l-8,y+4);}
    // X labels
    ctx.fillStyle='#9e9e9e';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';
    labels.forEach((l,i)=>{if(labels.length>10&&i%2!==0)return;ctx.fillText(l,gx(i),r.height-10);});

    const dl=Math.floor(anim*(labels.length-1))+1;

    // Predicted (dashed)
    ctx.setLineDash([6,4]);ctx.strokeStyle='rgba(0,58,160,0.3)';ctx.lineWidth=2;ctx.beginPath();
    for(let i=0;i<Math.min(dl,labels.length);i++){const x=gx(i),y=gy(pred[i]);i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();ctx.setLineDash([]);

    // Actual (solid)
    ctx.strokeStyle='#003aa0';ctx.lineWidth=3;ctx.shadowColor='rgba(0,58,160,0.3)';ctx.shadowBlur=8;ctx.beginPath();
    for(let i=0;i<Math.min(dl,labels.length);i++){const x=gx(i),y=gy(act[i]);i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();ctx.shadowBlur=0;

    // Fill
    const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+ch);grad.addColorStop(0,'rgba(0,58,160,0.12)');grad.addColorStop(1,'rgba(0,58,160,0)');
    ctx.fillStyle=grad;ctx.beginPath();for(let i=0;i<Math.min(dl,labels.length);i++){const x=gx(i),y=gy(act[i]);i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
    const ld=Math.min(dl,labels.length)-1;ctx.lineTo(gx(ld),pad.t+ch);ctx.lineTo(gx(0),pad.t+ch);ctx.closePath();ctx.fill();

    // Points
    for(let i=0;i<Math.min(dl,labels.length);i++){ctx.fillStyle='rgba(0,58,160,0.3)';ctx.beginPath();ctx.arc(gx(i),gy(pred[i]),3,0,Math.PI*2);ctx.fill();ctx.fillStyle='#003aa0';ctx.beginPath();ctx.arc(gx(i),gy(act[i]),hovered===i?6:4,0,Math.PI*2);ctx.fill();ctx.strokeStyle='white';ctx.lineWidth=2;ctx.stroke();}

    // Tooltip
    if(hovered!==null&&hovered<labels.length){const i=hovered,x=gx(i),yA=gy(act[i]);ctx.fillStyle='#001845';const txt=`${labels[i]} — Actual: ${act[i].toLocaleString()} | Predicted: ${pred[i].toLocaleString()}`;const m=ctx.measureText(txt);const tw=m.width+20,th=28;let tx=x-tw/2;if(tx<pad.l)tx=pad.l;if(tx+tw>r.width-pad.r)tx=r.width-pad.r-tw;ctx.beginPath();ctx.roundRect(tx,yA-th-12,tw,th,6);ctx.fill();ctx.fillStyle='white';ctx.font='600 11px Inter,sans-serif';ctx.textAlign='left';ctx.fillText(txt,tx+10,yA-th-12+18);}
  }, [anim, hovered, range]);

  const handleMove = (ev: React.MouseEvent<HTMLCanvasElement>) => {
    const c=canvasRef.current; if(!c) return;
    const r=c.getBoundingClientRect(); const mx=ev.clientX-r.left;
    const{s,e}=getSlice(); const cnt=e-s; const pad={l:55,r:20};
    const cw=r.width-pad.l-pad.r; const xs=cw/(cnt-1);
    const idx=Math.round((mx-pad.l)/xs); setHovered(idx>=0&&idx<cnt?idx:null);
  };

  const totalP=predicted.reduce((a,b)=>a+b,0); const totalA=actual.reduce((a,b)=>a+b,0);
  const variance=((totalA-totalP)/totalP*100).toFixed(1);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}><div><h1 className={styles.pageTitle}>Predictive Analytics</h1><p className={styles.pageSubtitle}>Demand Timeline & Crowd Forecasting</p></div><div className={styles.liveIndicator}><span className={styles.liveDot} /> Live</div></header>

      <div className={styles.peakRow}>
        {peaks.map(p=>(
          <div key={p.label} className={`${styles.peakCard} ${p.semanticClass}`}>
            <span className="material-symbols-outlined" style={{fontSize:'22px'}}>{p.icon}</span>
            <div><p className={styles.peakLabel}>{p.label}</p><div className={styles.peakValues}><span className={styles.peakValue}>{p.value}</span><span className={styles.peakTime}>@ {p.time}</span></div></div>
          </div>
        ))}
        <div className={`${styles.peakCard} semanticAlert_info`}>
          <span className="material-symbols-outlined" style={{fontSize:'22px'}}>analytics</span>
          <div><p className={styles.peakLabel}>Prediction Accuracy</p><div className={styles.peakValues}><span className={styles.peakValue}>{variance}%</span><span className={styles.peakTime}>variance</span></div></div>
        </div>
      </div>

      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h3 className={styles.cardTitle}><span className="material-symbols-outlined" style={{color:'var(--primary)',fontSize:'1.2rem'}}>show_chart</span> Arrivals Timeline</h3>
          <div className={styles.legend}><span className={styles.legendItem}><span className={styles.legendActual}/>Actual</span><span className={styles.legendItem}><span className={styles.legendPredicted}/>Predicted</span></div>
          <div className={styles.timeFilters}>
            {(['all','pre','during','post'] as const).map(r=>(
              <button key={r} className={`${styles.timeBtn} ${range===r?styles.timeBtnActive:''}`} onClick={()=>setRange(r)}>
                {r==='all'?'Full Event':r==='pre'?'Pre-Match':r==='during'?'Match Time':'Post-Match'}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.chartWrap}><canvas ref={canvasRef} className={styles.canvas} onMouseMove={handleMove} onMouseLeave={()=>setHovered(null)} /></div>
      </div>
    </div>
  );
}
