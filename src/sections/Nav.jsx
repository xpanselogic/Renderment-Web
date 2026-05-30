// Sticky top nav. At rest, it's transparent so the hero shows through.
// Once the user scrolls past 40px, it shrinks to ~half size, gains a soft
// translucent cream backdrop with subtle blur + bottom border for legibility
// over content sections.
//
// On mobile (< 768px) the center nav links + Sign in are hidden — there's no
// room — leaving just the back-to-top logo and the Start trial CTA.
import React from 'react';
import { C, fonts } from '../design/tokens.jsx';
import { useIsMobile } from '../hooks/useViewport.jsx';

export default function Nav() {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const padX = isMobile ? 20 : 56;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? `10px ${padX}px` : `${isMobile ? 16 : 24}px ${padX}px`,
        background: scrolled ? 'rgba(245,241,232,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? C.b : 'transparent'}`,
        transition: 'padding 220ms ease, background 220ms ease, border-color 220ms ease',
        fontFamily: fonts.body,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1280 - 112, margin: '0 auto' }}>
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ display: 'flex', alignItems: 'center', gap: scrolled ? 9 : 12, color: 'inherit', textDecoration: 'none', cursor: 'pointer', transition: 'gap 220ms ease' }}
          aria-label="Back to top"
        >
          <div style={{ fontFamily: fonts.serif, fontSize: scrolled ? 20 : 26, fontWeight: 400, letterSpacing: '-0.02em', fontStyle: 'italic', color: C.a, transition: 'font-size 220ms ease', lineHeight: 1 }}>R</div>
          <span style={{ fontWeight: 600, fontSize: scrolled ? 15 : 17, letterSpacing: '-0.02em', transition: 'font-size 220ms ease' }}>Renderment</span>
        </a>
        <div style={{ display: 'flex', gap: scrolled ? 24 : 32, fontSize: scrolled ? 13 : 14, color: C.ink, alignItems: 'center', transition: 'gap 220ms ease, font-size 220ms ease' }}>
          {!isMobile && (
            <>
              {[
                ['Product', '#product'],
                ['Pricing', '#pricing'],
                ['Customers', '#customers'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <a key={label} href={href} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>{label}</a>
              ))}
              <span style={{ width: 1, height: 16, background: C.b }} />
              <a href="https://app.renderment.com/login" style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Sign in</a>
            </>
          )}
          <a href="https://app.renderment.com/register" style={{ background: C.ink, color: C.bg, padding: scrolled ? '7px 14px' : '10px 18px', borderRadius: 6, fontSize: scrolled ? 12 : 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block', transition: 'padding 220ms ease, font-size 220ms ease', whiteSpace: 'nowrap' }}>Start trial</a>
        </div>
      </div>
    </nav>
  );
}
