/**
 * Project Intake Form
 * 
 * Bloom.io embedded form for project inquiries.
 * Bloom handles all form submissions and CRM integration.
 */

'use client';

import Script from 'next/script';
import { SimplePageShell } from '@/components/dom/PageShell';

export default function IntakePage() {

  return (
    <SimplePageShell
      currentPage="services"
      leftSideText="INTAKE_FORM"
      rightSideText="PROJECT_INQUIRY"
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <header className="mb-12">
            <div className="flex justify-between items-start mb-4">
              <p className="font-mono text-system text-on-surface-muted tracking-widest">
                {'// PROJECT_INTAKE'}
              </p>
              <p className="font-mono text-system text-accent">
                STATUS: ACCEPTING
              </p>
            </div>
            <h1 className="font-heading text-display text-on-bg-primary mb-4">
              INITIATE PROJECT
            </h1>
            <p className="text-body text-on-bg-tertiary">
              Complete the form below to begin the conversation. 
              The more detail you provide, the better I can assess fit and scope.
            </p>
          </header>

          {/* Bloom.io Embedded Form */}
          <div className="mb-8">
            <div 
              data-bloom-form-id="ekl7z4jypd6mz" 
              style={{ width: '100%' }}
            />
          </div>

          <Script
            id="bloom-script-loader"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.bloomSettings = window.bloomSettings || {
                  userId: "2gr9m4o609zy0",
                  profileId: "l0zdg2wpx73go"
                };
                if (typeof bloomScript === 'undefined') {
                  var bloomScript = document.createElement('script');
                  bloomScript.async = true;
                  fetch('https://code.bloom.io/version?t=' + Date.now())
                    .then(function(t) { return t.text(); })
                    .then(function(t) {
                      bloomScript.src = 'https://code.bloom.io/widget.js?v=' + t;
                      document.head.appendChild(bloomScript);
                    });
                }
              `
            }}
          />
        </div>
      </div>
    </SimplePageShell>
  );
}
