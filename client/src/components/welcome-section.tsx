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
            <h2 className="text-2xl font-bold text-neutral-800">フランスへの旅はここから始まります</h2>
          </div>
          
          <div className="prose max-w-none text-neutral-700">
            <p>当サービスは、適切なビザの選択から移住に必要なすべての手続きまで、フランス移住の全プロセスをガイドします。</p>
            <p>アカウントを作成し、滞在予定に関するいくつかの質問に答えるだけで、一人ひとりに合ったガイダンスを提供します。</p>
          </div>
          
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 p-5 rounded-lg">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-800 mb-2">スマート質問シート</h3>
              <p className="text-neutral-600">滞在に関する質問に答えて、パーソナライズされたビザの推奨を受け取りましょう。</p>
            </div>
            
            <div className="bg-neutral-50 p-5 rounded-lg">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-800 mb-2">タスク管理</h3>
              <p className="text-neutral-600">ビザ申請プロセスのためのカスタマイズされたタスクリストを取得します。</p>
            </div>
            
            <div className="bg-neutral-50 p-5 rounded-lg">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-800 mb-2">専門情報</h3>
              <p className="text-neutral-600">フランスでの生活、勉強、仕事に関する信頼できる情報を入手できます。</p>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/auth">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                今すぐ始める
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                詳しく見る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
