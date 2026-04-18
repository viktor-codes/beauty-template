"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { updateGtagAnalyticsConsent } from "@/lib/cookie-consent/gtag-consent";
import {
  readConsentFromDocumentCookie,
  writeConsentToDocumentCookie,
  type ParsedConsent,
} from "@/lib/cookie-consent/storage";

export interface CookieConsentContextValue {
  hasAnswered: boolean;
  analyticsEnabled: boolean;
  isDialogOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (analytics: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

function persistConsent(analytics: boolean): ParsedConsent {
  const data: ParsedConsent = { v: 1, analytics };
  writeConsentToDocumentCookie(data);
  updateGtagAnalyticsConsent(analytics);
  return data;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [preferences, setPreferences] = useState<ParsedConsent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const existing = readConsentFromDocumentCookie();
    setPreferences(existing);
    setHydrated(true);
    if (existing === null) {
      setIsDialogOpen(true);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const next = persistConsent(true);
    setPreferences(next);
    setIsDialogOpen(false);
  }, []);

  const rejectOptional = useCallback(() => {
    const next = persistConsent(false);
    setPreferences(next);
    setIsDialogOpen(false);
  }, []);

  const savePreferences = useCallback((analytics: boolean) => {
    const next = persistConsent(analytics);
    setPreferences(next);
    setIsDialogOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    if (preferences !== null) {
      setIsDialogOpen(false);
    }
  }, [preferences]);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      hasAnswered: preferences !== null,
      analyticsEnabled: preferences?.analytics ?? false,
      isDialogOpen: hydrated && isDialogOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
    }),
    [
      hydrated,
      isDialogOpen,
      preferences,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}
