import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { loginUserSchema } from "@shared/schema";

// Define form schema using zod
const formSchema = loginUserSchema.extend({
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm({ onShowReset }: { onShowReset: () => void }) {
  const { loginMutation } = useAuth();
  
  // Initialize form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });
  
  // Handle form submission
  const onSubmit = (data: FormData) => {
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-neutral-800 mb-2">おかえりなさい</h2>
        <p className="text-neutral-600">ユーザー名とパスワードを入力してアカウントにアクセスしてください。</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700">ユーザー名</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ユーザー名" 
                    {...field} 
                    className="px-3 py-2 border border-neutral-300 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-1">
                  <FormLabel className="text-neutral-700">パスワード</FormLabel>
                  <Button 
                    type="button" 
                    variant="link" 
                    onClick={onShowReset}
                    className="text-sm p-0 h-auto text-primary hover:text-primary/90"
                  >
                    パスワードをお忘れですか？
                  </Button>
                </div>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                    className="px-3 py-2 border border-neutral-300 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                    id="remember-me"
                    className="text-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </FormControl>
                <FormLabel htmlFor="remember-me" className="text-sm text-neutral-700 cursor-pointer">
                  ログイン状態を保持する
                </FormLabel>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full py-2 bg-primary hover:bg-primary/90 text-white"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ログイン中...
              </>
            ) : (
              "ログイン"
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">または</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"/>
            </svg>
            Google
          </Button>
          
          <Button variant="outline" className="w-full">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
            </svg>
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
