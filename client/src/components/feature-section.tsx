import { Link } from "wouter";

export function FeatureSection() {
  return (
    <div className="bg-neutral-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-neutral-800">How It Works</h2>
          <p className="text-lg text-neutral-600 mt-2">Your step-by-step guide to relocating to France</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                <span className="text-lg font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Create Your Account</h3>
            </div>
            <p className="text-neutral-600">Sign up to access all features and save your progress throughout the visa application process.</p>
            <div className="mt-4 h-48 bg-neutral-100 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                <span className="text-lg font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Complete the Questionnaire</h3>
            </div>
            <p className="text-neutral-600">Answer questions about your situation, goals, and plans to receive personalized recommendations.</p>
            <div className="mt-4 h-48 bg-neutral-100 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                <span className="text-lg font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Get Visa Recommendations</h3>
            </div>
            <p className="text-neutral-600">Receive tailored advice on the best visa options based on your responses to the questionnaire.</p>
            <div className="mt-4 h-48 bg-neutral-100 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                <span className="text-lg font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Follow Your Task Checklist</h3>
            </div>
            <p className="text-neutral-600">Manage all required tasks for your visa application with our organized checklist system.</p>
            <div className="mt-4 h-48 bg-neutral-100 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/auth">
            <a className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
              Start Your Journey Today
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
