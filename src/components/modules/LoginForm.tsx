/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useLazyUserInfoQuery,
  useLoginMutation,
} from "@/redux/features/auth/auth.api";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const [fetchUserInfo] = useLazyUserInfoQuery();

  const handleDemoLogin = async (type: "admin" | "sender" | "receiver") => {
    const credsMap: Record<
      "admin" | "sender" | "receiver",
      { email?: string; password?: string }
    > = {
      admin: {
        email: import.meta.env.VITE_DEMO_ADMIN_EMAIL,
        password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD,
      },
      sender: {
        email: import.meta.env.VITE_DEMO_SENDER_EMAIL,
        password: import.meta.env.VITE_DEMO_SENDER_PASSWORD,
      },
      receiver: {
        email: import.meta.env.VITE_DEMO_RECEIVER_EMAIL,
        password: import.meta.env.VITE_DEMO_RECEIVER_PASSWORD,
      },
    };

    const creds = credsMap[type];

    if (!creds.email || !creds.password) {
      toast.error("Demo credentials are not configured.");
      return;
    }

    // Optional: reflect in the form fields
    form.setValue("email", creds.email);
    form.setValue("password", creds.password);

    await onSubmit({ email: creds.email, password: creds.password });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await login(data).unwrap();

      // After successful login, fetch the current user information
      const userRes = await fetchUserInfo(undefined).unwrap();
      const role =
        (userRes as any)?.data?.role ||
        (userRes as any)?.data?.user?.role ||
        (userRes as any)?.user?.role ||
        (userRes as any)?.role;

      let redirectPath = "/";

      if (role === "ADMIN") {
        redirectPath = "/admin";
      } else if (role === "SENDER") {
        redirectPath = "/sender";
      } else if (role === "RECEIVER") {
        redirectPath = "/receiver";
      }

      toast.success("Welcome back! Logged in successfully.");
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      toast.error(
        err.data?.message || "Login failed. Please check your credentials.",
      );
      console.error(err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Welcome back
        </h1>
        <p className="text-balance text-sm text-slate-500 font-medium">
          Enter your professional credentials to access TrustTrack
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                          placeholder="name@company.com"
                          className="pl-10 h-11 border-slate-200 focus:border-blue-600 focus:ring-blue-600/10 rounded-xl transition-all shadow-sm group-hover:border-slate-300"
                          {...field}
                          value={field.value || ""}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-slate-700 font-semibold">
                        Password
                      </FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-11 border-slate-200 focus:border-blue-600 focus:ring-blue-600/10 rounded-xl transition-all shadow-sm group-hover:border-slate-300"
                          {...field}
                          value={field.value || ""}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Authenticating...
                </span>
              ) : (
                <>
                  Login to Account
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
            <div className="pt-2 space-y-2">
              <p className="text-xs text-slate-500 font-medium text-center">
                Or quick demo login
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  onClick={() => handleDemoLogin("admin")}
                  className="w-full text-xs"
                >
                  Demo Admin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  onClick={() => handleDemoLogin("sender")}
                  className="w-full text-xs"
                >
                  Demo Sender
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  onClick={() => handleDemoLogin("receiver")}
                  className="w-full text-xs"
                >
                  Demo Receiver
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm font-medium text-slate-500">
        New to TrustTrack?{" "}
        <Link
          to="/register"
          replace
          className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
