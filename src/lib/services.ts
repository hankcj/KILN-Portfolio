export type ServiceTheme = 'moon' | 'planet' | 'nebula' | 'orbital';

export interface ServicePackage {
  id: string;
  code: string;
  themedName: string;
  descriptor: string;
  pricing: string;
  notes: string;
  deliverables: string[];
  bestFor: string[];
  imageSrc: string;
  imageAlt: string;
  theme: ServiceTheme;
}

export const servicePackages: ServicePackage[] = [
  {
    id: 'moonforge',
    code: 'SYS.001',
    themedName: 'Moonforge',
    descriptor: 'Website design + build',
    pricing: '$3,500 - $8,000',
    notes:
      'Websites and page systems with clear structure, durable language, and practical constraints.',
    deliverables: [
      'Site architecture and page hierarchy — what exists, what gets cut',
      'Copy refresh or full rewrite: positioning, page copy, CTAs',
      'Design direction: typography, layout, motion, and visual system',
      'Build in code or CMS workflow depending on scope',
      'Analytics foundation: events, UTMs, conversion points',
    ],
    bestFor: [
      'Portfolios that need to convert, not just display',
      'Small brands that need a site that functions as a funnel',
      '"We have a website" situations where it generates zero momentum',
    ],
    imageSrc: '/assets/Saturn.png',
    imageAlt: 'Saturn ring surface used as package visual',
    theme: 'planet',
  },
  {
    id: 'apogee-script',
    code: 'SYS.002',
    themedName: 'Apogee Script',
    descriptor: 'Copywriting + messaging',
    pricing: '$750 - $3,000',
    notes:
      'Positioning and page copy that makes the offer legible without flattening voice.',
    deliverables: [
      'Positioning pass: what you do, who it serves, why you win',
      'Homepage, services, and landing page copy',
      'Offer pages for digital products',
      'Email sequences: welcome, launch, follow-up arcs',
      'Ad copy and hooks that match brand voice',
    ],
    bestFor: [
      '"People don\'t understand what I do"',
      '"I get traffic but nothing converts"',
      '"My work is strong but my words are vague"',
    ],
    imageSrc: '/assets/Moon 3.png',
    imageAlt: 'Lunar texture detail used as package visual',
    theme: 'moon',
  },
  {
    id: 'orbit-lift',
    code: 'SYS.003',
    themedName: 'Orbit Lift',
    descriptor: 'Meta ads (FB + IG)',
    pricing: '$1,500 setup + $1,000/mo',
    notes:
      'Campaign architecture, creative iteration, and ongoing optimization. Not autopilot.',
    deliverables: [
      'Account and campaign audit — what performs, what misleads',
      'Funnel mapping: ad to landing to conversion event',
      'Campaign rebuild: structure, audiences, testing plan',
      'Creative testing system: angles, formats, variations',
      'Weekly iteration and reporting in plain language',
    ],
    bestFor: [
      'Businesses running ads without a measurement plan',
      'Funnels where tracking is messy or pixel coverage is incomplete',
      'Teams that want iteration, not set-and-forget',
    ],
    imageSrc: '/assets/Nebula.png',
    imageAlt: 'Nebula field used as package visual',
    theme: 'nebula',
  },
  {
    id: 'lunar-axis',
    code: 'SYS.004',
    themedName: 'Lunar Axis',
    descriptor: 'Creative direction',
    pricing: '$1,500 - $4,000',
    notes:
      'Visual and content direction that stays coherent when you ship weekly, not once a year.',
    deliverables: [
      'Visual direction: references, rules, do-not-cross lines',
      'Content system: pillars, formats, repeatable templates',
      'Creative guidance for shoots, edits, layouts, and motion',
      'Brand kit: type, spacing, components, usage rules',
      '"Make it feel like this" translated into a reusable system',
    ],
    bestFor: [
      'Founders who can build but can\'t keep the look consistent',
      'Brands that are almost distinct but not quite memorable',
      'Teams shipping frequently without a shared visual language',
    ],
    imageSrc: '/assets/Jupiter Moon.png',
    imageAlt: 'Jupiter moon texture used as package visual',
    theme: 'orbital',
  },
];
