import React, { useState, useEffect } from 'react';
import { Grid, Column } from '@carbon/react';
import { useI18n } from '@/hooks/useI18n';
import ChatMessage from '@/components/common/ChatMessage';
import '@/styles/narrative.scss';

interface ConversationTopic {
  id: string;
  title: string;
  description: string;
}

const Narrative: React.FC = () => {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState('intro');

  const topics: ConversationTopic[] = [
    { id: 'intro', title: t('narrative.topics.intro'), description: t('narrative.topics.intro.desc') },
    { id: 'productivity', title: t('narrative.topics.productivity'), description: t('narrative.topics.productivity.desc') },
    { id: 'security', title: t('narrative.topics.security'), description: t('narrative.topics.security.desc') },
    { id: 'multi-repo', title: t('narrative.topics.multirepo'), description: t('narrative.topics.multirepo.desc') },
    { id: 'cost', title: t('narrative.topics.cost'), description: t('narrative.topics.cost.desc') },
    { id: 'integration', title: t('narrative.topics.integration'), description: t('narrative.topics.integration.desc') },
    { id: 'competition', title: t('narrative.topics.competition'), description: t('narrative.topics.competition.desc') },
    { id: 'proof', title: t('narrative.topics.proof'), description: t('narrative.topics.proof.desc') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = topics.map(topic => document.getElementById(topic.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(topics[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [topics]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="narrative-page">
      {/* Page Header */}
      <header className="page-header">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <h1>{t('narrative.header.title')}</h1>
            <p className="page-subtitle">{t('narrative.header.subtitle')}</p>
            <p className="page-description">{t('narrative.header.description')}</p>
          </Column>
        </Grid>
      </header>

      {/* Main Content */}
      <main className="chat-container">
        {/* Sidebar Navigation */}
        <aside className="chat-topics">
          <h3>{t('narrative.sidebar.title')}</h3>
          <nav className="topic-nav">
            {topics.map((topic) => (
              <a
                key={topic.id}
                href={`#${topic.id}`}
                className={`topic-link ${activeSection === topic.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(topic.id);
                }}
              >
                {topic.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Chat History */}
        <div className="chat-history">
          {/* Introduction Section */}
          <section id="intro" className="chat-section">
            <div className="chat-section-header">
              <h2>{t('narrative.intro.title')}</h2>
              <p>{t('narrative.intro.subtitle')}</p>
            </div>

            <ChatMessage type="customer" sender={t('narrative.customer')} time={t('narrative.time.opening')}>
              <p>{t('narrative.intro.q1')}</p>
            </ChatMessage>

            <ChatMessage type="seller" sender={t('narrative.seller')}>
              <p>{t('narrative.intro.a1.p1')}</p>
              <div className="talk-points">
                <h4>{t('narrative.intro.a1.differentiators')}</h4>
                <ul>
                  <li><strong>{t('narrative.intro.a1.diff1.title')}</strong> - {t('narrative.intro.a1.diff1.desc')}</li>
                  <li><strong>{t('narrative.intro.a1.diff2.title')}</strong> - {t('narrative.intro.a1.diff2.desc')}</li>
                  <li><strong>{t('narrative.intro.a1.diff3.title')}</strong> - {t('narrative.intro.a1.diff3.desc')}</li>
                  <li><strong>{t('narrative.intro.a1.diff4.title')}</strong> - {t('narrative.intro.a1.diff4.desc')}</li>
                  <li><strong>{t('narrative.intro.a1.diff5.title')}</strong> - {t('narrative.intro.a1.diff5.desc')}</li>
                </ul>
              </div>
              <p><strong>{t('narrative.intro.a1.bottomline.label')}</strong> {t('narrative.intro.a1.bottomline.text')}</p>
            </ChatMessage>
          </section>

          {/* Productivity Section */}
          <section id="productivity" className="chat-section">
            <div className="chat-section-header">
              <h2>{t('narrative.productivity.title')}</h2>
              <p>{t('narrative.productivity.subtitle')}</p>
            </div>

            <ChatMessage type="customer" sender={t('narrative.customer')}>
              <p>{t('narrative.productivity.q1')}</p>
            </ChatMessage>

            <ChatMessage type="seller" sender={t('narrative.seller')}>
              <p>{t('narrative.productivity.a1.intro')}</p>
              
              <div className="time-breakdown">
                <h4>{t('narrative.productivity.a1.traditional.title')}</h4>
                <ul>
                  <li><strong>{t('narrative.productivity.a1.traditional.week1.label')}</strong> {t('narrative.productivity.a1.traditional.week1.text')}</li>
                  <li><strong>{t('narrative.productivity.a1.traditional.week2.label')}</strong> {t('narrative.productivity.a1.traditional.week2.text')}</li>
                  <li><strong>{t('narrative.productivity.a1.traditional.week3.label')}</strong> {t('narrative.productivity.a1.traditional.week3.text')}</li>
                  <li><strong>{t('narrative.productivity.a1.traditional.weeks46.label')}</strong> {t('narrative.productivity.a1.traditional.weeks46.text')}</li>
                  <li><strong>{t('narrative.productivity.a1.traditional.week7.label')}</strong> {t('narrative.productivity.a1.traditional.week7.text')}</li>
                  <li><strong>{t('narrative.productivity.a1.traditional.week8.label')}</strong> {t('narrative.productivity.a1.traditional.week8.text')}</li>
                </ul>

                <h4>{t('narrative.productivity.a1.withbob.title')}</h4>
                <ul>
                  <li><strong>0:30</strong> - {t('narrative.productivity.a1.withbob.step1')}</li>
                  <li><strong>0:20</strong> - {t('narrative.productivity.a1.withbob.step2')}</li>
                  <li><strong>0:45</strong> - {t('narrative.productivity.a1.withbob.step3')}</li>
                  <li><strong>8:00</strong> - {t('narrative.productivity.a1.withbob.step4')}</li>
                  <li><strong>0:30</strong> - {t('narrative.productivity.a1.withbob.step5')}</li>
                  <li><strong>{t('narrative.productivity.a1.withbob.norework.label')}</strong> - {t('narrative.productivity.a1.withbob.norework.text')}</li>
                </ul>
              </div>

              <div className="proof-box">
                <h4>{t('narrative.productivity.a1.proof.title')}</h4>
                <p><strong>{t('narrative.productivity.a1.proof.guardium.name')}</strong> {t('narrative.productivity.a1.proof.guardium.text')}</p>
                <p><strong>{t('narrative.productivity.a1.proof.concert.name')}</strong> {t('narrative.productivity.a1.proof.concert.text')}</p>
              </div>
            </ChatMessage>
          </section>

          {/* Security Section */}
          <section id="security" className="chat-section">
            <div className="chat-section-header">
              <h2>{t('narrative.security.title')}</h2>
              <p>{t('narrative.security.subtitle')}</p>
            </div>

            <ChatMessage type="customer" sender={t('narrative.customer')}>
              <p>{t('narrative.security.q1')}</p>
            </ChatMessage>

            <ChatMessage type="seller" sender={t('narrative.seller')}>
              <div className="security-response">
                <h4>{t('narrative.security.a1.builtin.title')}</h4>
                <p>{t('narrative.security.a1.builtin.intro')}</p>
                <ul>
                  <li><strong>{t('narrative.security.a1.builtin.realtime.title')}</strong> {t('narrative.security.a1.builtin.realtime.text')}</li>
                  <li><strong>{t('narrative.security.a1.builtin.autocorrect.title')}</strong> {t('narrative.security.a1.builtin.autocorrect.text')}</li>
                  <li><strong>{t('narrative.security.a1.builtin.prisma.title')}</strong> {t('narrative.security.a1.builtin.prisma.text')}</li>
                  <li><strong>{t('narrative.security.a1.builtin.zerodebt.title')}</strong> {t('narrative.security.a1.builtin.zerodebt.text')}</li>
                </ul>

                <h4>{t('narrative.security.a1.compliance.title')}</h4>
                <p>{t('narrative.security.a1.compliance.intro')}</p>
                <ul>
                  <li>{t('narrative.security.a1.compliance.point1')}</li>
                  <li>{t('narrative.security.a1.compliance.point2')}</li>
                  <li>{t('narrative.security.a1.compliance.point3')}</li>
                  <li><strong>{t('narrative.security.a1.compliance.proof.label')}</strong> {t('narrative.security.a1.compliance.proof.text')}</li>
                </ul>

                <p><strong>{t('narrative.security.a1.keydiff.label')}</strong> {t('narrative.security.a1.keydiff.text')}</p>
              </div>
            </ChatMessage>

            <ChatMessage type="customer" sender={t('narrative.customer')}>
              <p>{t('narrative.security.q2')}</p>
            </ChatMessage>

            <ChatMessage type="seller" sender={t('narrative.seller')}>
              <p>{t('narrative.security.a2.intro')}</p>
              <ul>
                <li><strong>{t('narrative.security.a2.clientzero.title')}</strong> {t('narrative.security.a2.clientzero.text')}</li>
                <li><strong>{t('narrative.security.a2.deployment.title')}</strong> {t('narrative.security.a2.deployment.text')}</li>
                <li><strong>{t('narrative.security.a2.governance.title')}</strong> {t('narrative.security.a2.governance.text')}</li>
                <li><strong>{t('narrative.security.a2.audit.title')}</strong> {t('narrative.security.a2.audit.text')}</li>
              </ul>
              <p>{t('narrative.security.a2.conclusion')}</p>
            </ChatMessage>
          </section>

          {/* Multi-Repository Section */}
          <section id="multi-repo" className="chat-section">
            <div className="chat-section-header">
              <h2>{t('narrative.multirepo.title')}</h2>
              <p>{t('narrative.multirepo.subtitle')}</p>
            </div>

            <ChatMessage type="customer" sender={t('narrative.customer')}>
              <p>{t('narrative.multirepo.q1')}</p>
            </ChatMessage>

            <ChatMessage type="seller" sender={t('narrative.seller')}>
              <p><strong>{t('narrative.multirepo.a1.yes')}</strong></p>
              <p>{t('narrative.multirepo.a1.intro')}</p>

              <div className="multi-repo-example">
                <h4>{t('narrative.multirepo.a1.example.title')}</h4>
                <p><strong>{t('narrative.multirepo.a1.example.task.label')}</strong> {t('narrative.multirepo.a1.example.task.text')}</p>
                <p><strong>{t('narrative.multirepo.a1.example.approach.label')}</strong></p>
                <ol>
                  <li>{t('narrative.multirepo.a1.example.step1')}</li>
                  <li>{t('narrative.multirepo.a1.example.step2')}</li>
                  <li>{t('narrative.multirepo.a1.example.step3')}</li>
                  <li>{t('narrative.multirepo.a1.example.step4')}</li>
                  <li>{t('narrative.multirepo.a1.example.step5')}</li>
                </ol>
                <p><strong>{t('narrative.multirepo.a1.example.time.label')}</strong> {t('narrative.multirepo.a1.example.time.text')}</p>
              </div>

              <p><strong>{t('narrative.multirepo.a1.conclusion.label')}</strong> {t('narrative.multirepo.a1.conclusion.text')}</p>
            </ChatMessage>
          </section>

          {/* Cost Transparency Section */}
          <section id="cost" className="chat-section">
            <div className="chat-section-header">
              <h2>{t('narrative.cost.title')}</h2>
              <p>{t('narrative.cost.subtitle')}</p>
            </div>

            <ChatMessage type="customer" sender={t('narrative.customer')}>
              <p>{t('narrative.cost.q1')}</p>
            </ChatMessage>

            <ChatMessage type="seller" sender={t('narrative.seller')}>
              <p><strong>{t('narrative.cost.a1.bobalytics.title')}</strong> - {t('narrative.cost.a1.bobalytics.intro')}</p>

              <div className="bobalytics-features">
                <ul>
                  <li><strong>{t('narrative.cost.a1.features.tasklevel.title')}</strong> {t('narrative.cost.a1.features.tasklevel.text')}</li>
                  <li><strong>{t('narrative.cost.a1.features.dashboards.title')}</strong> {t('narrative.cost.a1.features.dashboards.text')}</li>
                  <li><strong>{t('narrative.cost.a1.features.budget.title')}</strong> {t('narrative.cost.a1.features.budget.text')}</li>
                  <li><strong>{t('narrative.cost.a1.features.roi.title')}</strong> {t('narrative.cost.a1.features.roi.text')}</li>
                </ul>
              </div>

              <div className="roi-example">
                <h4>{t('narrative.cost.a1.roiexample.title')}</h4>
                <table className="roi-table">
                  <tbody>
                    <tr>
                      <td><strong>{t('narrative.cost.a1.roiexample.traditional.label')}</strong></td>
                      <td>{t('narrative.cost.a1.roiexample.traditional.value')}</td>
                    </tr>
                    <tr>
                      <td><strong>{t('narrative.cost.a1.roiexample.withbob.label')}</strong></td>
                      <td><strong>{t('narrative.cost.a1.roiexample.withbob.value')}</strong></td>
                    </tr>
                    <tr className="success-row">
                      <td><strong>{t('narrative.cost.a1.roiexample.savings.label')}</strong></td>
                      <td><strong>{t('narrative.cost.a1.roiexample.savings.value')}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p><strong>{t('narrative.cost.a1.cfo.label')}</strong></p>
              <ul>
                <li>{t('narrative.cost.a1.cfo.point1')}</li>
                <li>{t('narrative.cost.a1.cfo.point2')}</li>
                <li>{t('narrative.cost.a1.cfo.point3')}</li>
              </ul>
              <p>{t('narrative.cost.a1.conclusion')}</p>
            </ChatMessage>
          </section>

          {/* Integration Section */}
          <section id="integration" className="chat-section">
            <div className="chat-section-header">
              <h2>{t('narrative.integration.title')}</h2>
              <p>{t('narrative.integration.subtitle')}</p>
            </div>

            <ChatMessage type="customer" sender={t('narrative.customer')}>
              <p>{t('narrative.integration.q1')}</p>
            </ChatMessage>

            <ChatMessage type="seller" sender={t('narrative.seller')}>
              <p>{t('narrative.integration.a1.intro')}</p>

              <div className="integration-list">
                <h4>{t('narrative.integration.a1.supported.title')}</h4>
                <ul>
                  <li><strong>{t('narrative.integration.a1.supported.sourcecontrol.title')}</strong> {t('narrative.integration.a1.supported.sourcecontrol.text')}</li>
                  <li><strong>{t('narrative.integration.a1.supported.ides.title')}</strong> {t('narrative.integration.a1.supported.ides.text')}</li>
                  <li><strong>{t('narrative.integration.a1.supported.cicd.title')}</strong> {t('narrative.integration.a1.supported.cicd.text')}</li>
                  <li><strong>{t('narrative.integration.a1.supported.issuetracking.title')}</strong> {t('narrative.integration.a1.supported.issuetracking.text')}</li>
                </ul>
              </div>

              <p><strong>{t('narrative.integration.a1.workflow.title')}</strong></p>
              <ol>
                <li>{t('narrative.integration.a1.workflow.step1')}</li>
                <li>{t('narrative.integration.a1.workflow.step2')}</li>
                <li>{t('narrative.integration.a1.workflow.step3')}</li>
                <li>{t('narrative.integration.a1.workflow.step4')}</li>
              </ol>
              <p>{t('narrative.integration.a1.governance')}</p>

              <div className="deployment-box">
                <h4>{t('narrative.integration.a1.bonus.title')}</h4>
                <p>{t('narrative.integration.a1.bonus.text')}</p>
              </div>
            </ChatMessage>
          </section>

          {/* Competition Section */}
          <section id="competition" className="chat-section">
            <div className="chat-section-header">
              <h2>{t('narrative.competition.title')}</h2>
              <p>{t('narrative.competition.subtitle')}</p>
            </div>

            <ChatMessage type="customer" sender={t('narrative.customer')}>
              <p>{t('narrative.competition.q1')}</p>
            </ChatMessage>

            <ChatMessage type="seller" sender={t('narrative.seller')}>
              <p><strong>{t('narrative.competition.a1.copilot.intro')}</strong> {t('narrative.competition.a1.copilot.text')}</p>
              <p><strong>{t('narrative.competition.a1.bob.intro')}</strong> {t('narrative.competition.a1.bob.text')}</p>

              <div className="comparison-grid">
                <div className="compare-use-copilot">
                  <h4>{t('narrative.competition.a1.copilot.usefor.title')}</h4>
                  <ul>
                    <li>{t('narrative.competition.a1.copilot.usefor.point1')}</li>
                    <li>{t('narrative.competition.a1.copilot.usefor.point2')}</li>
                    <li>{t('narrative.competition.a1.copilot.usefor.point3')}</li>
                    <li>{t('narrative.competition.a1.copilot.usefor.point4')}</li>
                  </ul>
                </div>
                <div className="compare-use-bob">
                  <h4>{t('narrative.competition.a1.bob.usefor.title')}</h4>
                  <ul>
                    <li>{t('narrative.competition.a1.bob.usefor.point1')}</li>
                    <li>{t('narrative.competition.a1.bob.usefor.point2')}</li>
                    <li>{t('narrative.competition.a1.bob.usefor.point3')}</li>
                    <li>{t('narrative.competition.a1.bob.usefor.point4')}</li>
                    <li>{t('narrative.competition.a1.bob.usefor.point5')}</li>
                    <li>{t('narrative.competition.a1.bob.usefor.point6')}</li>
                  </ul>
                </div>
              </div>

              <p><strong>{t('narrative.competition.a1.both.label')}</strong> {t('narrative.competition.a1.both.text')}</p>

              <div className="unique-to-bob">
                <h4>{t('narrative.competition.a1.unique.title')}</h4>
                <ul>
                  <li>{t('narrative.competition.a1.unique.point1')}</li>
                  <li>{t('narrative.competition.a1.unique.point2')}</li>
                  <li>{t('narrative.competition.a1.unique.point3')}</li>
                  <li>{t('narrative.competition.a1.unique.point4')}</li>
                  <li>{t('narrative.competition.a1.unique.point5')}</li>
                </ul>
              </div>
            </ChatMessage>
          </section>

          {/* Proof Points Section */}
          <section id="proof" className="chat-section">
            <div className="chat-section-header">
              <h2>{t('narrative.proof.title')}</h2>
              <p>{t('narrative.proof.subtitle')}</p>
            </div>

            <ChatMessage type="customer" sender={t('narrative.customer')}>
              <p>{t('narrative.proof.q1')}</p>
            </ChatMessage>

            <ChatMessage type="seller" sender={t('narrative.seller')}>
              <div className="proof-points">
                <h4>{t('narrative.proof.a1.clientzero.title')}</h4>
                <p>{t('narrative.proof.a1.clientzero.intro')}</p>
                <ul>
                  <li><strong>{t('narrative.proof.a1.clientzero.stat1.label')}</strong> {t('narrative.proof.a1.clientzero.stat1.text')}</li>
                  <li><strong>{t('narrative.proof.a1.clientzero.stat2.label')}</strong> {t('narrative.proof.a1.clientzero.stat2.text')}</li>
                  <li><strong>{t('narrative.proof.a1.clientzero.stat3.label')}</strong> {t('narrative.proof.a1.clientzero.stat3.text')}</li>
                  <li><strong>{t('narrative.proof.a1.clientzero.stat4.label')}</strong> {t('narrative.proof.a1.clientzero.stat4.text')}</li>
                </ul>

                <h4>{t('narrative.proof.a1.casestudies.title')}</h4>

                <div className="case-study">
                  <h5>{t('narrative.proof.a1.guardium.name')}</h5>
                  <p><strong>{t('narrative.proof.a1.guardium.challenge.label')}</strong> {t('narrative.proof.a1.guardium.challenge.text')}</p>
                  <p><strong>{t('narrative.proof.a1.guardium.result.label')}</strong> {t('narrative.proof.a1.guardium.result.text')}</p>
                </div>

                <div className="case-study">
                  <h5>{t('narrative.proof.a1.concert.name')}</h5>
                  <p><strong>{t('narrative.proof.a1.concert.challenge.label')}</strong> {t('narrative.proof.a1.concert.challenge.text')}</p>
                  <p><strong>{t('narrative.proof.a1.concert.result.label')}</strong> {t('narrative.proof.a1.concert.result.text')}</p>
                </div>

                <div className="case-study">
                  <h5>{t('narrative.proof.a1.instana.name')}</h5>
                  <p><strong>{t('narrative.proof.a1.instana.challenge.label')}</strong> {t('narrative.proof.a1.instana.challenge.text')}</p>
                  <p><strong>{t('narrative.proof.a1.instana.result.label')}</strong> {t('narrative.proof.a1.instana.result.text')}</p>
                </div>
              </div>

              <p><strong>{t('narrative.proof.a1.references.label')}</strong> {t('narrative.proof.a1.references.text')}</p>
            </ChatMessage>
          </section>

          {/* Call to Action */}
          <section className="chat-cta">
            <h2>{t('narrative.cta.title')}</h2>
            <p>{t('narrative.cta.subtitle')}</p>
            <div className="cta-buttons">
              <a href="/labs/walkthrough" className="btn btn-primary">
                {t('narrative.cta.button')}
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Narrative;

// Made with Bob
