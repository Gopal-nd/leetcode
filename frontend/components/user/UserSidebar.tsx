import { Calendar, Home, Inbox, Play, UserRound,  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "PlayList",
    url: "/dashboard/playlist",
    icon: Play,
  },
   {
    title: "Profile",
    url: "/dashboard/profile",
    icon: UserRound,
  },
 
]

export function AppSidebar() {
  return (
    <Sidebar>
         <SidebarContent>
           <SidebarGroup>
             <SidebarGroupLabel className="text-center p-2 m-2 w-full">
               <h1 className="text-2xl font-bold ">LeetLab</h1>
             </SidebarGroupLabel>
             <SidebarGroupContent className="mt-2">
               <SidebarMenu>
                 {items.map((item) => (
                   <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton asChild>
                       <a href={item.url}>
                         <item.icon />
                         <span>{item.title}</span>
                       </a>
                     </SidebarMenuButton>
                   </SidebarMenuItem>
                 ))}
               </SidebarMenu>
             </SidebarGroupContent>
           </SidebarGroup>
         </SidebarContent>
       </Sidebar>
  )
}