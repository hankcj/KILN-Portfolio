export interface RouteHaze {
  color: string;
  opacity: number;
  x: string;
  y: string;
}

export interface RouteTheme {
  backgroundStops: [string, string, string];
  accent: string;
  haze: RouteHaze;
  haze2?: RouteHaze;
  marquee?: string;
  sections?: Array<{ id: string; label: string }>;
}

export const routeThemes = {
  work: {
    backgroundStops: ['#13161F', '#161a26', '#111420'],
    accent: 'rgba(58, 125, 140, 0.08)',
    haze: { color: '58, 125, 140', opacity: 0.06, x: '25%', y: '15%' },
    haze2: { color: '0, 54, 216', opacity: 0.04, x: '80%', y: '85%' },
    marquee: 'Objects, systems, and frameworks from the studio archive',
    sections: [
      { id: 'work-header', label: 'Archive' },
      { id: 'work-entries', label: 'Objects' },
    ],
  },
  services: {
    backgroundStops: ['#13161F', '#171c24', '#13161F'],
    accent: 'rgba(58, 125, 140, 0.07)',
    haze: { color: '58, 125, 140', opacity: 0.07, x: '20%', y: '20%' },
    haze2: { color: '0, 54, 216', opacity: 0.05, x: '85%', y: '75%' },
    marquee: 'Scoped studio packages for web, copy, and creative direction',
    sections: [
      { id: 'services-header', label: 'Catalogue' },
      { id: 'services-packages', label: 'Packages' },
      { id: 'services-approach', label: 'Approach' },
      { id: 'services-criteria', label: 'Criteria' },
      { id: 'services-vectors', label: 'Vectors' },
      { id: 'services-contact', label: 'Contact' },
    ],
  },
  signal: {
    backgroundStops: ['#13161F', '#14181f', '#111420'],
    accent: 'rgba(0, 54, 216, 0.06)',
    haze: { color: '0, 54, 216', opacity: 0.05, x: '15%', y: '10%' },
    haze2: { color: '58, 125, 140', opacity: 0.04, x: '90%', y: '80%' },
    marquee: 'Essays, notes, and research from the studio',
    sections: [
      { id: 'signal-header', label: 'Signal' },
      { id: 'signal-articles', label: 'Archive' },
      { id: 'signal-subscribe', label: 'Subscribe' },
    ],
  },
  system: {
    backgroundStops: ['#13161F', '#151923', '#111420'],
    accent: 'rgba(0, 54, 216, 0.06)',
    haze: { color: '0, 54, 216', opacity: 0.06, x: '50%', y: '30%' },
    marquee: 'Infrastructure for long-term work',
    sections: [
      { id: 'system-header', label: 'System' },
      { id: 'system-philosophy', label: 'Philosophy' },
      { id: 'system-principles', label: 'Principles' },
      { id: 'system-implementation', label: 'Stack' },
      { id: 'system-typography', label: 'Type' },
      { id: 'system-changelog', label: 'Log' },
      { id: 'system-connect', label: 'Connect' },
      { id: 'system-acknowledgments', label: 'Status' },
    ],
  },
  project: {
    backgroundStops: ['#13161F', '#161a26', '#0f1219'],
    accent: 'rgba(58, 125, 140, 0.06)',
    haze: { color: '58, 125, 140', opacity: 0.06, x: '30%', y: '25%' },
    haze2: { color: '0, 54, 216', opacity: 0.04, x: '75%', y: '70%' },
    marquee: 'A second-brain product in active validation',
    sections: [
      { id: 'project-header', label: 'Product' },
      { id: 'project-process', label: 'Process' },
      { id: 'project-capabilities', label: 'Capabilities' },
      { id: 'project-users', label: 'Users' },
      { id: 'project-pricing', label: 'Pricing' },
      { id: 'project-access', label: 'Access' },
      { id: 'project-related', label: 'Related' },
    ],
  },
  shop: {
    backgroundStops: ['#13161F', '#171c24', '#111420'],
    accent: 'rgba(58, 125, 140, 0.05)',
    haze: { color: '58, 125, 140', opacity: 0.05, x: '20%', y: '15%' },
    haze2: { color: '0, 54, 216', opacity: 0.04, x: '85%', y: '80%' },
    marquee: 'Digital products built and maintained in the studio',
    sections: [
      { id: 'shop-header', label: 'Tools' },
      { id: 'shop-products', label: 'Products' },
    ],
  },
  intake: {
    backgroundStops: ['#13161F', '#14181f', '#0f1219'],
    accent: 'rgba(58, 125, 140, 0.08)',
    haze: { color: '58, 125, 140', opacity: 0.08, x: '50%', y: '40%' },
    marquee: 'Clear inputs lead to clearer scope',
  },
} satisfies Record<string, RouteTheme>;

export type RouteThemeKey = keyof typeof routeThemes;
