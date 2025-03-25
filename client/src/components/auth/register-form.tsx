import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema } from "@shared/schema";

// Define form schema using zod
const formSchema = z.object({
  fullName: z.string().min(2, "お名前は2文字以上で入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  username: z.string().min(3, "ユーザー名は3文字以上で入力してください"),
  password: z.string()
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(/[0-9]/, "パスワードには少なくとも1つの数字を含める必要があります")
    .regex(/[^a-zA-Z0-9]/, "パスワードには少なくとも1つの特殊文字を含める必要があります"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "利用規約に同意する必要があります",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

export function RegisterForm() {
  const { registerMutation } = useAuth();
  
  // Initialize form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  
  // Handle form submission
  const onSubmit = (data: FormData) => {
    registerMutation.mutate(data);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-neutral-800 mb-2">アカウント作成</h2>
        <p className="text-neutral-600">登録してフランス移住の旅を始めましょう</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700">お名前</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="山田 太郎" 
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700">メールアドレス</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="example@mail.com" 
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700">ユーザー名</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="yamada_taro" 
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
                <FormLabel className="text-neutral-700">パスワード</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                    className="px-3 py-2 border border-neutral-300 rounded-md"
                  />
                </FormControl>
                <p className="mt-1 text-xs text-neutral-500">8文字以上で、少なくとも1つの数字と1つの特殊文字を含める必要があります</p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700">パスワード（確認）</FormLabel>
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
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                    id="terms"
                    className="mt-1 text-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </FormControl>
                <div className="space-y-1">
                  <FormLabel htmlFor="terms" className="text-sm text-neutral-700 cursor-pointer">
                    <a href="#" className="text-primary hover:text-primary/90">利用規約</a>と<a href="#" className="text-primary hover:text-primary/90">プライバシーポリシー</a>に同意します
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full py-2 bg-primary hover:bg-primary/90 text-white"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                アカウント作成中...
              </>
            ) : (
              "アカウント作成"
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
