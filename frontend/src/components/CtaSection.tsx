import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from '@docusaurus/Link';
import styles from './CtaSection.module.css';

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const CtaSection: React.FC<CtaSectionProps> = ({
  title = "Ready to Build the Future?",
  subtitle = "Join thousands of researchers and developers building the next generation of humanoid AI",
  primaryCtaText = "Start Building",
  primaryCtaLink = "/docs/getting-started",
  secondaryCtaText = "Join Community",
  secondaryCtaLink = "/community"
}) => {
  return (
    <section className={styles['cta-section']}>
      <div className={styles.container}>
        <div className={styles['cta-content']}>
          <h2 className={styles['cta-title']}>
            {title}
          </h2>
          <p className={styles['cta-subtitle']}>
            {subtitle}
          </p>
          <div className={styles['hero-buttons']}>
            <Link to={primaryCtaLink} className={`${styles.btn} ${styles['btn-primary']} ${styles['btn-lg']}`}>
              {primaryCtaText} <ChevronRight size={18} className={styles['ml-2']} />
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link to={secondaryCtaLink} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-lg']}`}>
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;