'use client';

import { useState } from 'react';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function ProjectSignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Signup failed');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Try again.',
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full md:w-auto min-w-[320px]">
        <div className="p-4 bg-accent/10 border border-accent/30">
          <p className="font-mono text-system text-accent">
            {'>'} YOU&apos;RE ON THE LIST
          </p>
          <p className="text-small text-on-bg-secondary mt-1">
            We&apos;ll reach out when early access opens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="operator@domain.com"
            disabled={status === 'loading'}
            className="px-4 py-3 bg-bg-primary border border-border-muted text-on-bg-primary font-mono text-system placeholder:text-on-surface-muted focus:border-accent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed min-w-[280px] transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <span className="w-2 h-2 bg-on-accent rounded-full animate-pulse" />
                <span>SUBMITTING</span>
              </>
            ) : (
              <span>JOIN_WAITLIST</span>
            )}
          </button>
        </div>

        {status === 'error' && (
          <p className="font-mono text-system text-red-400 text-xs">
            {'>'} {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
