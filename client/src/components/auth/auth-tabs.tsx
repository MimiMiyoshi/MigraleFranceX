import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { ResetPasswordForm } from "./reset-password-form";

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "reset">("login");
  
  const showLoginTab = () => setActiveTab("login");
  const showRegisterTab = () => setActiveTab("register");
  const showResetTab = () => setActiveTab("reset");
  
  return (
    <div className="max-w-md mx-auto my-12 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex border-b border-neutral-200">
        <button 
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "login" 
              ? "text-primary border-b-2 border-primary" 
              : "text-neutral-600 hover:text-primary/80"
          }`}
          onClick={showLoginTab}
        >
          ログイン
        </button>
        <button 
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "register" 
              ? "text-primary border-b-2 border-primary" 
              : "text-neutral-600 hover:text-primary/80"
          }`}
          onClick={showRegisterTab}
        >
          新規登録
        </button>
      </div>
      
      {activeTab === "login" && <LoginForm onShowReset={showResetTab} />}
      {activeTab === "register" && <RegisterForm />}
      {activeTab === "reset" && <ResetPasswordForm onBackToLogin={showLoginTab} />}
    </div>
  );
}
