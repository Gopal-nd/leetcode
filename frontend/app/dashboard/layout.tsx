import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/user/UserSidebar";
import Profile from "@/components/Profile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden bg-background  ">
          <div className="flex items-center p-2 w-full justify-between border-b">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-9 w-9" />
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Profile />
            </div>
          </div>
          <div className="p-1">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
