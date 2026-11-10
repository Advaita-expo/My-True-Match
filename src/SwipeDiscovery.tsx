import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { Icon } from './Icon';
import { assetUrl } from './assetUrl';
import { links } from './links';
import './SwipeDiscovery.css';

interface SampleProfile {
  name: string;
  age: number;
  city: string;
  work: string;
  interests: string[];
  photo: string;
  photographer: string;
  photoSource: string;
}

const profiles: SampleProfile[] = [
  {
    name: 'Ananya', age: 29, city: 'Bengaluru', work: 'Product designer',
    interests: ['Bookshops', 'Weekend hikes'],
    photo: assetUrl('samples/sample-ananya.webp'), photographer: 'Anil Sharma',
    photoSource: 'https://www.pexels.com/photo/elegant-portrait-of-a-smiling-woman-outdoors-in-bengaluru-31878426/',
  },
  {
    name: 'Rohan', age: 30, city: 'Pune', work: 'Architect',
    interests: ['Slow Sundays', 'Live music'],
    photo: assetUrl('samples/sample-rohan.webp'), photographer: 'Shafeeque k',
    photoSource: 'https://www.pexels.com/photo/young-man-smiling-in-outdoor-portrait-30109427/',
  },
  {
    name: 'Meera', age: 28, city: 'Mumbai', work: 'Content strategist',
    interests: ['Good coffee', 'Long walks'],
    photo: assetUrl('samples/sample-meera.webp'), photographer: 'Satyam Pixels',
    photoSource: 'https://www.pexels.com/photo/vibrant-outdoor-portrait-of-smiling-woman-in-india-39767463/',
  },
];

type Direction = 'left' | 'right';
const swipeDuration = 320;
type CardStyle = CSSProperties & {
  '--card-x': string;
  '--card-rotation': string;
  '--interest-opacity': number;
  '--pass-opacity': number;
  '--stack-scale': number;
  '--stack-turn': string;
  '--photo-shift': string;
  '--swipe-duration': string;
};

function ProfileContent({ profile }: { profile: SampleProfile }) {
  return (
    <>
      <div className="swipe-photo">
        <img src={profile.photo} alt={`Stock photograph illustrating ${profile.name}’s fictional sample profile`} width="900" height="1350" draggable={false} />
        <span className="sample-label">Sample profile</span>
        <span className="swipe-stamp interest-stamp" aria-hidden="true">Interested</span>
        <span className="swipe-stamp pass-stamp" aria-hidden="true">Pass</span>
      </div>
      <div className="swipe-profile-copy">
        <h3>{profile.name}<span>{profile.age}</span></h3>
        <p className="sample-location"><Icon name="location" /> {profile.city}<span>·</span>{profile.work}</p>
        <ul className="sample-interests" aria-label="Sample interests">{profile.interests.map(interest => <li key={interest}>{interest}</li>)}</ul>
      </div>
    </>
  );
}

