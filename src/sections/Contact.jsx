// Field — Contact form.
// Inquiry capture for renderment.com. Submits to the api.renderment.com
// backend (POST /v1/contact-leads) which audit-logs + forwards to the sales
// inbox via Resend.
//
// The SMS-opt-in checkbox is the visible affirmative-consent artifact required
// by Twilio A2P 10DLC for the campaign CTA proof. It's OPTIONAL on the form
// (consent can be declined and the inquiry still sent) so we never coerce
// consent — declined opt-ins still record the choice server-side via the
// `sms_opt_in: false` payload.
//
// Honeypot: hidden `website` field. Real users never see it; bots fill it.
// Submissions where website is non-empty are audit-tagged as spam and the
// email forward is skipped server-side.
import React from 'react';
import { C, fonts, SectionHead } from '../design/tokens.jsx';
import { useIsMobile } from '../hooks/useViewport.jsx';

const API_BASE = 'https://api.renderment.com';
const CONTACT_ENDPOINT = `${API_BASE}/v1/contact-leads`;

const FIELD_BG = '#fff';
const FIELD_BORDER = C.bDark;
const FIELD_FOCUS = C.a;

function Field({ label, required, children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: fonts.body }}>
      <span style={{ fontSize: 12, fontFamily: fonts.mono, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.m, fontWeight: 600 }}>
        {label}{required && <span style={{ color: C.a, marginLeft: 6 }}>*</span>}
      </span>
      {children}
    </label>
  );
}

function inputStyle(isMobile) {
  return {
    background: FIELD_BG,
    color: C.ink,
    border: `1px solid ${FIELD_BORDER}`,
    borderRadius: 8,
    padding: '13px 14px',
    fontSize: isMobile ? 15 : 14,
    fontFamily: fonts.body,
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 160ms ease',
  };
}

function focusHandlers() {
  return {
    onFocus: (e) => { e.target.style.borderColor = FIELD_FOCUS; },
    onBlur: (e) => { e.target.style.borderColor = FIELD_BORDER; },
  };
}

