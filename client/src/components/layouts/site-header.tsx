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
                <span className="ml-3 text-xl font-bold text-primary">フランス生活ナビ</span>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <span className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">サービス紹介</span>
            </Link>
            <Link href="/questionnaire">
              <span className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">質問シート</span>
            </Link>
            <Link href="/">
              <span className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">お問い合わせ</span>
            </Link>
          </div>
          
          <div className="hidden md:flex">
            {user ? (
              <>
                <Link href="/dashboard">
                  <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    マイページ
                  </span>
                </Link>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="ml-4"
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? "ログアウト中..." : "ログアウト"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    ログイン
                  </span>
                </Link>
                <Link href="/auth">
                  <span className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    新規登録
                  </span>
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
              <span className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50">
                サービス紹介
              </span>
            </Link>
            <Link href="/questionnaire">
              <span className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50">
                質問シート
              </span>
            </Link>
            <Link href="/">
              <span className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50">
                お問い合わせ
              </span>
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-neutral-200">
            <div className="flex items-center px-5">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <span className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      マイページ
                    </span>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="ml-4 w-full"
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? "ログアウト中..." : "ログアウト"}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <span className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      ログイン
                    </span>
                  </Link>
                  <Link href="/auth">
                    <span className="ml-4 block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      新規登録
                    </span>
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