export function SwipeDiscovery({ motionEnabled }: { motionEnabled: boolean }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [exiting, setExiting] = useState<Direction | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [status, setStatus] = useState('Try a sample swipe. Right for interest, left to pass.');
  const start = useRef<{ x: number; lastX: number; lastTime: number; velocity: number; pointerId: number } | null>(null);
  const busy = useRef(false);
  const timeout = useRef<number | undefined>(undefined);
  const restoreFocus = useRef(false);
  const cardRef = useRef<HTMLElement>(null);
  const profile = profiles[index];
  const nextProfile = profiles[(index + 1) % profiles.length];

  useEffect(() => () => window.clearTimeout(timeout.current), []);
  useEffect(() => {
    if (restoreFocus.current) {
      cardRef.current?.focus({ preventScroll: true });
      restoreFocus.current = false;
    }
  }, [index]);

  function advance(direction: Direction) {
    if (busy.current) return;
    busy.current = true;
    setInteracted(true);
    restoreFocus.current = document.activeElement === cardRef.current;
    setExiting(direction);
    setStatus(direction === 'right'
      ? `You showed interest in ${profile.name}’s sample profile. Try the next one.`
      : `You passed ${profile.name}’s sample profile. Try the next one.`);

    timeout.current = window.setTimeout(() => {
      setIndex(current => (current + 1) % profiles.length);
      setDrag(0);
      setDragging(false);
      setExiting(null);
      busy.current = false;
    }, motionEnabled ? swipeDuration : 0);
  }

  function beginDrag(event: PointerEvent<HTMLElement>) {
    if (busy.current || event.button !== 0) return;
    start.current = { x: event.clientX, lastX: event.clientX, lastTime: event.timeStamp, velocity: 0, pointerId: event.pointerId };
    setInteracted(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLElement>) {
    const pointer = start.current;
    if (!pointer || pointer.pointerId !== event.pointerId) return;
    pointer.velocity = (event.clientX - pointer.lastX) / Math.max(1, event.timeStamp - pointer.lastTime);
    pointer.lastX = event.clientX;
    pointer.lastTime = event.timeStamp;
    setDrag(event.clientX - pointer.x);
  }

  function cancelDrag() {
    if (!start.current) return;
    start.current = null;
    setDrag(0);
    setDragging(false);
  }

  function endDrag(event: PointerEvent<HTMLElement>) {
    if (start.current?.pointerId !== event.pointerId) return;
    const distance = event.clientX - start.current.x;
    const freshVelocity = event.timeStamp - start.current.lastTime < 80 ? start.current.velocity : 0;
    const quickFlick = Math.abs(distance) > 24 && Math.abs(freshVelocity) > 0.55 && Math.sign(freshVelocity) === Math.sign(distance);
    const threshold = Math.min(80, event.currentTarget.clientWidth * 0.24);
    start.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (Math.abs(distance) >= threshold || quickFlick) advance(distance > 0 ? 'right' : 'left');
    else setDrag(0);
  }

  const stackProgress = exiting ? 1 : Math.min(1, Math.abs(drag) / 100);
  const style: CardStyle = {
    '--card-x': `${drag}px`,
    '--card-rotation': `${Math.max(-18, Math.min(18, drag / 22))}deg`,
    '--interest-opacity': Math.min(1, Math.max(0, drag / 70)),
    '--pass-opacity': Math.min(1, Math.max(0, -drag / 70)),
    '--stack-scale': 0.96 + stackProgress * 0.04,
    '--stack-turn': `${(1 - stackProgress) * 3}deg`,
    '--photo-shift': `${Math.max(-6, Math.min(6, drag * 0.025))}px`,
    '--swipe-duration': `${swipeDuration}ms`,
  };

  return (
    <section className="swipe-discovery" id="discover" aria-labelledby="discover-heading">
      <div className="shell content-section">
        <p className="section-label" data-reveal><span><Icon name="heart" /></span>Discover your kind of person</p>
        <div className="discovery-grid">
          <div className="discovery-copy" data-reveal>
            <p className="eyebrow">A feel for MyTrueMatch</p>
            <h2 id="discover-heading">A little swipe.<br />A chance to connect.</h2>
            <p>Look beyond a photo. Read a little about someone, find a shared interest, and see who you’d like to know.</p>
            <p>Try it with these sample profiles. Swipe right to show interest, or left to pass.</p>
            <a className="button" href={links.join}>Meet people on MyTrueMatch <Icon name="external" /></a>
            <p className="discovery-note"><Icon name="chat" /> A conversation starts when interest is mutual.</p>
          </div>
          <div className="swipe-demo" data-reveal>
            <div className="swipe-demo-top"><span>Interactive preview</span><span>{index + 1} / {profiles.length}</span></div>
            <div className="swipe-deck" style={style}>
              <div className="swipe-back-card back-one" aria-hidden="true" />
              <div className="swipe-under-card" aria-hidden="true"><ProfileContent profile={nextProfile} /></div>
              <article key={profile.name} ref={cardRef} className="swipe-card"
                data-exit={exiting ?? undefined} data-dragging={dragging} data-idle={!interacted}
                tabIndex={0} aria-label={`Sample profile. ${profile.name}, ${profile.age}`}
                aria-describedby="swipe-help" aria-keyshortcuts="ArrowLeft ArrowRight"
                onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag}
                onPointerCancel={cancelDrag} onLostPointerCapture={cancelDrag}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    event.preventDefault();
                    advance(event.key === 'ArrowRight' ? 'right' : 'left');
                  }
                }}>
                <ProfileContent profile={profile} />
              </article>
            </div>
            <div className="swipe-actions">
              <button type="button" className="pass-button" disabled={exiting !== null} onClick={() => advance('left')}>
                <Icon name="close" /><span>Pass</span>
              </button>
              <button type="button" className="interest-button" data-reaction={exiting === 'right'} disabled={exiting !== null} onClick={() => advance('right')}>
                <Icon name="heart" /><span>Show interest</span>
              </button>
            </div>
            <p id="swipe-help" className="swipe-help">Drag a card, use the buttons, or focus it and press ← / →.</p>
            <p className="swipe-status" role="status" aria-live="polite">{status}</p>
            <div className="swipe-demo-footer">
              <span>Fictional profiles · Stock photography</span>
              <button type="button" disabled={exiting !== null} onClick={() => {
                setIndex(0);
                setInteracted(false);
                setStatus('Preview reset. Try another sample swipe.');
              }}><Icon name="reset" /> Reset</button>
            </div>
            <a className="sample-photo-credit" href={profile.photoSource} target="_blank" rel="noreferrer">Photo by {profile.photographer} / Pexels</a>
          </div>
        </div>
      </div>
    </section>
  );
}
