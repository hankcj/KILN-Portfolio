/**
 * Subscribe Form Component
 * 
 * Embedded email subscription form that submits to Listmonk.
 * Matches the site's brutalist design language.
 */

'use client';

import { useState } from 'react';

interface SubscribeFormProps {
  className?: string;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function SubscribeForm({ className = '' }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const subscribeUrl = process.env.NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL;
  const listIds = process.env.NEXT_PUBLIC_LISTMONK_LIST_IDS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscribeUrl) {
      setStatus('error');
      setErrorMessage('Subscription service not configured');
      return;
    }

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // Build form data for Listmonk
      const formData = new FormData();
      formData.append('email', email);
      if (name) formData.append('name', name);
      
      // Add list IDs if specified
      if (listIds) {
        listIds.split(',').forEach(id => {
          formData.append('l', id.trim());
        });
      }

      // Submit to Listmonk
      const response = await fetch(subscribeUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Listmonk doesn't send CORS headers typically
      });

      // Since no-cors doesn't give us response details, we assume success
      // Listmonk will handle duplicate subscriptions gracefully
      setStatus('success');
      setEmail('');
      setName('');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  // Don't render if no subscription URL is configured
  if (!subscribeUrl) {
    return null;
  }

  return (
    <div className={`bg-bg-primary border border-border-custom p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-border-muted">
        <p className="font-mono text-system text-accent mb-1 tracking-widest">
          {'// SUBSCRIBE_BY_EMAIL'}
        </p>
        <p className="text-small text-on-bg-tertiary">
          Get new transmissions delivered directly
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label 
            htmlFor="subscribe-email" 
            className="block font-mono text-system text-on-surface-muted mb-2"
          >
            EMAIL_ADDRESS <span className="text-accent">*</span>
          </label>
          <input
            id="subscribe-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="you@example.com"
            disabled={status === 'loading'}
            className="w-full bg-bg-secondary border border-border-custom px-4 py-3 
                       font-mono text-small text-on-bg-primary
                       placeholder:text-on-surface-muted/50
                       focus:outline-none focus:border-accent
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          />
        </div>

        {/* Name Field (Optional) */}
        <div>
          <label 
            htmlFor="subscribe-name" 
            className="block font-mono text-system text-on-surface-muted mb-2"
          >
            NAME <span className="text-on-surface-muted/50">(optional)</span>
          </label>
          <input
            id="subscribe-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={status === 'loading'}
            className="w-full bg-bg-secondary border border-border-custom px-4 py-3 
                       font-mono text-small text-on-bg-primary
                       placeholder:text-on-surface-muted/50
                       focus:outline-none focus:border-accent
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-bg-secondary border border-border-custom 
                     px-6 py-4 mt-2
                     font-mono text-system text-on-bg-primary
                     hover:bg-bg-tertiary hover:border-accent
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border-custom
                     transition-all duration-200
                     flex items-center justify-center gap-3"
        >
          {status === 'loading' ? (
            <>
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>SUBMITTING...</span>
            </>
          ) : (
            <>
              <span>SUBSCRIBE</span>
              <span className="text-accent">→</span>
            </>
          )}
        </button>
      </form>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="mt-4 p-4 bg-accent/10 border border-accent/30">
          <p className="font-mono text-system text-accent">
            {'>'} SUBSCRIPTION INITIATED
          </p>
          <p className="text-small text-on-bg-secondary mt-1">
            Check your email to confirm your subscription.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30">
          <p className="font-mono text-system text-red-400">
            {'>'} ERROR
          </p>
          <p className="text-small text-on-bg-secondary mt-1">
            {errorMessage}
          </p>
        </div>
      )}

      {/* Privacy Note */}
      <p className="mt-4 font-mono text-xs text-on-surface-muted/60 text-center">
        No spam. Unsubscribe at any time.
      </p>
    </div>
  );
}
