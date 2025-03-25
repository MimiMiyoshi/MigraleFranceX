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
          {/* Logo and site name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <svg 
                className="h-7 w-7 text-primary" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 2L20 7V17L12 22L4 17V7L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2.5 text-lg font-bold text-primary">フランス生活ナビ</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <span className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                サービス紹介
              </span>
            </Link>
            <Link href="/questionnaire">
              <span className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                質問シート
              </span>
            </Link>
            <Link href="/">
              <span className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                お問い合わせ
              </span>
            </Link>
          </nav>
          
          {/* Desktop authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-primary">
                    マイページ
                  </Button>
                </Link>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? "ログアウト中..." : "ログアウト"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" className="text-primary">
                    ログイン
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-primary hover:bg-primary/90">
                    新規登録
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-neutral-500 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary p-1 rounded-md"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
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
        <div className="md:hidden bg-white border-b border-neutral-200 shadow-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <span className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50">
                サービス紹介
              </span>
            </Link>
            <Link href="/questionnaire" onClick={() => setMobileMenuOpen(false)}>
              <span className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50">
                質問シート
              </span>
            </Link>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <span className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50">
                お問い合わせ
              </span>
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-neutral-200">
            <div className="flex flex-col px-5 space-y-3">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-primary"
                    >
                      マイページ
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline" 
                    className="w-full justify-start"
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? "ログアウト中..." : "ログアウト"}
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button 
                      variant="ghost" 
                      className="w-full justify-center text-primary"
                    >
                      ログイン
                    </Button>
                  </Link>
                  <Link 
                    href="/auth" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button 
                      className="w-full justify-center bg-primary hover:bg-primary/90"
                    >
                      新規登録
                    </Button>
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
