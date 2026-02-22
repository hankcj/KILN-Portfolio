/**
 * Project Intake Form
 * 
 * Hidden page for potential clients to submit project inquiries.
 * Accessible only through the Services page CTA.
 * System-form style interface.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SimplePageShell } from '@/components/dom/PageShell';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

const PROJECT_TYPES = [
  'Design System',
  'Creative Direction',
  'Digital Architecture',
  'Full Product',
  'Consultation',
  'Other'
];

const BUDGET_RANGES = [
  '$10k - $25k',
  '$25k - $50k',
  '$50k - $100k',
  '$100k+',
  'Flexible / TBD'
];

const TIMELINES = [
  'ASAP (Rush)',
  '1-2 Months',
  '3-6 Months',
  '6+ Months',
  'Flexible'
];

export default function IntakePage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });
  
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.intake-field', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.3
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed');
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <SimplePageShell
        currentPage="services"
        leftSideText="INTAKE_FORM"
        rightSideText="SUBMISSION_RECEIVED"
      >
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24 flex items-center justify-center">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-accent mb-6">
                <span className="text-accent text-2xl">✓</span>
              </div>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                TRANSMISSION RECEIVED
              </h1>
              <p className="text-body text-on-bg-tertiary max-w-lg mx-auto">
                Your inquiry has been logged. I&apos;ll review the details and respond within 48 hours.
              </p>
            </div>
            
            <div className="bg-bg-secondary border border-border-muted p-8 mb-8 text-left">
              <p className="font-mono text-system text-accent mb-4">{'// NEXT_STEPS'}</p>
              <ul className="space-y-3 text-small text-on-bg-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-accent">{'>'}</span>
                  <span>Initial review of project scope and fit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">{'>'}</span>
                  <span>Clarifying questions (if needed)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">{'>'}</span>
                  <span>Schedule discovery call or send proposal</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
              >
                <span>RETURN_HOME</span>
                <span>→</span>
              </a>
              <a 
                href="/services"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-border-muted text-on-bg-primary font-mono text-system hover:border-accent transition-colors"
              >
                <span>BACK_TO_SERVICES</span>
              </a>
            </div>
          </div>
        </div>
      </SimplePageShell>
    );
  }

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

          {/* Progress indicator */}
          <div className="mb-8 flex items-center gap-2 font-mono text-system text-on-surface-muted">
            <span>PROGRESS:</span>
            <div className="flex-1 h-px bg-border-muted relative">
              <div 
                className="absolute top-0 left-0 h-full bg-accent transition-all duration-300"
                style={{ 
                  width: `${(Object.values(formData).filter(v => v).length / Object.keys(formData).length) * 100}%` 
                }}
              />
            </div>
            <span>{Math.round((Object.values(formData).filter(v => v).length / Object.keys(formData).length) * 100)}%</span>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            
            {/* Contact Info Section */}
            <section className="intake-field">
              <p className="font-mono text-system text-accent mb-4 pb-2 border-b border-border-muted">
                C  CONTACT_INFORMATION
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="FULL_NAME"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(v) => handleChange('name', v)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  isFocused={focusedField === 'name'}
                  required
                />
                
                <FormField
                  label="EMAIL_ADDRESS"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(v) => handleChange('email', v)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  isFocused={focusedField === 'email'}
                  required
                />
              </div>

              <div className="mt-6">
                <FormField
                  label="COMPANY_ORGANIZATION"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={(v) => handleChange('company', v)}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  isFocused={focusedField === 'company'}
                  placeholder="Optional"
                />
              </div>
            </section>

            {/* Project Details Section */}
            <section className="intake-field">
              <p className="font-mono text-system text-accent mb-4 pb-2 border-b border-border-muted">
                C  PROJECT_SPECIFICATIONS
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="PROJECT_TYPE"
                  name="projectType"
                  value={formData.projectType}
                  options={PROJECT_TYPES}
                  onChange={(v) => handleChange('projectType', v)}
                  onFocus={() => setFocusedField('projectType')}
                  onBlur={() => setFocusedField(null)}
                  isFocused={focusedField === 'projectType'}
                  required
                />
                
                <SelectField
                  label="BUDGET_RANGE"
                  name="budget"
                  value={formData.budget}
                  options={BUDGET_RANGES}
                  onChange={(v) => handleChange('budget', v)}
                  onFocus={() => setFocusedField('budget')}
                  onBlur={() => setFocusedField(null)}
                  isFocused={focusedField === 'budget'}
                  required
                />
                
                <SelectField
                  label="TIMELINE"
                  name="timeline"
                  value={formData.timeline}
                  options={TIMELINES}
                  onChange={(v) => handleChange('timeline', v)}
                  onFocus={() => setFocusedField('timeline')}
                  onBlur={() => setFocusedField(null)}
                  isFocused={focusedField === 'timeline'}
                  required
                />
              </div>
            </section>

            {/* Project Description Section */}
            <section className="intake-field">
              <p className="font-mono text-system text-accent mb-4 pb-2 border-b border-border-muted">
                C  PROJECT_DESCRIPTION
              </p>
              
              <div className="relative">
                <label 
                  htmlFor="description" 
                  className="block font-mono text-system text-on-surface-muted mb-2"
                >
                  TELL_ME_ABOUT_YOUR_PROJECT
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={6}
                  className={`w-full bg-bg-primary border font-mono text-system p-4 resize-none transition-all duration-200 ${
                    focusedField === 'description'
                      ? 'border-accent shadow-[0_0_0_1px_rgba(0,54,216,0.3)]'
                      : 'border-border-muted hover:border-border-custom'
                  }`}
                  placeholder="Describe your project, goals, challenges, and what success looks like..."
                />
                <div className="mt-2 flex justify-between font-mono text-system text-[10px] text-on-surface-muted">
                  <span>Markdown supported</span>
                  <span>{formData.description.length} chars</span>
                </div>
              </div>
            </section>

            {/* Submit Section */}
            <section className="intake-field pt-6 border-t border-border-muted">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="text-small text-on-bg-tertiary">
                  <p className="mb-1">
                    By submitting, you agree to be contacted about your project.
                  </p>
                  <p className="font-mono text-system text-on-surface-muted">
                    Typical response time: 24-48 hours
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">TRANSMITTING</span>
                      <span>...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT_INQUIRY</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>

              {submitError && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30">
                  <p className="font-mono text-system text-red-400">
                    {'>'} TRANSMISSION_FAILED
                  </p>
                  <p className="text-small text-on-bg-secondary mt-1">
                    {submitError}
                  </p>
                </div>
              )}
            </section>
          </form>
        </div>
      </div>
    </SimplePageShell>
  );
}

