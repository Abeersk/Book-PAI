import React from 'react';
import { Brain, Cpu, Zap, Code, Users, BookOpen, Shield, Palette, Download } from 'lucide-react';
import styles from './FeaturesSection.module.css';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    id: 1,
    title: 'Advanced AI Models',
    description: 'Cutting-edge neural networks and machine learning algorithms designed for humanoid robotics applications.',
    icon: <Brain size={24} />
  },
  {
    id: 2,
    title: 'Real-time Processing',
    description: 'Optimized for real-time performance with low latency and high throughput processing capabilities.',
    icon: <Zap size={24} />
  },
  {
    id: 3,
    title: 'Open Source',
    description: 'Completely open source with active community support and transparent development process.',
    icon: <Code size={24} />
  },
  {
    id: 4,
    title: 'Modular Architecture',
    description: 'Flexible and modular design allowing for easy customization and integration with existing systems.',
    icon: <Cpu size={24} />
  },
  {
    id: 5,
    title: 'Comprehensive Documentation',
    description: 'Extensive documentation with examples, tutorials, and API references for easy adoption.',
    icon: <BookOpen size={24} />
  },
  {
    id: 6,
    title: 'Security First',
    description: 'Built with security as a priority, featuring encrypted communications and secure data handling.',
    icon: <Shield size={24} />
  }
];

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title = "Powerful Features",
  subtitle = "Everything you need to build the next generation of humanoid robots",
  features = defaultFeatures
}) => {
  return (
    <section className={`${styles.section} ${styles['section--lg']}`}>
      <div className={styles.container}>
        <div className={`${styles['text-center']} ${styles['mb-12']}`}>
          <h2 className={`${styles['text-4xl']} ${styles['font-bold']} ${styles['mb-4']}`}>
            {title}
          </h2>
          <p className={`${styles['text-xl']} ${styles['mb-12']}`}>
            {subtitle}
          </p>
        </div>

        <div className={`${styles.grid} ${styles['grid-cols-1']} ${styles['md:grid-cols-2']} ${styles['lg:grid-cols-3']} ${styles['gap-8']}`}>
          {features.map((feature) => (
            <div key={feature.id} className={styles['feature-card']}>
              <div className={styles['feature-card-header']}>
                <div className={styles['feature-card-icon']}>
                  {feature.icon}
                </div>
                <h3 className={styles['feature-card-title']}>{feature.title}</h3>
              </div>
              <div className={styles['feature-card-description']}>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;