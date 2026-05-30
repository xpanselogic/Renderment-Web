import React from 'react';
import Nav from './sections/Nav.jsx';
import HeroField from './sections/HeroField.jsx';
import BuiltFor from './sections/BuiltFor.jsx';
import AiOptional from './sections/AiOptional.jsx';
import HowItWorks from './sections/HowItWorks.jsx';
import Features from './sections/Features.jsx';
import Everything from './sections/Everything.jsx';
import Demo from './sections/Demo.jsx';
import Pricing from './sections/Pricing.jsx';
import Contact from './sections/Contact.jsx';
import CTA from './sections/CTA.jsx';
import { C, fonts } from './design/tokens.jsx';

function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: `1px solid ${C.bDark}`,
        background: C.paper,
        color: C.ink,
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(26,29,46,0.18)',
        fontFamily: fonts.body,
        fontSize: 20,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 200ms ease, transform 200ms ease',
        zIndex: 100,
      }}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

export default function RendermentPage() {
  return (
    <div id="top" style={{ background: '#f5f1e8' }}>
      <Nav />
      <div className="rm-hero-wrap" data-screen-label="01 Hero">
        <HeroField />
      </div>
      <BuiltFor />
      <AiOptional />
      <HowItWorks />
      <Features />
      <Everything />
      <Demo />
      <Pricing />
      <Contact />
      <CTA />
      <BackToTop />
    </div>
  );
}
