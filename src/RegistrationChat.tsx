import { Icon } from './Icon';
import { links } from './links';
import { ShagunAvatar } from './ShagunAvatar';

export function RegistrationChat() {
  return (
    <section className="registration-chat" aria-labelledby="chat-title">
      <div className="chat-topline"><span>A simple first step</span><span>Free to join</span></div>
      <header className="chat-header">
        <span className="chat-avatar">
          <ShagunAvatar />
        </span>
        <div><h2 id="chat-title">Hi, I’m Shagun.</h2><p>I’ll help you get started</p></div>
      </header>
      <div className="chat-body">
        <div className="chat-message">
          <p>Ready to meet your kind of person?</p>
          <p>A few quick questions will help us set up your free profile.</p>
        </div>
        <a className="button chat-register" href={links.join}>
          Get started free <Icon name="arrow" />
        </a>
        <p className="chat-time">For you, a family member, or a friend.</p>
      </div>
      <footer className="chat-footer"><p>Already have a profile? <a href={links.signIn}>Sign in <Icon name="arrow" /></a></p></footer>
    </section>
  );
}
