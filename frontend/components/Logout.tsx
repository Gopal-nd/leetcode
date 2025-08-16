'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from './ui/button';
import useAuthStore from '@/store/useAuthstore';
import { axiosInstance } from '@/lib/axios';

const Logout = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);
      // ✅ Wait for API response
      await axiosInstance.post('/auth/logout');
      
      // ✅ Clear local state and redirect only after success
      logout();              
      router.push("/sign-in"); 
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}

export default Logout;
