import React from 'react';
import { Grid, Column } from '@carbon/react';
import { useI18n } from '@/hooks/useI18n';
import FeatureCard from '@/components/common/FeatureCard';
import '@/styles/home.scss';

const Home: React.FC = () => {
  const { t } = useI18n();

  const coreFeatures = [
    {
      title: t('home.features.bobshell.title'),
      description: t('home.features.bobshell.description'),
      link: '/labs/bobshell',
    },
    {
      title: t('home.features.bobrules.title'),
      description: t('home.features.bobrules.description'),
      link: '/labs/bob-rules',
    },
    {
      title: t('home.features.custommodes.title'),
      description: t('home.features.custommodes.description'),
      link: '/labs/custom-modes',
    },
    {
      title: t('home.features.mcp.title'),
      description: t('home.features.mcp.description'),
      link: '/labs/mcp',
    },
  ];

  const useCases = [
    {
      title: t('home.usecases.devsecops.title'),
      description: t('home.usecases.devsecops.description'),
      link: '/labs/walkthrough',
      variant: 'featured' as const,
      badge: t('home.badges.popular'),
    },
    {
      title: t('home.usecases.appmod.title'),
      description: t('home.usecases.appmod.description'),
      link: '/labs/appmod',
    },
    {
      title: t('home.usecases.sdlc.title'),
      description: t('home.usecases.sdlc.description'),
      link: '/labs/sdlc',
    },
    {
      title: t('home.usecases.ibmi.title'),
      description: t('home.usecases.ibmi.description'),
      link: '/labs/ibmi',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="home-hero">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <h1 className="home-hero__title">{t('home.hero.title')}</h1>
            <p className="home-hero__subtitle">{t('home.hero.subtitle')}</p>
            <p className="home-hero__description">{t('home.hero.description')}</p>
          </Column>
        </Grid>
      </header>

      {/* Main Content */}
      <main className="home-content">
        <Grid>
          {/* Quick Start Section */}
          <Column lg={16} md={8} sm={4}>
            <section className="home-section">
              <FeatureCard
                title={t('home.quickstart.title')}
                description={t('home.quickstart.description')}
                link="/labs/getting-started"
                variant="quick-start"
              />
            </section>
          </Column>

          {/* Core Features Section */}
          <Column lg={16} md={8} sm={4}>
            <section className="home-section">
              <h2 className="home-section__title">{t('home.features.title')}</h2>
              <p className="home-section__subtitle">{t('home.features.subtitle')}</p>
              
              <Grid className="feature-grid">
                {coreFeatures.map((feature, index) => (
                  <Column key={index} lg={4} md={4} sm={4}>
                    <FeatureCard
                      title={feature.title}
                      description={feature.description}
                      link={feature.link}
                    />
                  </Column>
                ))}
              </Grid>
            </section>
          </Column>

          {/* Use Cases Section */}
          <Column lg={16} md={8} sm={4}>
            <section className="home-section">
              <h2 className="home-section__title">{t('home.usecases.title')}</h2>
              <p className="home-section__subtitle">{t('home.usecases.subtitle')}</p>
              
              <Grid className="feature-grid">
                {useCases.map((useCase, index) => (
                  <Column key={index} lg={4} md={4} sm={4}>
                    <FeatureCard
                      title={useCase.title}
                      description={useCase.description}
                      link={useCase.link}
                      variant={useCase.variant}
                      badge={useCase.badge}
                    />
                  </Column>
                ))}
              </Grid>
            </section>
          </Column>
        </Grid>
      </main>
    </div>
  );
};

export default Home;

// Made with Bob
