'use client';
import styles from './Hub.module.css';

export default function VisualSection() {
  return (
    <div className={styles.rightSection}>
      <div className={styles.visualOverlay}>
        <div className={styles.immersiveImage}>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM9suZnz4UokHjuRDXcjmRTU3qz0_I71E7GQjCIg-tKpoNzKvA09vq-RQfgSkbfx9yGB7-SKQkHO7KnImUl6j9jQ5aKRHd2l0_QZ7n0_7YWVENrvjoj6mtf7q7SK-zpA5r116ThaXCib8_bRCmeNaHPi7FeN9lMDOH4r4l0AlDVMSe3vyiuZdepbIFEghcKKCtm0ZFrNnoe9eCeoWlYp_0dP-zZptDw207gbj2l8kYGszWuCZdW284pKUWIjc079XaVuESFJ5U3vs" 
            alt="Modern event venue" 
            className={styles.venueImg} 
          />
          <div className={styles.testimonialBox}>
            <span className={styles.testimonialTag}>Next-Gen Connectivity</span>
            <p className={styles.testimonialText}>
              "FlowSync transformed our venue's throughput by 40% through intelligent crowd steering."
            </p>
            <p className={styles.testimonialAuthor}>— Lead Operations, Nexus Arena</p>
          </div>
        </div>
      </div>
    </div>
  );
}
