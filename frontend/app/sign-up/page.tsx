"use client"
import React, { use } from 'react';
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


export default function RegisterPage() {
    const {user,setUser} = useAuthStore()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{

    }
  })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post('/auth/sign-up', data);

      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Account Created successfully');
      console.log(data)
      setUser({
        email:data.data.email,
        id:data.data.id,
        role:data.data.role,
        name:data.data.name,
      })
      router.push(`/email-verification`)

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
    // console.log(data)
   const output =  mutation.mutate(data)

  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
             <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ram" {...field} />
                </FormControl>
                <FormDescription>
                  Enter Your Display Name
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
          <div className='flex flex-col gap-2'>
          <Button type="submit" disabled={mutation.isPending}>Create Account</Button>
            <p className='text-center'>or</p>
          <Button>Guest Login</Button>
          </div>
          <p> have an account? <Link href={'/sign-in'} className='text-blue-400 underline'>Sign In</Link></p>
        </form>
      </Form>
      
    </div>
  );
}