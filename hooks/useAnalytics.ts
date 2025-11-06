// @ts-nochec
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnalyticsBrowser } from "@segment/analytics-next";

declare global {
  interface Window {
    FS: any;
  }
}

interface AnalyticsOptions {
  segmentWriteKey: string;
  amplitudeApiKey: string;
  fullstoryOrgId: string;
}

export enum ANALYTICS_EVENTS {
  // Adopt custom features
  CustomFeatureOne = "Custom feature 1",

  // Core Features events
  ContentView = "Content View",
  ScrollDepth = "Scroll Depth",
  AIChatInitiated = "AI Chat Initiated",
  UserSatisfactionRating = "User Satisfaction Rating",
  CartAbandoned = "Cart Abandoned",

  // General events
  PageView = "Page View",
  SignUp = "Sign Up",
  Login = "Login",
  Logout = "Logout",
  PurchaseStarted = "Purchase Started",
  PurchaseCompleted = "Purchase Completed",
}

let analytics: AnalyticsBrowser;

const initAnalytics = async (options: AnalyticsOptions) => {
  const { segmentWriteKey, amplitudeApiKey, fullstoryOrgId } = options;

  // Initialize Segment
  analytics = AnalyticsBrowser.load({ writeKey: segmentWriteKey });

  // Initialize Amplitude (via Segment)
  await analytics.register({
    // @ts-ignore
    Amplitude: {
      apiKey: amplitudeApiKey,
    },
  });
};

const useAnalytics = () => {
  const router = useRouter();
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    const options: AnalyticsOptions = {
      segmentWriteKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY!,
      amplitudeApiKey: process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!,
      fullstoryOrgId: process.env.NEXT_PUBLIC_FULLSTORY_KEY!,
    };

    initAnalytics(options);

    const handleRouteChange = (url: string) => {
      analytics.page({
        path: url,
        url: window.location.href,
        referrer: document.referrer,
      });
    };

    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollDepth(scrolled);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    window.addEventListener("scroll", handleScroll);

    handleRouteChange(router.asPath);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.events]);

  useEffect(() => {
    if (scrollDepth > 0) {
      trackEvent("Scroll Depth", { depth: Math.round(scrollDepth) });
    }
  }, [scrollDepth]);

  const trackEvent = (eventName: string, properties?: object) => {
    analytics.track(eventName, properties);
  };

  const identify = (userId: string, traits?: object) => {
    analytics.identify(userId, traits);
  };

  const trackFeatureAdoption = (featureName: string) => {
    trackEvent("Feature Adoption", { feature: featureName });
  };

  const trackAIConversation = (message: string) => {
    trackEvent("AI Conversation Initiated"), { message };
  };

  const trackUserSatisfaction = (rating: number) => {
    trackEvent("User Satisfaction Rating", { rating });
  };

  const trackGoalCompletion = (goalName: string) => {
    trackEvent("Goal Completed", { goal: goalName });
  };

  return {
    trackEvent,
    identify,
    trackFeatureAdoption,
    trackAIConversation,
    trackUserSatisfaction,
    trackGoalCompletion,
  };
};

export default useAnalytics;
