import { Icon } from './Icon';
import type { IconName } from './Icon';

const checks: { icon: IconName; label: string; detail: string }[] = [
  { icon: 'document', label: 'Government ID', detail: 'Identity check' },
  { icon: 'person', label: 'Selfie match', detail: 'Matched to the ID' },
  { icon: 'shield', label: 'Visible profile', detail: 'Ready to be introduced' },
];

export function VerificationFlow() {
  return (
    <ol className="verification-flow" aria-label="The profile verification process" data-reveal>
      {checks.map(({ icon, label, detail }, index) => (
        <li key={label}>
          <Icon name={icon} />
          <h3>{label}</h3>
          <p>{detail}</p>
          {index < checks.length - 1 && <span className="flow-connector" aria-hidden="true"><i /></span>}
        </li>
      ))}
    </ol>
  );
}