export default function Contact() {
  const isMobile = useIsMobile();
  const [name, setName] = React.useState('');
  const [businessName, setBusinessName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [smsOptIn, setSmsOptIn] = React.useState(false);
  const [website, setWebsite] = React.useState(''); // honeypot
  const [status, setStatus] = React.useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = React.useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          business_name: businessName.trim() || null,
          email: email.trim(),
          phone: phone.trim() || null,
          message: message.trim(),
          sms_opt_in: smsOptIn,
          website, // honeypot — sent as-is
        }),
      });
      if (!res.ok) {
        const detail = await res.json().catch(() => null);
        const msg = detail?.detail
          ? (typeof detail.detail === 'string' ? detail.detail : 'Please check your entries and try again.')
          : `Submission failed (${res.status}).`;
        setStatus('error');
        setErrorMsg(msg);
        return;
      }
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error — please try again, or email sales@renderment.com.');
    }
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  return (
    <section
      id="contact"
      data-screen-label="07 Contact"
      style={{
        background: C.paper,
        padding: isMobile ? '64px 20px 56px' : '120px 56px 100px',
        borderTop: `1px solid ${C.b}`,
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SectionHead
          folio="№ 07"
          eyebrow="Get in touch"
          title={<>Tell us about <span style={{ fontStyle: 'italic', color: C.a }}>your shop.</span></>}
          kicker="Sales questions, demos, custom plans — start here. We reply within one business day from sales@renderment.com."
        />

        <div
          style={{
            marginTop: isMobile ? 48 : 64,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
            gap: isMobile ? 32 : 56,
            alignItems: 'start',
          }}
        >
          {/* Form column */}
          <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Honeypot — hidden from real users and screen readers */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label htmlFor="rm-website">Website (leave blank)</label>
              <input
                id="rm-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
              <Field label="Your name" required htmlFor="rm-name">
                <input
                  id="rm-name"
                  type="text"
                  required
                  value={name}
                  maxLength={120}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle(isMobile)}
                  {...focusHandlers()}
                  disabled={isSent}
                />
              </Field>
              <Field label="Business" htmlFor="rm-business">
                <input
                  id="rm-business"
                  type="text"
                  value={businessName}
                  maxLength={200}
                  onChange={(e) => setBusinessName(e.target.value)}
                  style={inputStyle(isMobile)}
                  {...focusHandlers()}
                  disabled={isSent}
                  placeholder="Plumbing / electric / HVAC / etc."
                />
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
              <Field label="Email" required htmlFor="rm-email">
                <input
                  id="rm-email"
                  type="email"
                  required
                  value={email}
                  maxLength={254}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle(isMobile)}
                  {...focusHandlers()}
                  disabled={isSent}
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone (for SMS)" htmlFor="rm-phone">
                <input
                  id="rm-phone"
                  type="tel"
                  value={phone}
                  maxLength={40}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle(isMobile)}
                  {...focusHandlers()}
                  disabled={isSent}
                  autoComplete="tel"
                  placeholder="+1 (555) 555-0100"
                />
              </Field>
            </div>

            <Field label="What can we help with?" required htmlFor="rm-message">
              <textarea
                id="rm-message"
                required
                value={message}
                maxLength={2000}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                style={{ ...inputStyle(isMobile), resize: 'vertical', minHeight: 120, fontFamily: fonts.body }}
                {...focusHandlers()}
                disabled={isSent}
                placeholder="A demo, a custom plan, a question about how it works on a roofing crew — anything."
              />
            </Field>

            {/* SMS opt-in checkbox — the Twilio CTA proof artifact */}
            <label
              htmlFor="rm-sms-opt-in"
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                padding: '14px 16px',
                background: C.bg,
                border: `1px solid ${C.b}`,
                borderRadius: 8,
                cursor: isSent ? 'default' : 'pointer',
                fontFamily: fonts.body,
              }}
            >
              <input
                id="rm-sms-opt-in"
                type="checkbox"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                disabled={isSent}
                style={{ marginTop: 3, width: 16, height: 16, accentColor: C.a, cursor: isSent ? 'default' : 'pointer', flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, color: C.m, lineHeight: 1.55 }}>
                I consent to receive transactional SMS from Renderment about my inquiry.
                Message frequency varies. Msg &amp; data rates may apply. Reply STOP to
                unsubscribe, HELP for help. See our{' '}
                <a
                  href="https://xpanselogic.github.io/Renderment-Legal/privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: C.a, textDecoration: 'underline' }}
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href="https://xpanselogic.github.io/Renderment-Legal/terms.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: C.a, textDecoration: 'underline' }}
                >
                  Terms
                </a>.
              </span>
            </label>

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 14, alignItems: isMobile ? 'stretch' : 'center', marginTop: 4 }}>
              <button
                type="submit"
                disabled={isSending || isSent}
                style={{
                  background: isSent ? C.ok : C.a,
                  color: '#fff',
                  border: 'none',
                  padding: '15px 26px',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: (isSending || isSent) ? 'default' : 'pointer',
                  fontFamily: fonts.body,
                  opacity: isSending ? 0.75 : 1,
                  transition: 'background 200ms ease, opacity 200ms ease',
                }}
              >
                {isSent ? 'Sent — talk soon ✓' : isSending ? 'Sending…' : 'Send inquiry →'}
              </button>
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 14, color: C.m2 }}>
                {isSent
                  ? 'A copy lands at sales@renderment.com.'
                  : 'No obligation. Replies from a real person.'}
              </span>
            </div>

            {status === 'error' && (
              <div
                role="alert"
                style={{
                  background: 'rgba(200,66,31,0.08)',
                  border: `1px solid ${C.aDim}`,
                  color: C.a,
                  borderRadius: 8,
                  padding: '12px 14px',
                  fontSize: 13.5,
                  fontFamily: fonts.body,
                  lineHeight: 1.5,
                }}
              >
                {errorMsg || 'Submission failed. Please try again or email sales@renderment.com.'}
              </div>
            )}
          </form>

          {/* Side column */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: fonts.body }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: fonts.mono, color: C.a, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>Or reach us directly</div>
              <div style={{ fontFamily: fonts.serif, fontSize: 22, color: C.ink, letterSpacing: '-0.01em' }}>
                <a href="mailto:sales@renderment.com" style={{ color: C.ink, textDecoration: 'none', borderBottom: `1px solid ${C.b}` }}>sales@renderment.com</a>
              </div>
              <div style={{ marginTop: 6, fontSize: 13.5, color: C.m, lineHeight: 1.55 }}>
                For demos, custom plans, or partnership questions.
              </div>
            </div>

            <div style={{ height: 1, background: C.b }} />

            <div>
              <div style={{ fontSize: 11, fontFamily: fonts.mono, color: C.a, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>Already a customer?</div>
              <div style={{ fontSize: 14, color: C.m, lineHeight: 1.55 }}>
                Sign in at{' '}
                <a href="https://app.renderment.com/login" style={{ color: C.a, textDecoration: 'none', borderBottom: `1px solid ${C.aDim}` }}>app.renderment.com</a>{' '}
                or email{' '}
                <a href="mailto:support@renderment.com" style={{ color: C.a, textDecoration: 'none', borderBottom: `1px solid ${C.aDim}` }}>support@renderment.com</a>.
              </div>
            </div>

            <div style={{ height: 1, background: C.b }} />

            <div style={{ fontSize: 12.5, color: C.m2, lineHeight: 1.6, fontFamily: fonts.body }}>
              Renderment, LLC · Oklahoma, USA. We respond within one business
              day. Submissions are logged and routed to the founding team.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
