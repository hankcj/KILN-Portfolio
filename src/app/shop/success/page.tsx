/**
 * Checkout Success Page
 * 
 * Post-purchase confirmation. Download link sent via email.
 */

import { SimplePageShell } from '@/components/dom/PageShell';
import { ScrollReveal } from '@/components/dom/ScrollReveal';
import { stripe } from '@/lib/stripe';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase Complete — KILN',
  description: 'Thank you for your purchase. Download link will be sent via email.',
};

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;
  
  let customerEmail: string | null = null;

  // Try to fetch session details from Stripe
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      customerEmail = session.customer_details?.email || null;
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  }

  return (
    <SimplePageShell
      currentPage="shop"
      leftSideText="TRANSACTION_COMPLETE"
      rightSideText="CONFIRMATION_SENT"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl mx-auto">
          
          {/* Success indicator */}
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-accent mb-6">
                <span className="text-accent text-2xl">✓</span>
              </div>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                PURCHASE CONFIRMED
              </h1>
              <p className="text-body text-on-bg-tertiary">
                Transaction successful. Your download link is being prepared.
              </p>
            </div>
          </ScrollReveal>

          {/* Next steps */}
          <ScrollReveal delay={0.2}>
            <div className="bg-bg-secondary border border-border-muted p-8 mb-8">
              <p className="font-mono text-system text-accent mb-4">
                {'// NEXT_STEPS'}
              </p>
              <ul className="space-y-3 text-small text-on-bg-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-accent">{'>'}</span>
                  <span>
                    Check your email {customerEmail && `(${customerEmail})`} for the download link
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">{'>'}</span>
                  <span>
                    Link expires in 7 days (re-downloads available anytime)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">{'>'}</span>
                  <span>
                    Receipt and invoice included in confirmation email
                  </span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Support */}
          <ScrollReveal delay={0.3}>
            <div className="border border-border-muted p-6 mb-8">
              <p className="font-mono text-system text-on-surface-muted mb-2">
                QUESTIONS
              </p>
              <p className="text-small text-on-bg-secondary mb-4">
                If you don&apos;t receive the email within 10 minutes, 
                check your spam folder or contact support.
              </p>
              <a 
                href="mailto:hello@kiln.studio"
                className="font-mono text-system text-accent hover:underline"
              >
                hello@kiln.studio
              </a>
            </div>
          </ScrollReveal>

          {/* Navigation */}
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/shop"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
              >
                <span>RETURN_TO_SHOP</span>
                <span>→</span>
              </a>
              <a 
                href="/"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-border-muted text-on-bg-primary font-mono text-system hover:border-accent transition-colors"
              >
                <span>BACK_TO_ORIGIN</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border-muted flex justify-between items-center">
            <div className="font-mono text-system text-on-surface-muted">
              TXN: {session_id ? session_id.slice(-8).toUpperCase() : 'UNKNOWN'}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="font-mono text-system text-on-surface-muted">
                CONFIRMED
              </span>
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}
