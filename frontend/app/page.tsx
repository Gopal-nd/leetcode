'use client'
import Logout from "@/components/Logout"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"

export default function Home() {
   const { 
        data: session, 
        isPending, 
        error, 
        refetch 
    } = useSession() 
  return (
    <div>
      <h1>Home</h1>
      <p>{JSON.stringify(session, null, 2)}</p>
      <p>{session?.user?.id}</p>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <Logout />
    </div>
  )
}