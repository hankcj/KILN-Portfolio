/**
 * Checkout Cancel Page
 * 
 * Abandoned checkout. No transaction occurred.
 */

import { SimplePageShell } from '@/components/dom/PageShell';
import { ScrollReveal } from '@/components/dom/ScrollReveal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout Cancelled — KILN',
  description: 'Checkout was cancelled. No transaction occurred.',
};

export default function CancelPage() {
  return (
    <SimplePageShell
      currentPage="shop"
      leftSideText="TRANSACTION_CANCELLED"
      rightSideText="NO_CHARGE"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl mx-auto">
          
          {/* Cancel indicator */}
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-on-surface-muted mb-6">
                <span className="text-on-surface-muted text-2xl">×</span>
              </div>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                CHECKOUT CANCELLED
              </h1>
              <p className="text-body text-on-bg-tertiary">
                No transaction occurred. Your cart has been cleared.
              </p>
            </div>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal delay={0.2}>
            <div className="bg-bg-secondary border border-border-muted p-8 mb-8">
              <p className="font-mono text-system text-accent mb-4">
                {'// STATUS'}
              </p>
              <ul className="space-y-3 text-small text-on-bg-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-accent">{'>'}</span>
                  <span>No payment was processed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">{'>'}</span>
                  <span>No email was sent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">{'>'}</span>
                  <span>Products remain available if you wish to try again</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Navigation */}
          <ScrollReveal delay={0.3}>
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
              TXN: CANCELLED
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-on-surface-muted rounded-full" />
              <span className="font-mono text-system text-on-surface-muted">
                NO_CHARGE
              </span>
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}
