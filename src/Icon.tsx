import type { SVGProps } from 'react';

const paths = {
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  external: 'M6 18 18 6M8 6h10v10',
  shield: 'M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11ZM9 12l2 2 4-4',
  lock: 'M7 10h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2ZM8 10V7a4 4 0 0 1 8 0v3m-4 4v3',
  person: 'M15.5 8a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2',
  chat: 'M20 11.5a8 8 0 0 1-8 8 8.5 8.5 0 0 1-3.2-.6L4 20l1.2-4.3A8 8 0 1 1 20 11.5ZM8.5 11.5h7',
  check: 'm5 12 4 4L19 6',
  plus: 'M12 5v14M5 12h14',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'm6 6 12 12M6 18 18 6',
  play: 'M8 5v14l11-7Z',
  pause: 'M9 5v14m6-14v14',
  people: 'M14 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 21v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2m2-15a3 3 0 0 1 0 6m3 9v-2a5 5 0 0 0-3-4.6',
  document: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6M8 12h8m-8 4h5',
  clock: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2',
  globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z',
  heart: 'M20.8 5.7a5 5 0 0 0-7.1 0L12 7.4l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.2a5 5 0 0 0 0-7.1Z',
  location: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  reset: 'M3 11a9 9 0 1 1 2.6 7.4M3 4v7h7',
};

export type IconName = keyof typeof paths;
type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}
