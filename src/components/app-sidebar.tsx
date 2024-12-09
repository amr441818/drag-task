import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

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
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { Link, useNavigate } from "react-router-dom"
import { modelActions } from "../store/modelSlice"
import { useState } from "react"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
 
  const {projects} = useSelector((state: RootState)=> state.projects)
const dispatch = useDispatch()
const navigate = useNavigate()
const openModalHandler = ()=>{

  dispatch(modelActions.openModel('project'))
}
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='cursor-pointer' onClick={()=> navigate('/')}>To Do List</SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
                <div className="flex flex-col gap-5 ">

              
              {projects.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                   <Link  to={`/projects/${item.id}`}>
                   
                      <span>{item.title}</span>
                   </Link>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
 
            
                </div>
                <SidebarMenuItem >
                  <SidebarMenuButton  className="bg-[#019867] rounded-[4px] text-white" onClick={openModalHandler}   >
                 Add new project
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
