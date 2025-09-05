"use client"
import React, { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/store/useAuthstore";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import axios from "axios";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const { setUser } = useAuthStore();
  const [loginType, setLoginType] = useState<"normal" | "guest" | null>(null);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  });

  
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/auth/sign-in", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login success response:", data);
      const user = data?.data?.sendUser;
      if (!user) {
        toast.error("No user returned from API");
        return;
      }

      setUser({
        email: user.email,
        id: user.id,
        role: user.role,
        name: user.name,
      });

      toast.success("Login successful");

      // ✅ Ensure redirect works
      setTimeout(() => {
        if (user.role === "USER") {
          router.replace("/dashboard");
        } else if (user.role === "ADMIN") {
          router.replace("/admin");
        } else {
          router.replace("/");
        }
      }, 50);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong, Login Failed");
      }
    },
    onSettled: () => setLoginType(null), // reset button state
  });

  const onSubmit = (data: any) => {
    setLoginType("normal");
    mutation.mutate(data);
  };

  const handleGuestLogin = () => {
    setLoginType("guest");
    mutation.mutate({
      email: "lenev99889@futebr.com",
      password: "123123",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md space-y-6 rounded-xl border shadow-lg p-8">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Login</h2>
          <p className="text-sm">Access your account securely</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your registered email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end text-sm">
              <Link
                href="/reset-password"
                className="underline text-blue-400"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="space-y-3">
              {/* Normal Login */}
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending && loginType === "normal"}
              >
                {mutation.isPending && loginType === "normal"
                  ? "Logging in..."
                  : "Login"}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Guest Login */}
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={handleGuestLogin}
                disabled={mutation.isPending && loginType === "guest"}
              >
                {mutation.isPending && loginType === "guest"
                  ? "Logging in as guest..."
                  : "Guest Login"}
              </Button>
            </div>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link href="/sign-up" className="underline text-blue-400">
                Sign Up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
