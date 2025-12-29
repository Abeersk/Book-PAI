import React from 'react';
import { ChevronRight, Play } from 'lucide-react';
import Link from '@docusaurus/Link';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "The Future of Humanoid AI is Here",
  subtitle = "Cutting-edge platform for developing, testing, and deploying advanced AI systems for humanoid robotics. Built with the latest research and industry best practices.",
  ctaText = "Get Started",
  ctaLink = "/docs/intro",
  secondaryCtaText = "Watch Demo",
  secondaryCtaLink = "/docs/tutorial"
}) => {
  return (
    <section className={styles['hero-section']}>
      <div className={styles.container}>
        <div className={styles['hero-content']}>
          <h1 className={styles['hero-title']}>
            {title}
          </h1>
          <p className={styles['hero-subtitle']}>
            {subtitle}
          </p>
          <div className={styles['hero-buttons']}>
            <Link to={ctaLink} className={`${styles.btn} ${styles['btn-primary']} ${styles['btn-lg']}`}>
              {ctaText} <ChevronRight size={18} className={styles['ml-2']} />
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link to={secondaryCtaLink} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-lg']}`}>
                <Play size={18} className={styles['mr-2']} /> {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;