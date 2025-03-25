import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";
import { WelcomeSection } from "@/components/welcome-section";
import { FeatureSection } from "@/components/feature-section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <SiteHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-white py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
                Simplify Your Move to France
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                From visa applications to settling in, we guide you through every step of relocating to France.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button size="lg" className="text-white bg-primary hover:bg-primary/90">
                        Go to Dashboard
                      </Button>
                    </Link>
                    <Link href="/questionnaire">
                      <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        Start Questionnaire
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth">
                      <Button size="lg" className="text-white bg-primary hover:bg-primary/90">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/auth">
                      <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        Learn More
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <WelcomeSection />
        <FeatureSection />
      </main>
      
      <SiteFooter />
    </div>
  );
}
