/**
 * Transition State Persistence
 * 
 * Since we're using full page navigation (not SPA), the Zustand store
 * resets on every page load. We use sessionStorage to persist the 
 * transition state across navigation.
 */

const TRANSITION_KEY = 'kiln_transition';
const TRANSITION_DURATION = 2500; // Time to show loading screen before navigation

interface TransitionState {
  isTransitioning: boolean;
  target: string;
  timestamp: number;
}

/**
 * Mark that a transition is starting
 */
export function startPageTransition(target: string): void {
  if (typeof window === 'undefined') return;
  
  const state: TransitionState = {
    isTransitioning: true,
    target,
    timestamp: Date.now(),
  };
  
  sessionStorage.setItem(TRANSITION_KEY, JSON.stringify(state));
}

/**
 * Check if we're in a transition on page load
 */
export function getInitialTransitionState(): { 
  isTransitioning: boolean; 
  target: string | null;
  remainingTime: number;
} {
  if (typeof window === 'undefined') {
    return { isTransitioning: false, target: null, remainingTime: 0 };
  }
  
  const stored = sessionStorage.getItem(TRANSITION_KEY);
  if (!stored) {
    return { isTransitioning: false, target: null, remainingTime: 0 };
  }
  
  try {
    const state: TransitionState = JSON.parse(stored);
    const elapsed = Date.now() - state.timestamp;
    const remaining = Math.max(0, TRANSITION_DURATION - elapsed);
    
    // Clear the transition state immediately so it doesn't persist on refresh
    sessionStorage.removeItem(TRANSITION_KEY);
    
    // If elapsed time is within transition window, we're still transitioning
    if (elapsed < TRANSITION_DURATION + 500) { // 500ms buffer
      return {
        isTransitioning: true,
        target: state.target,
        remainingTime: remaining,
      };
    }
  } catch {
    // Invalid state, clear it
    sessionStorage.removeItem(TRANSITION_KEY);
  }
  
  return { isTransitioning: false, target: null, remainingTime: 0 };
}

/**
 * Clear any lingering transition state
 */
export function clearTransitionState(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(TRANSITION_KEY);
}

export { TRANSITION_DURATION };
