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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { User, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 characters" }),
    role: z.enum(["SENDER", "RECEIVER"], {
      message: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords didn't match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      await register(userInfo).unwrap();
      toast.success("Account created! Welcome to TrustTrack.");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      const errorMsg =
        error?.data?.errorSources?.[0]?.message ||
        error?.data?.message ||
        "Registration failed!";
      toast.error(errorMsg);
    }
  };

  return (
    <div
      className={cn("flex flex-col  gap-8 w-full overflow-x-hidden", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Create Account
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Join the TrustTrack network and streamline your deliveries today
        </p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                          placeholder="John Doe"
                          className="pl-10 h-11 border-slate-200 focus:border-blue-600 focus:ring-blue-600/10 rounded-xl transition-all shadow-sm group-hover:border-slate-300"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                          placeholder="john.doe@example.com"
                          type="email"
                          className="pl-10 h-11 border-slate-200 focus:border-blue-600 focus:ring-blue-600/10 rounded-xl transition-all shadow-sm group-hover:border-slate-300"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Password
                      </FormLabel>
                      <FormControl className="h-11">
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">
                        Confirm Password
                      </FormLabel>
                      <FormControl className="h-11">
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Account Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 border-slate-200 focus:ring-blue-600/10 rounded-xl group-hover:border-slate-300">
                          <SelectValue placeholder="How will you use TrustTrack?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                        <SelectItem value="SENDER" className="py-3">
                          <span className="font-semibold text-slate-700">
                            Send Parcels
                          </span>
                          <p className="text-xs text-slate-500">
                            I want to ship items
                          </p>
                        </SelectItem>
                        <SelectItem value="RECEIVER" className="py-3">
                          <span className="font-semibold text-slate-700">
                            Receive Parcels
                          </span>
                          <p className="text-xs text-slate-500">
                            I want to track deliveries
                          </p>
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                  Creating Account...
                </span>
              ) : (
                <>
                  Register for Account
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100" />
          </div>
        </div>
      </div>
      <div className="text-center text-sm font-medium text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          replace
          className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
