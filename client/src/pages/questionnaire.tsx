import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Question, AnswerOption, VisaType } from "@shared/schema";
import { useState } from "react";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle, HelpCircle } from "lucide-react";

export default function Questionnaire() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{questionId: number, answerOptionId: number}[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendedVisaId, setRecommendedVisaId] = useState<number | null>(null);
  
  // Fetch the root question if currentQuestionId is null
  const rootQuestionQuery = useQuery<Question>({
    queryKey: ["/api/questions/root"],
    enabled: currentQuestionId === null,
    onSuccess: (data) => {
      if (data) {
        setCurrentQuestionId(data.id);
      }
    },
  });
  
  // Fetch the current question
  const currentQuestionQuery = useQuery<Question>({
    queryKey: [`/api/questions/${currentQuestionId}`],
    enabled: currentQuestionId !== null,
  });
  
  // Fetch answer options for the current question
  const answerOptionsQuery = useQuery<AnswerOption[]>({
    queryKey: [`/api/questions/${currentQuestionId}/options`],
    enabled: currentQuestionId !== null,
  });
  
  // Fetch visa types for the recommendation
  const visaTypesQuery = useQuery<VisaType[]>({
    queryKey: ["/api/visa-types"],
    enabled: isCompleted,
  });
  
  // Save user response
  const saveResponseMutation = useMutation({
    mutationFn: async (data: {questionId: number, answerOptionId: number}) => {
      const res = await apiRequest("POST", "/api/responses", data);
      return await res.json();
    },
  });
  
  // Save recommendation
  const saveRecommendationMutation = useMutation({
    mutationFn: async (data: {visaTypeId: number}) => {
      const res = await apiRequest("POST", "/api/recommendations", data);
      return await res.json();
    },
  });
  
  // Handle answer selection
  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };
  
  // Handle navigation to the next question
  const handleNext = () => {
    if (!currentQuestionId || !selectedOption) return;
    
    // Save the answer
    const selectedAnswerOption = answerOptionsQuery.data?.find(option => option.id === selectedOption);
    if (!selectedAnswerOption) return;
    
    // Add answer to the list
    const newAnswer = {questionId: currentQuestionId, answerOptionId: selectedOption};
    setAnswers([...answers, newAnswer]);
    
    // Save response to the backend
    saveResponseMutation.mutate(newAnswer);
    
    // Check if there's a next question
    if (selectedAnswerOption.nextQuestionId) {
      setCurrentQuestionId(selectedAnswerOption.nextQuestionId);
      setSelectedOption(null);
    } else {
      // End of questionnaire, recommend visa
      setIsCompleted(true);
      // Simple recommendation logic - using the first visa type for MVP
      if (visaTypesQuery.data && visaTypesQuery.data.length > 0) {
        const recommendedVisa = visaTypesQuery.data[0];
        setRecommendedVisaId(recommendedVisa.id);
        saveRecommendationMutation.mutate({visaTypeId: recommendedVisa.id});
      }
    }
  };
  
  // Handle navigation to the previous question
  const handleBack = () => {
    if (answers.length === 0) return;
    
    // Remove the last answer
    const newAnswers = [...answers];
    newAnswers.pop();
    setAnswers(newAnswers);
    
    // Go back to the previous question
    if (newAnswers.length > 0) {
      setCurrentQuestionId(newAnswers[newAnswers.length - 1].questionId);
      setSelectedOption(newAnswers[newAnswers.length - 1].answerOptionId);
    } else {
      // Back to the root question
      rootQuestionQuery.refetch();
    }
  };
  
  // Handle completion of the questionnaire
  const handleFinish = () => {
    // Invalidate tasks and recommendations to refresh dashboard
    queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    queryClient.invalidateQueries({ queryKey: ["/api/recommendations"] });
    
    // Navigate to the dashboard
    setLocation("/dashboard");
  };
  
  // Loading state
  const isLoading = 
    rootQuestionQuery.isLoading || 
    currentQuestionQuery.isLoading || 
    answerOptionsQuery.isLoading ||
    (isCompleted && visaTypesQuery.isLoading);
  
  // Get recommended visa
  const getRecommendedVisa = () => {
    if (!recommendedVisaId || !visaTypesQuery.data) return null;
    return visaTypesQuery.data.find(visa => visa.id === recommendedVisaId);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <SiteHeader />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-neutral-800">Visa Questionnaire</h1>
            <p className="text-neutral-600">Answer these questions to get a personalized visa recommendation</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : isCompleted ? (
            <Card className="border-t-4 border-t-green-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <CardTitle>Questionnaire Completed</CardTitle>
                </div>
                <CardDescription>
                  Based on your answers, we have a recommendation for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-primary mb-2">Recommended Visa</h3>
                  {getRecommendedVisa() ? (
                    <>
                      <p className="text-xl font-bold text-neutral-800">{getRecommendedVisa()?.name}</p>
                      <p className="text-neutral-600 mt-1">{getRecommendedVisa()?.description}</p>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-neutral-800 mb-2">Requirements:</h4>
                        <p className="text-sm text-neutral-600">{getRecommendedVisa()?.requirements}</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-neutral-600">Loading recommendation...</p>
                  )}
                </div>
                
                <div className="bg-neutral-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <HelpCircle className="h-5 w-5 text-neutral-600" />
                    <h3 className="text-lg font-medium text-neutral-800">Next Steps</h3>
                  </div>
                  <p className="text-neutral-600">
                    We've created a personalized task list to help you prepare for your visa application.
                    Visit your dashboard to view and manage these tasks.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleFinish} 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Go to Dashboard
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{currentQuestionQuery.data?.text || 'Loading question...'}</CardTitle>
                <CardDescription>
                  {currentQuestionQuery.data?.category} • Question {answers.length + 1}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {answerOptionsQuery.data && answerOptionsQuery.data.length > 0 ? (
                  <RadioGroup 
                    value={selectedOption?.toString()} 
                    onValueChange={(value) => handleOptionSelect(parseInt(value))}
                    className="space-y-4"
                  >
                    {answerOptionsQuery.data.map((option) => (
                      <div 
                        key={option.id} 
                        className="flex items-center space-x-2 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer"
                      >
                        <RadioGroupItem 
                          value={option.id.toString()} 
                          id={`option-${option.id}`}
                          className="text-primary"
                        />
                        <Label 
                          htmlFor={`option-${option.id}`}
                          className="flex-1 cursor-pointer font-normal"
                        >
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <p className="text-neutral-600">Loading options...</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={answers.length === 0}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="bg-primary hover:bg-primary/90 flex items-center"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
