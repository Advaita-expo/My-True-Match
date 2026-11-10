import { useEffect, useRef, useState } from 'react';
import { assetUrl } from './assetUrl';

const weddingPoster = assetUrl('hero-films/wedding-ritual.webp');

export function WeddingVideo({ motionEnabled }: { motionEnabled: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const background = video?.parentElement;
    if (!video || !background) return;
    let disposed = false;
    const bounds = background.getBoundingClientRect();
    let visible = bounds.bottom > 0 && bounds.top < window.innerHeight;

    function syncPlayback() {
      if (!video || disposed) return;
      if (!motionEnabled || !visible || document.hidden) {
        video.pause();
      } else {
        video.muted = true;
        void video.play().catch(() => { /* The poster remains visible if autoplay is unavailable. */ });
      }
    }

    const observer = new IntersectionObserver((entries) => {
      visible = entries.some(entry => entry.isIntersecting);
      syncPlayback();
    });
    observer.observe(background);
    document.addEventListener('visibilitychange', syncPlayback);
    video.addEventListener('canplay', syncPlayback);
    syncPlayback();
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      video.removeEventListener('canplay', syncPlayback);
      video.pause();
    };
  }, [motionEnabled]);

  return (
    <div className="wedding-film">
      <img className="hero-film-poster" src={weddingPoster} alt="" aria-hidden="true" fetchPriority="high" />
      <video ref={videoRef} className="hero-film" data-ready={ready}
        src={assetUrl('hero-films/mytruematch-wedding-loop.mp4')}
        poster={weddingPoster}
        width="1280" height="720" preload="auto" autoPlay={motionEnabled} loop muted playsInline
        disablePictureInPicture aria-hidden="true"
        onLoadedData={() => setReady(true)}
        onError={() => setReady(false)} />
    </div>
  );
}
