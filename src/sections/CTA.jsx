// Field — Final CTA + footer.
import React from 'react';
import { C, fonts } from '../design/tokens.jsx';
import { useIsMobile } from '../hooks/useViewport.jsx';

export default function CTA() {
  const isMobile = useIsMobile();
  return (
    <section data-screen-label="07 CTA" style={{ background: C.ink, color: C.bg, padding: isMobile ? '64px 20px 56px' : '120px 56px 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(245,241,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,232,0.04) 1px, transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: fonts.mono, fontSize: 11, color: C.a, letterSpacing: '0.12em', marginBottom: 24 }}>
          <span style={{ width: 24, height: 1, background: C.a }} />
          № 07 · ENOUGH SAID
          <span style={{ width: 24, height: 1, background: C.a }} />
        </div>
        <h2 style={{ fontFamily: fonts.serif, fontWeight: 400, fontSize: isMobile ? 44 : 88, lineHeight: isMobile ? 1.05 : 0.98, letterSpacing: '-0.04em', margin: 0 }}>
          Hire the front desk<br />
          <span style={{ fontStyle: 'italic', color: C.a }}>that never quits.</span>
        </h2>
        <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.5, color: 'rgba(245,241,232,0.65)', marginTop: isMobile ? 20 : 28, maxWidth: 580, marginLeft: 'auto', marginRight: 'auto' }}>
          Setup in an afternoon. Free for 14 days. Cancel by reply.
        </p>
        <div style={{ marginTop: isMobile ? 32 : 42, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 14, justifyContent: 'center', alignItems: isMobile ? 'stretch' : 'center' }}>
          <a href="https://app.renderment.com/register" style={{ background: C.a, color: '#fff', padding: '17px 30px', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: fonts.body, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>Start your trial →</a>
          <a href="#contact" style={{ background: 'transparent', color: C.bg, border: `1px solid rgba(245,241,232,0.3)`, padding: '17px 28px', borderRadius: 8, fontSize: 16, fontWeight: 500, cursor: 'pointer', fontFamily: fonts.body, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>Book a 15-min demo</a>
        </div>
        <div style={{ marginTop: isMobile ? 28 : 36, fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 15, color: 'rgba(245,241,232,0.55)' }}>
          No credit card. No 12-month contract. No "let me transfer you to sales."
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: 1240, margin: isMobile ? '64px auto 0' : '120px auto 0', paddingTop: 40, borderTop: '1px solid rgba(245,241,232,0.12)', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr', gap: isMobile ? 28 : 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, border: `1.5px solid ${C.a}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 18, color: C.a }}>R</div>
            <div style={{ fontFamily: fonts.serif, fontSize: 22, fontStyle: 'italic', letterSpacing: '-0.01em' }}>Renderment</div>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(245,241,232,0.5)', maxWidth: 280, lineHeight: 1.55 }}>The agentic operating system for trades.</div>
        </div>
        {[
          ['Product', [
            ['Dispatch', '#product'],
            ['Quotes', '#product'],
            ['Invoices', '#product'],
            ['Inbox', '#product'],
            ['Pricing', '#pricing'],
          ]],
          ['Company', [
            ['About', '#how-it-works'],
            ['Customers', '#customers'],
            ['Careers', 'mailto:support@renderment.com?subject=Careers%20inquiry'],
            ['Press', 'mailto:support@renderment.com?subject=Press%20inquiry'],
          ]],
          ['Get help', [
            ['Setup guide', 'mailto:support@renderment.com?subject=Setup%20help'],
            ['Documentation', 'mailto:support@renderment.com?subject=Documentation%20request'],
            ['support@renderment.com', 'mailto:support@renderment.com'],
          ]],
        ].map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: C.a, letterSpacing: '0.12em', marginBottom: 14 }}>{h.toUpperCase()}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {items.map(([label, href]) => <a key={label} href={href} style={{ fontSize: 13, color: 'rgba(245,241,232,0.7)', textDecoration: 'none' }}>{label}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: 'relative', maxWidth: 1240, margin: '48px auto 0', paddingTop: 24, borderTop: '1px solid rgba(245,241,232,0.08)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: isMobile ? 8 : 0, fontFamily: fonts.mono, fontSize: 10, color: 'rgba(245,241,232,0.4)', letterSpacing: '0.06em', textAlign: isMobile ? 'center' : 'left' }}>
        <span>© 2026 RENDERMENT, LLC.</span>
        <span>OKLAHOMA, USA</span>
      </div>
    </section>
  );
}
