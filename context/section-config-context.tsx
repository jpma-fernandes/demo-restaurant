"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { SectionState, SectionConfigState } from "@/types";
import { sectionRegistry } from "@/config/sections";
import { siteConfig } from "@/config/site";

// Get default section states from registry
const getDefaultSections = (): SectionState[] => {
  return sectionRegistry.map((section) => ({
    id: section.id,
    enabled: section.defaultEnabled,
    order: section.defaultOrder,
  }));
};

// Create context with undefined default
const SectionConfigContext = createContext<SectionConfigState | undefined>(
  undefined
);

interface SectionConfigProviderProps {
  children: ReactNode;
}

export function SectionConfigProvider({
  children,
}: SectionConfigProviderProps) {
  const [sections, setSections] = useState<SectionState[]>(getDefaultSections);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(siteConfig.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as SectionState[];
        // Validate and merge with registry (in case new sections were added)
        const mergedSections = sectionRegistry.map((regSection) => {
          const storedSection = parsed.find((s) => s.id === regSection.id);
          if (storedSection) {
            return storedSection;
          }
          // New section not in storage, use defaults
          return {
            id: regSection.id,
            enabled: regSection.defaultEnabled,
            order: regSection.defaultOrder,
          };
        });
        // Sort by order
        mergedSections.sort((a, b) => a.order - b.order);
        setSections(mergedSections);
      }
    } catch (error) {
      console.error("Failed to load section config from localStorage:", error);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when sections change (after hydration)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(siteConfig.storageKey, JSON.stringify(sections));
      } catch (error) {
        console.error("Failed to save section config to localStorage:", error);
      }
    }
  }, [sections, isHydrated]);

  // Toggle section enabled state
  const toggleSection = useCallback((id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  }, []);

  // Reorder sections (for drag and drop)
  const reorderSections = useCallback((activeId: string, overId: string) => {
    setSections((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === activeId);
      const newIndex = prev.findIndex((s) => s.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prev;

      const newSections = [...prev];
      const [removed] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, removed);

      // Update order values
      return newSections.map((section, index) => ({
        ...section,
        order: index,
      }));
    });
  }, []);

  // Reset to default configuration
  const resetToDefaults = useCallback(() => {
    setSections(getDefaultSections());
  }, []);

  // Get only enabled sections, sorted by order
  const getEnabledSections = useCallback(() => {
    return sections
      .filter((section) => section.enabled)
      .sort((a, b) => a.order - b.order);
  }, [sections]);

  const value: SectionConfigState = {
    sections,
    toggleSection,
    reorderSections,
    resetToDefaults,
    getEnabledSections,
  };

  return (
    <SectionConfigContext.Provider value={value}>
      {children}
    </SectionConfigContext.Provider>
  );
}

// Hook to use section config context
export function useSectionConfig(): SectionConfigState {
  const context = useContext(SectionConfigContext);
  if (context === undefined) {
    throw new Error(
      "useSectionConfig must be used within a SectionConfigProvider"
    );
  }
  return context;
}
