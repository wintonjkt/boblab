import React from 'react';
import { Tile } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  variant?: 'default' | 'featured' | 'quick-start';
  badge?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  link,
  variant = 'default',
  badge,
}) => {
  const getCardClassName = () => {
    const baseClass = 'feature-card';
    if (variant === 'featured') return `${baseClass} feature-card--featured`;
    if (variant === 'quick-start') return `${baseClass} feature-card--quick-start`;
    return baseClass;
  };

  return (
    <Tile className={getCardClassName()}>
      {badge && <span className="feature-card__badge">{badge}</span>}
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
      <Link to={link} className="feature-card__link">
        {variant === 'quick-start' ? 'Get Started' : 'Learn More'}
        <ArrowRight size={16} />
      </Link>
    </Tile>
  );
};

export default FeatureCard;

// Made with Bob