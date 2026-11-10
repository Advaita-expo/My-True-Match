import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import type { IconName } from './Icon';
import { assetUrl } from './assetUrl';
import { RegistrationChat } from './RegistrationChat';
import { WeddingVideo } from './WeddingVideo';
import { links } from './links';
import { AnimatedNumber } from './AnimatedNumber';
import { FaqItem } from './FaqItem';
import { VerificationFlow } from './VerificationFlow';
import { SwipeDiscovery } from './SwipeDiscovery';
import { useMotionPreference, usePageMotion } from './usePageMotion';
import './styles.css';
import './motion.css';

const navigation = [
  { label: 'Discover', href: '#discover' },
  { label: 'The process', href: '#how-it-works' },
  { label: 'Our approach', href: '#safety' },
  { label: 'Varmala', href: '#varmala' },
  { label: 'Questions', href: '#faq' },
];

const steps: { icon: IconName; title: string; copy: string }[] = [
  { icon: 'person', title: 'Tell us about yourself.', copy: 'Shagun guides you through creating a profile. Share who you are and what you’re looking for.' },
  { icon: 'heart', title: 'Find someone who feels right.', copy: 'Browse one profile at a time, learn a little about someone, and show interest when you’d like to connect.' },
  { icon: 'chat', title: 'Let the conversation begin.', copy: 'When interest is mutual, talk on MyTrueMatch and take things forward at your own pace.' },
];

const principles: { icon: IconName; title: string; copy: string }[] = [
  { icon: 'shield', title: 'A verified beginning.', copy: 'Government ID and selfie checks before a profile is shown.' },
  { icon: 'lock', title: 'Privacy, by design.', copy: 'Talk on MyTrueMatch while your phone number stays private.' },
  { icon: 'people', title: 'For you. Or your family.', copy: 'Create a profile for yourself, a family member, or a friend.' },
];

const questions = [
  { question: 'Is it free to register?', answer: 'Yes. You can set up and verify your profile, explore matches, send a limited number of interests, and reply to messages for free.' },
  { question: 'Can I register for someone else?', answer: 'Yes. When Shagun asks who you’re looking for a match for, you can choose yourself, a relative, or a friend.' },
  { question: 'What does profile verification check?', answer: 'MyTrueMatch checks a government ID against a selfie before making a profile visible to other members.' },
  { question: 'Will my matches see my phone number?', answer: 'Your number stays private. After a mutual match, you can use MyTrueMatch to communicate.' },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="MyTrueMatch home">
      <img src={assetUrl('mytruematch-mark.png')} alt="" width="35" height="30" />
      <span>MyTrueMatch</span>
    </a>
  );
}

