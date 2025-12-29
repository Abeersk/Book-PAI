import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ThemedImage from '@theme/ThemedImage';
import styles from './styles.module.css';

interface HomepageHeaderProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function HomepageHeader({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink
}: HomepageHeaderProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={clsx('hero__title', styles.title)}>{title}</h1>
          <p className={clsx('hero__subtitle', styles.subtitle)}>{subtitle}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--secondary button--lg', styles.ctaButton)}
              to={ctaLink}>
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                className={clsx('button button--outline button--secondary button--lg', styles.secondaryButton)}
                to={secondaryCtaLink}>
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}