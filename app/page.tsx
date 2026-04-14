'use client';
import styles from '@/components/Hub/Hub.module.css';
import HubHeader from '@/components/Hub/Header';
import GatewayCard from '@/components/Hub/GatewayCard';
import HubFooter from '@/components/Hub/Footer';
import MobileNav from '@/components/Hub/MobileNav';
export default function LandingHub() {
  return (
    <div className={styles.hubWrapper}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800&display=swap" />
      
      <HubHeader />
      
      <main className={styles.main}>
        {/* Selection Content */}
        <div className={styles.leftSection}>
          <section className={styles.hubSection}>
            <div className={styles.branding}>
              <h1 className={styles.title}>The Orchestrated Event.</h1>
              <p className={styles.subtitle}>Select your gateway to the venue ecosystem.</p>
            </div>
            
            <div className={styles.gatewayGrid}>
              <GatewayCard 
                href="/admin/login"
                icon="hub"
                largeIcon="hub"
                title="Admin Console"
                description="Real-time crowd coordination, heatmaps, and advanced venue analytics for operators."
                actionLabel="Launch Console"
              />
              <GatewayCard 
                href="/portal/login"
                icon="person"
                largeIcon="confirmation_number"
                title="Attendee Portal"
                description="Smart wayfinding, contactless ticket management, and personalized event schedules."
                actionLabel="Enter Portal"
              />
            </div>
            
            <HubFooter />
          </section>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
