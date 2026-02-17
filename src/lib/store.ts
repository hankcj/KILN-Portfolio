/**
 * Zustand Store
 * 
 * Acts as the "nervous system" linking DOM UI to WebGL scene state.
 * Handles page transitions and navigation state.
 */

import { create } from 'zustand';

interface AppState {
  // Navigation / routing state
  currentPage: string;
  
  // Transition state
  isTransitioning: boolean;
  transitionTarget: string | null;
  startTransition: (target: string) => void;
  endTransition: () => void;

  // Interaction state for DOM → WebGL communication
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;

  focusedItem: string | null;
  setFocusedItem: (item: string | null) => void;

  // Performance / quality settings
  webglQuality: 'high' | 'medium' | 'low';
  setWebglQuality: (quality: 'high' | 'medium' | 'low') => void;

  // Reduced motion preference
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;

  // Film grain intensity (0-1)
  grainIntensity: number;
  setGrainIntensity: (intensity: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Route state
  currentPage: 'home',
  
  // Transition state
  isTransitioning: false,
  transitionTarget: null,
  startTransition: (target) => set({ 
    isTransitioning: true, 
    transitionTarget: target 
  }),
  endTransition: () => set({ 
    isTransitioning: false, 
    transitionTarget: null 
  }),

  // Interaction state
  hoveredItem: null,
  setHoveredItem: (item) => set({ hoveredItem: item }),

  focusedItem: null,
  setFocusedItem: (item) => set({ focusedItem: item }),

  // Quality settings
  webglQuality: 'high',
  setWebglQuality: (quality) => set({ webglQuality: quality }),

  // Accessibility
  reducedMotion: false,
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),

  // Visual effects
  grainIntensity: 0.03,
  setGrainIntensity: (intensity) => set({ grainIntensity: intensity }),
}));
