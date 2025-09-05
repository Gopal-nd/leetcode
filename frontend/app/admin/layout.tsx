"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AdminSidebar";
import Profile from "@/components/Profile";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import useAuthStore from "@/store/useAuthstore";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore().user;
  if (!user) {
    router.push("/");
  }
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden bg-background  ">
          <div className="flex items-center p-2 w-full justify-between border-b">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-9 w-9" />
              <Link href="/admin">
                <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
              </Link>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <ModeToggle />
              <Profile />
            </div>
          </div>
          <div className="p-1">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
