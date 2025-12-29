import React, { useState, useEffect } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import {
  Brain,
  Cpu,
  Zap,
  Code,
  Users,
  BookOpen,
  ChevronRight,
  Play,
  Star,
  Github,
  Twitter,
  Linkedin,
  Shield,
  Palette,
  Download
} from 'lucide-react';
import styles from './index.module.css';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CtaSection from '../components/CtaSection';

const HomePage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  // Dark mode state management
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or stored preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedPreference = localStorage.getItem('theme');

    if (storedPreference) {
      setIsDarkMode(storedPreference === 'dark');
    } else {
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply theme class to document element
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Store preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Advanced AI platform for humanoid robotics research and development">
      <Head>
        <meta name="description" content="Advanced AI platform for humanoid robotics research and development" />
        <meta name="keywords" content="humanoid, ai, robotics, artificial intelligence, machine learning" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Custom theme toggle button */}
      <div className={styles.themeToggle}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={styles.themeToggleButton}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <main>
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles['footer-content']}>
          <div className={styles['footer-grid']}>
            <div className={styles['footer-column']}>
              <h3>Platform</h3>
              <ul className={styles['footer-links']}>
                <li><Link to="/docs/intro">Documentation</Link></li>
                <li><Link to="/docs/tutorial">Tutorials</Link></li>
                <li><Link to="/api">API Reference</Link></li>
                <li><Link to="/releases">Releases</Link></li>
              </ul>
            </div>
            <div className={styles['footer-column']}>
              <h3>Community</h3>
              <ul className={styles['footer-links']}>
                <li><Link to="/community">Forum</Link></li>
                <li><Link to="/discord">Discord</Link></li>
                <li><Link to="/github">GitHub</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
            <div className={styles['footer-column']}>
              <h3>Company</h3>
              <ul className={styles['footer-links']}>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/team">Team</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className={styles['footer-column']}>
              <h3>Resources</h3>
              <ul className={styles['footer-links']}>
                <li><Link to="/research">Research</Link></li>
                <li><Link to="/papers">Papers</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><Link to="/events">Events</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles['footer-bottom']}>
            <p>© {new Date().getFullYear()} {siteConfig.title}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default HomePage;