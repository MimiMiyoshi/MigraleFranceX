import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, ClipboardList, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Task, Recommendation } from "@shared/schema";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  
  // Fetch user's tasks
  const { data: tasks, isLoading: isLoadingTasks } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });
  
  // Fetch user's recommendations
  const { data: recommendations, isLoading: isLoadingRecommendations } = useQuery<Recommendation[]>({
    queryKey: ["/api/recommendations"],
  });
  
  // Fetch visa types for recommendations
  const { data: visaTypes } = useQuery({
    queryKey: ["/api/visa-types"],
  });
  
  const getCompletedTasksPercentage = () => {
    if (!tasks || tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };
  
  const getVisaTypeById = (id: number) => {
    return visaTypes?.find(visaType => visaType.id === id);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <SiteHeader />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">マイページ</h1>
            <p className="text-neutral-600">おかえりなさい、{user?.fullName || 'ユーザー'}さん</p>
          </div>
          
          <Link href="/questionnaire">
            <Button className="bg-primary hover:bg-primary/90">
              新しい質問シートを始める
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">タスクの進捗状況</CardTitle>
              <CardDescription>ビザ申請タスク</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingTasks ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : tasks && tasks.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600">
                      {tasks.filter(task => task.isCompleted).length} / {tasks.length} 完了
                    </span>
                    <span className="text-sm font-medium">{getCompletedTasksPercentage()}%</span>
                  </div>
                  <Progress value={getCompletedTasksPercentage()} className="h-2" />
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-neutral-600">タスクはまだありません</p>
                  <p className="text-sm text-neutral-500">質問シートに回答して始めましょう</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">推奨ビザ</CardTitle>
              <CardDescription>質問シートに基づく</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingRecommendations ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : recommendations && recommendations.length > 0 && visaTypes ? (
                <div>
                  <p className="font-medium text-neutral-800">
                    {getVisaTypeById(recommendations[0].visaTypeId)?.name || 'まだありません'}
                  </p>
                  <p className="text-sm text-neutral-600 mt-1">
                    {getVisaTypeById(recommendations[0].visaTypeId)?.description || ''}
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-neutral-600">推奨はまだありません</p>
                  <p className="text-sm text-neutral-500">質問シートに回答して推奨を取得しましょう</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">次のステップ</CardTitle>
              <CardDescription>今後のタスク</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingTasks ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : tasks && tasks.filter(task => !task.isCompleted).length > 0 ? (
                <div>
                  <div className="flex items-center text-neutral-800 mb-2">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">
                      {tasks.filter(task => !task.isCompleted)[0].title}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">
                    {tasks.filter(task => !task.isCompleted)[0].description}
                  </p>
                  <Link href="/tasks">
                    <Button variant="outline" size="sm" className="w-full">
                      すべてのタスクを表示
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-neutral-600">すべてのタスクが完了しました！</p>
                  <p className="text-sm text-neutral-500">素晴らしい！フランスへの道が開けています</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="tasks">タスク</TabsTrigger>
            <TabsTrigger value="documents">必要書類</TabsTrigger>
            <TabsTrigger value="timeline">タイムライン</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClipboardList className="h-5 w-5 mr-2 text-primary" />
                    未完了
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingTasks ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : tasks && tasks.filter(task => !task.isCompleted).length > 0 ? (
                    <div className="space-y-4">
                      {tasks
                        .filter(task => !task.isCompleted)
                        .slice(0, 3)
                        .map(task => (
                          <div key={task.id} className="flex items-start p-3 bg-neutral-50 rounded-md">
                            <div className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0 border border-primary rounded-full"></div>
                            <div>
                              <h4 className="font-medium text-neutral-800">{task.title}</h4>
                              <p className="text-sm text-neutral-600">{task.description}</p>
                              {task.dueDate && (
                                <p className="text-xs text-neutral-500 mt-1">
                                  期限: {new Date(task.dueDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      {tasks.filter(task => !task.isCompleted).length > 3 && (
                        <Link href="/tasks">
                          <Button variant="ghost" className="w-full flex items-center justify-center mt-2">
                            すべて表示 <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-neutral-600">未完了のタスクはありません</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    完了済み
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingTasks ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : tasks && tasks.filter(task => task.isCompleted).length > 0 ? (
                    <div className="space-y-4">
                      {tasks
                        .filter(task => task.isCompleted)
                        .slice(0, 3)
                        .map(task => (
                          <div key={task.id} className="flex items-start p-3 bg-neutral-50 rounded-md">
                            <div className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0 bg-green-500 text-white rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium text-neutral-800 line-through">{task.title}</h4>
                              <p className="text-sm text-neutral-500">{task.description}</p>
                              {task.dueDate && (
                                <p className="text-xs text-neutral-500 mt-1">
                                  完了日: {new Date(task.updatedAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      {tasks.filter(task => task.isCompleted).length > 3 && (
                        <Link href="/tasks">
                          <Button variant="ghost" className="w-full flex items-center justify-center mt-2">
                            すべて表示 <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-neutral-600">完了したタスクはありません</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>必要書類</CardTitle>
                <CardDescription>
                  ビザ申請に必要な書類
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-neutral-600">書類セクションは近日公開予定です</p>
                  <p className="text-sm text-neutral-500 mt-2">
                    書類管理機能の追加に取り組んでいます
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>申請タイムライン</CardTitle>
                <CardDescription>
                  ビザ申請プロセスの追跡
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-neutral-600">タイムラインセクションは近日公開予定です</p>
                  <p className="text-sm text-neutral-500 mt-2">
                    タイムライン可視化機能の追加に取り組んでいます
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <SiteFooter />
    </div>
  );
}
