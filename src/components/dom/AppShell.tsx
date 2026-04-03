"use client";

import Navigation from "@/components/dom/Navigation";
import GrainOverlay from "@/components/dom/GrainOverlay";
import { LenisProvider } from "@/components/dom/LenisProvider";
import CustomCursor from "@/components/dom/CustomCursor";
import { SoundProvider } from "@/components/dom/SoundProvider";
import RouteTransition from "@/components/dom/RouteTransition";
import CardGlowEffect from "@/components/dom/CardGlowEffect";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <LenisProvider>
        <CustomCursor />
        <CardGlowEffect />
        <Navigation />
        <GrainOverlay />
        <RouteTransition>{children}</RouteTransition>
      </LenisProvider>
    </SoundProvider>
  );
}
