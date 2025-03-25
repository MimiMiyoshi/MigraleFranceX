import { AuthTabs } from "@/components/auth/auth-tabs";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";
import { WelcomeSection } from "@/components/welcome-section";
import { FeatureSection } from "@/components/feature-section";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      setLocation("/dashboard");
    }
  }, [user, isLoading, setLocation]);
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <SiteHeader />
      
      <main className="flex-grow">
        <AuthTabs />
        <WelcomeSection />
        <FeatureSection />
      </main>
      
      <SiteFooter />
    </div>
  );
}
