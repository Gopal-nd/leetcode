"use client"
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { axiosInstance } from '@/lib/axios';
import useAuthStore from '@/store/useAuthstore';

const RegisterSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})
export const dynamic = "force-dynamic"; 

export default function RegisterPage() {
  const { setUser } = useAuthStore();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {},
  });

  const router = useRouter();

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post('/auth/sign-up', data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Account created successfully');
      setUser({
        email: data.data.email,
        id: data.data.id,
        role: data.data.role,
        name: data.data.name,
      });
      router.push(`/email-verification`);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    },
  });

  // Guest Login Mutation
  const guestMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/auth/sign-in', {
        email: "guest@gmail.com",
        password: "123123",
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Logged in as Guest');
      setUser({
        email: data.data.email,
        id: data.data.id,
        role: data.data.role,
        name: data.data.name,
      });
      router.push(`/dashboard`);
    },
    onError: () => {
      toast.error("Guest login failed");
    },
  });

  const onSubmit = (data: any) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 border rounded-2xl shadow-lg  space-y-6">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        <p className="text-center ">Sign up to get started</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your display name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a valid email address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='******' type='password' />
                  </FormControl>
                  <FormDescription>
                    Must be at least 6 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col gap-3'>
              <Button type="submit" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "Creating..." : "Create Account"}
              </Button>


            </div>

            <p className="text-center text-sm ">
              Already have an account?{" "}
              <Link href={'/sign-in'} className='text-blue-400 font-medium underline'>
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
