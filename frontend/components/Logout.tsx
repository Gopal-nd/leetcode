'use client'
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';

const Logout = () => {

const router = useRouter();

    async function Logout() {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in"); 
                },
            },
        });
    }

  return (
    <Button onClick={Logout}>
        Logout
    </Button>
  )
}

export default Logout