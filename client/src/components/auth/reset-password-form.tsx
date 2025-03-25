import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// Define form schema using zod
const formSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
});

type FormData = z.infer<typeof formSchema>;

export function ResetPasswordForm({ onBackToLogin }: { onBackToLogin: () => void }) {
  const { resetPasswordMutation } = useAuth();
  
  // Initialize form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  
  // Handle form submission
  const onSubmit = (data: FormData) => {
    resetPasswordMutation.mutate(data);
    // Clear form after submission
    form.reset();
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-neutral-800 mb-2">パスワードのリセット</h2>
        <p className="text-neutral-600">メールアドレスを入力してパスワードリセットの手順を受け取ってください</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          
          <Button 
            type="submit" 
            className="w-full py-2 bg-primary hover:bg-primary/90 text-white"
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                送信中...
              </>
            ) : (
              "リセットリンクを送信"
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <Button 
          onClick={onBackToLogin} 
          variant="link" 
          className="text-sm text-primary hover:text-primary/90"
        >
          ログイン画面に戻る
        </Button>
      </div>
    </div>
  );
}
