import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function WelcomeSection() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-800">Your Journey to France Starts Here</h2>
          </div>
          
          <div className="prose max-w-none text-neutral-700">
            <p>Our application guides you through the entire process of moving to France - from selecting the right visa to managing all required tasks for your relocation.</p>
            <p>Simply create an account, answer a few questions about your planned stay, and we'll provide personalized guidance every step of the way.</p>
          </div>
          
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 p-5 rounded-lg">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-800 mb-2">Smart Questionnaire</h3>
              <p className="text-neutral-600">Answer questions about your stay to get personalized visa recommendations.</p>
            </div>
            
            <div className="bg-neutral-50 p-5 rounded-lg">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-800 mb-2">Task Management</h3>
              <p className="text-neutral-600">Get a customized checklist of tasks for your visa application process.</p>
            </div>
            
            <div className="bg-neutral-50 p-5 rounded-lg">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-800 mb-2">Expert Information</h3>
              <p className="text-neutral-600">Get reliable information about living, studying, and working in France.</p>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/auth">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Get Started
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn more
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="relative bg-primary text-white py-8 px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-white text-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Sophie Martin</h3>
                <p className="text-sm opacity-80">Student Visa, Moved in 2023</p>
              </div>
            </div>
            <blockquote>
              <p className="text-lg">"This app made my move to France so much easier! The visa questionnaire saved me hours of research, and the task checklist kept me organized throughout the entire application process."</p>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
