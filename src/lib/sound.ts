/**
 * Sound Effects System
 * 
 * Optional terminal typing sounds for the system aesthetic.
 * Respects user preference and accessibility settings.
 */

// Audio context for generating sounds
let audioContext: AudioContext | null = null;

// User preference
let soundEnabled = false;

/**
 * Initialize audio context on first user interaction
 */
export function initAudio(): void {
  if (typeof window === 'undefined') return;
  if (audioContext) return;
  
  // Check for reduced motion preference (often paired with sound sensitivity)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  try {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  } catch (e) {
    console.warn('Audio context not supported');
  }
}

/**
 * Toggle sound on/off
 */
export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  
  // Initialize audio on first enable
  if (soundEnabled && !audioContext) {
    initAudio();
  }
  
  // Save preference
  if (typeof window !== 'undefined') {
    localStorage.setItem('kiln_sound_enabled', soundEnabled.toString());
  }
  
  return soundEnabled;
}

/**
 * Check if sound is enabled
 */
export function isSoundEnabled(): boolean {
  return soundEnabled;
}

/**
 * Load sound preference from localStorage
 */
export function loadSoundPreference(): boolean {
  if (typeof window === 'undefined') return false;
  
  const stored = localStorage.getItem('kiln_sound_enabled');
  soundEnabled = stored === 'true';
  
  if (soundEnabled) {
    initAudio();
  }
  
  return soundEnabled;
}

/**
 * Generate a subtle typing sound
 */
function playTypingSound(): void {
  if (!soundEnabled || !audioContext) return;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  // Resume context if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  // Very short, subtle click sound
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Randomize slightly for realism
  const frequency = 800 + Math.random() * 200;
  oscillator.frequency.value = frequency;
  
  // Short duration - just a click
  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.03, now + 0.005);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  
  oscillator.start(now);
  oscillator.stop(now + 0.05);
}

/**
 * Play keystroke sound
 */
export function playKeystroke(): void {
  // Debounce slightly to avoid overwhelming sounds during rapid typing
  if (Math.random() > 0.7) {
    playTypingSound();
  }
}

/**
 * Play navigation open sound
 */
export function playNavOpen(): void {
  if (!soundEnabled || !audioContext) return;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  const now = audioContext.currentTime;
  
  // Subtle ascending tone
  oscillator.frequency.setValueAtTime(400, now);
  oscillator.frequency.linearRampToValueAtTime(600, now + 0.1);
  
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.05, now + 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  
  oscillator.start(now);
  oscillator.stop(now + 0.2);
}

/**
 * Play selection sound
 */
export function playSelect(): void {
  if (!soundEnabled || !audioContext) return;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  const now = audioContext.currentTime;
  
  // Short confirmation beep
  oscillator.frequency.value = 800;
  
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.04, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  
  oscillator.start(now);
  oscillator.stop(now + 0.1);
}

/**
 * Play hover sound (very subtle)
 */
export function playHover(): void {
  // Only play occasionally to avoid annoyance
  if (Math.random() > 0.3) return;
  
  if (!soundEnabled || !audioContext) return;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  const now = audioContext.currentTime;
  
  // Very subtle, low volume
  oscillator.frequency.value = 200;
  
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.02, now + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  
  oscillator.start(now);
  oscillator.stop(now + 0.08);
}
