import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-auto text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <Link href="/">
                <a className="ml-3 text-xl font-bold text-primary">Vivre en France</a>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <a className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About</a>
            </Link>
            <Link href="/questionnaire">
              <a className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Questionnaire</a>
            </Link>
            <Link href="/">
              <a className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </Link>
          </div>
          
          <div className="hidden md:flex">
            {user ? (
              <>
                <Link href="/dashboard">
                  <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Dashboard
                  </a>
                </Link>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="ml-4"
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Sign In
                  </a>
                </Link>
                <Link href="/auth">
                  <a className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Register
                  </a>
                </Link>
              </>
            )}
          </div>
          
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-neutral-500 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50">
                About
              </a>
            </Link>
            <Link href="/questionnaire">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50">
                Questionnaire
              </a>
            </Link>
            <Link href="/">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50">
                Contact
              </a>
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-neutral-200">
            <div className="flex items-center px-5">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <a className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Dashboard
                    </a>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="ml-4 w-full"
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <a className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Sign In
                    </a>
                  </Link>
                  <Link href="/auth">
                    <a className="ml-4 block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Register
                    </a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
