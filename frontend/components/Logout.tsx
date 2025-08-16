'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';
import useAuthStore from '@/store/useAuthstore';
import { axiosInstance } from '@/lib/axios';

const Logout = () => {
const { logout } = useAuthStore();
const router = useRouter();

    async function Logout() {
      await axiosInstance.post('/auth/logout')
        logout();
        router.push("/sign-in"); 

    }

  return (
    <Button onClick={Logout}>
        Logout
    </Button>
  )
}

export default Logout