// Form field component
interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  required?: boolean;
  placeholder?: string;
}

function FormField({ label, name, type, value, onChange, onFocus, onBlur, isFocused, required, placeholder }: FormFieldProps) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block font-mono text-system text-on-surface-muted mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        className={`w-full bg-bg-primary border font-mono text-system p-3 transition-all duration-200 ${
          isFocused
            ? 'border-accent shadow-[0_0_0_1px_rgba(0,54,216,0.3)]'
            : 'border-border-muted hover:border-border-custom'
        }`}
      />
      {isFocused && (
        <span className="absolute right-3 top-[38px] text-accent animate-pulse">_</span>
      )}
    </div>
  );
}

// Select field component
interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  required?: boolean;
}

function SelectField({ label, name, value, options, onChange, onFocus, onBlur, isFocused, required }: SelectFieldProps) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block font-mono text-system text-on-surface-muted mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        className={`w-full bg-bg-primary border font-mono text-system p-3 appearance-none cursor-pointer transition-all duration-200 ${
          isFocused
            ? 'border-accent shadow-[0_0_0_1px_rgba(0,54,216,0.3)]'
            : 'border-border-muted hover:border-border-custom'
        } ${!value ? 'text-on-surface-muted' : 'text-on-bg-primary'}`}
      >
        <option value="" disabled>SELECT_</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <span className="absolute right-3 top-[38px] text-on-surface-muted pointer-events-none">
        ↓
      </span>
    </div>
  );
}
