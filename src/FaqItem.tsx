import { useId, useState } from 'react';
import { Icon } from './Icon';

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="faq-item" data-open={open}>
      <h3>
        <button id={`question-${id}`} type="button" aria-expanded={open} aria-controls={`answer-${id}`}
          onClick={() => setOpen(!open)}>
          {question}<Icon name="plus" />
        </button>
      </h3>
      <div id={`answer-${id}`} className="faq-answer" role="region" aria-labelledby={`question-${id}`} aria-hidden={!open} inert={!open}>
        <div><p>{answer}</p></div>
      </div>
    </div>
  );
}
