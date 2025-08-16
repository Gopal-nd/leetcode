"use client"
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import useAuthStore from '@/store/useAuthstore';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import axios from 'axios';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})


export default function LoginPage() {
  const  {setUser} = useAuthStore()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{

    }
  })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post('/auth/sign-in', data);

      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Login successful');
      console.log(data.data)
      setUser({
        email:data.data.sendUser.email,
        id:data.data.sendUser.id,
        role:data.data.sendUser.role,
        name:data.data.sendUser.name,
      })
      if(data.data.sendUser.role === 'USER'){
        router.push(`/dashboard`)
      }else if(data.data.sendUser.role === 'ADMIN'){
        router.push(`/admin`)
      }

    },
    onError: (error) => {
      console.log(error)
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message);
      }else{
        toast.error('something went wrong ,Login Failed')
      }
    },
  });

  const onSubmit = (data: any) => {
    console.log(data)
   const output =  mutation.mutate(data)

  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  Enter the User Email.
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
                  <Input

                    {...field}
                    placeholder='******'
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className='text-blue-500'>
          <Link href={'/reset-password'}>Forgot Password?</Link>
          </p>
          <div className='flex gap-2'>
          <Button>Guest Login</Button>
          <Button type="submit">Submit</Button>
          </div>
          <p>Don't have an account? <Link href={'/sign-up'} className='text-blue-500 underline'>Sign Up</Link></p>
        </form>
      </Form>
      
    </div>
  );
}