function RegisterLink({ compact = false }: { compact?: boolean }) {
  return (
    <a className={compact ? 'button button-small' : 'button'} href={links.join}>
      {compact ? 'Join for free' : 'Create your free profile'} <Icon name="external" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const wideScreen = window.matchMedia('(min-width: 881px)');
    const closeOnResize = () => setOpen(false);
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    wideScreen.addEventListener('change', closeOnResize);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      wideScreen.removeEventListener('change', closeOnResize);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="site-header" onKeyDown={(event) => {
      if (open && event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <div className="shell header-inner">
        <Brand />
        <div className="header-actions">
          <a className="sign-in" href={links.signIn}>Sign in</a>
          <span className="desktop-register"><RegisterLink compact /></span>
          <button ref={menuButton} type="button" className="icon-button menu-toggle"
            aria-controls="site-nav" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
        <nav id="site-nav" className="site-nav" data-open={open} aria-label="Main navigation">
          {navigation.map(({ label, href }) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <span className="mobile-register"><RegisterLink compact /></span>
        </nav>
      </div>
    </header>
  );
}

function Hero({ motionEnabled }: { motionEnabled: boolean }) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-stage">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span className="label-rule" /> Swipe to discover your person</p>
            <h1 id="hero-heading" aria-label="Your kind of person."><span className="hero-line"><span>Your kind</span></span><span className="hero-line"><span>of person.</span></span></h1>
            <p className="hero-description">Meet people one profile at a time. Swipe, show interest, and talk when the feeling is mutual.</p>
            <div className="hero-actions">
              <a className="button" href={links.join}>Get started free <Icon name="arrow" /></a>
              <a className="text-link hero-link" href="#discover">Try a swipe <Icon name="arrow" /></a>
            </div>
            <ol className="hero-start-steps" aria-label="Three simple steps">
              <li><Icon name="person" /><span>Join free</span></li>
              <li><Icon name="heart" /><span>Swipe</span></li>
              <li><Icon name="chat" /><span>Connect</span></li>
            </ol>
          </div>
          <RegistrationChat />
        </div>
        <div className="shell hero-folio"><span>MyTrueMatch</span><span>Every profile. ID verified.</span></div>
        <WeddingVideo motionEnabled={motionEnabled} />
      </div>
      <div className="shell principles">
        {principles.map(({ icon, title, copy }, index) => (
          <div className="principle" key={title} data-reveal data-reveal-order={index}>
            <div className="principle-top"><Icon name={icon} /><span>0{index + 1}</span></div>
            <h2>{title}</h2><p>{copy}</p>
          </div>
        ))}
      </div>
      <div className="shell launch-note"><span><strong>Launch offer</strong> Two months of premium access for women.</span><a href={links.join}>Join for free <Icon name="arrow" /></a></div>
    </section>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return <p className="section-label" data-reveal><span>{number}</span>{children}</p>;
}

function HowItWorks() {
  return (
    <section className="shell content-section process-section" id="how-it-works" aria-labelledby="steps-heading">
      <SectionLabel number="01">The process</SectionLabel>
      <div className="process-grid">
        <div className="section-intro" data-reveal>
          <h2 id="steps-heading">Your search,<br />step by step.</h2>
          <p>A clear way to meet someone who’s looking for the same commitment.</p>
          <a className="text-link" href={links.howItWorks}>Explore the process <Icon name="arrow" /></a>
        </div>
        <ol className="steps">
          {steps.map(({ icon, title, copy }, index) => (
            <li key={title} data-reveal data-reveal-order={index}>
              <span className="step-number">0{index + 1}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <Icon name={icon} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section className="safety-section" id="safety" aria-labelledby="safety-heading">
      <div className="shell content-section">
        <SectionLabel number="02">Our approach</SectionLabel>
        <div className="safety-heading" data-reveal>
          <h2 id="safety-heading">An important decision.<br />A clearer beginning.</h2>
          <p>Knowing who you’re meeting matters. Our identity checks and privacy controls support you as you get to know someone.</p>
        </div>
        <VerificationFlow />
        <ul className="safety-list" data-reveal>
          <li><Icon name="shield" /><h3>Verified before being seen.</h3><p>We check a government ID and match it to a selfie before a profile becomes visible.</p></li>
          <li><Icon name="lock" /><h3>Your number stays yours.</h3><p>Use messages, voice notes and calls on MyTrueMatch while keeping your contact details private.</p></li>
          <li><Icon name="check" /><h3>You decide what comes next.</h3><p>Move at your pace. Block or report someone directly from their profile whenever you need to.</p></li>
        </ul>
        <a className="text-link" href={links.guide}>Read the safety guide <Icon name="external" /></a>
      </div>
    </section>
  );
}

function Varmala({ motionEnabled }: { motionEnabled: boolean }) {
  return (
    <section className="varmala-section" id="varmala" aria-labelledby="varmala-heading">
      <div className="shell content-section">
        <SectionLabel number="03">A separate matchmaking service by MyTrueMatch</SectionLabel>
        <div className="varmala-brand-row" data-reveal>
          <div className="varmala-identity">
            <img src={assetUrl('varmala-symbol.svg')} alt="" width="80" height="53" />
            <p className="varmala-wordmark">Varmala<span>Curated matchmaking</span></p>
          </div>
          <p className="varmala-positioning">For people ready for marriage.<span>A personal search, led by a dedicated matchmaker.</span></p>
        </div>
        <div className="varmala-grid">
          <div className="section-intro" data-reveal>
            <p className="eyebrow">Serious about finding your life partner</p>
            <h2 id="varmala-heading">Your own<br />dedicated matchmaker.</h2>
            <p>You’re assigned a dedicated matchmaker who takes the time to understand you, your values, and what you’re looking for. They personally curate introductions with marriage in mind.</p>
            <p className="varmala-service-note">MyTrueMatch offers swipe-based discovery. Varmala is a separate, personalised matchmaking service with someone guiding your search.</p>
            <ul className="varmala-promises">
              <li><Icon name="person" /> One dedicated matchmaker for your search</li>
              <li><Icon name="people" /> Personally selected introductions</li>
              <li><Icon name="lock" /> A private, marriage-focused experience</li>
            </ul>
            <a className="button" href={links.varmala}>Explore Varmala matchmaking <Icon name="external" /></a>
            <p className="varmala-privacy">Your profile stays out of search. Photos are shared only when you both agree.</p>
          </div>
          <div className="varmala-options">
            <div className="varmala-matchmaker" data-reveal>
              <Icon name="person" />
              <div><p>Included with Gold &amp; Platinum</p><h3>A dedicated matchmaker,<br />assigned to you.</h3></div>
            </div>
            <p className="varmala-options-title">Choose your matchmaking plan</p>
            <article data-reveal>
              <p className="plan-label">Varmala Gold</p>
              <div className="plan-detail"><AnimatedNumber value={10} enabled={motionEnabled} /><p>Introductions<br />over one year</p><Icon name="people" /></div>
            </article>
            <article data-reveal>
              <p className="plan-label">Varmala Platinum</p>
              <div className="plan-detail"><AnimatedNumber value={18} enabled={motionEnabled} /><p>Introductions, or until<br />you find your match</p><Icon name="people" /></div>
            </article>
            <a href={links.varmala} className="plan-link">Ask about Gold &amp; Platinum <Icon name="arrow" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="shell content-section">
        <SectionLabel number="04">Before you begin</SectionLabel>
        <div className="faq-grid">
          <div className="section-intro" data-reveal>
            <h2 id="faq-heading">A few good<br />questions.</h2>
            <a className="text-link" href={links.faq}>Visit the help centre <Icon name="external" /></a>
          </div>
          <div className="questions" data-reveal>
            {questions.map(({ question, answer }) => (
              <FaqItem key={question} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const footerGroups = [
  { name: 'Explore', items: [
    { label: 'The process', href: '#how-it-works' }, { label: 'Varmala', href: '#varmala' },
    { label: 'Safety guide', href: links.guide }, { label: 'Journal', href: links.journal },
  ] },
  { name: 'Get in touch', items: [
    { label: 'Help centre', href: links.faq }, { label: 'Contact us', href: links.contact },
    { label: 'Franchise enquiries', href: links.franchise },
  ] },
  { name: 'Legal', items: [
    { label: 'Privacy policy', href: links.privacy }, { label: 'Terms of service', href: links.terms },
    { label: 'Disclaimer', href: links.disclaimer }, { label: 'Refund policy', href: links.refund },
  ] },
];

function Footer({ motionEnabled, onMotionToggle }: { motionEnabled: boolean; onMotionToggle: () => void }) {
  return (
    <footer className="footer">
      <div className="shell footer-main">
        <div className="footer-brand"><Brand /><p>Verified matrimony.<br />Bengaluru, India.</p></div>
        {footerGroups.map(({ name, items }) => (
          <div className="footer-group" key={name}><h2>{name}</h2>{items.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}</div>
        ))}
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} MyTrueMatch</span>
        <button className="footer-motion" type="button" onClick={onMotionToggle}>
          <Icon name={motionEnabled ? 'pause' : 'play'} /> {motionEnabled ? 'Pause animations' : 'Resume animations'}
        </button>
        <span>Find your person.</span>
      </div>
    </footer>
  );
}

export function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [motionEnabled, setMotionEnabled] = useMotionPreference();
  const [introComplete, setIntroComplete] = useState(!motionEnabled);
  usePageMotion(rootRef, motionEnabled);
  useEffect(() => {
    if (!motionEnabled) setIntroComplete(true);
  }, [motionEnabled]);

  return (
    <div id="top" ref={rootRef} data-motion={motionEnabled ? 'running' : 'paused'} data-intro-complete={introComplete}
      onAnimationEnd={(event) => {
        if (event.animationName === 'detail-arrive' && event.target instanceof Element &&
          event.target.matches('.hero-start-steps li:last-child')) setIntroComplete(true);
      }}>
      <div className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero motionEnabled={motionEnabled} />
        <SwipeDiscovery motionEnabled={motionEnabled} />
        <HowItWorks /><Safety /><Varmala motionEnabled={motionEnabled} /><Faq />
        <section className="closing" aria-labelledby="closing-heading">
          <div className="shell closing-inner" data-reveal><div><p className="eyebrow">When you’re ready</p><h2 id="closing-heading">Start your search.</h2></div><RegisterLink /></div>
        </section>
      </main>
      <Footer motionEnabled={motionEnabled} onMotionToggle={() => setMotionEnabled(!motionEnabled)} />
    </div>
  );
}

