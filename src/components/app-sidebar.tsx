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
} from "../components/ui/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { Link, useNavigate } from "react-router-dom"
import { modelActions } from "../store/modelSlice"
import { FaPlus } from "react-icons/fa6";
import logoImg from '../assets/business-to-do-list-flat-icon-modern-style-vector.jpg'

export function AppSidebar() {
 
  const {projects} = useSelector((state: RootState)=> state.projects)
const dispatch = useDispatch()
const navigate = useNavigate()
const openModalHandler = ()=>{

  dispatch(modelActions.openModel('project'))
}
  return (
    <Sidebar>
      <SidebarContent >
        <SidebarGroup className="flex flex-col gap-4">
          <SidebarGroupLabel className='cursor-pointer h-[120px] p-6 rounded-[4px] bg-[#f7bfa3] text-white flex gap-3 ' onClick={()=> navigate('/')}> <img src={logoImg} className="w-9 h-9 rounded-full"/> <span className="text-[24px]">To Do List</span></SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
                <div className="flex flex-col gap-2 ">

              
              {projects.map((item) => (
                <SidebarMenuItem key={item.id}  >
                  <Link className="bg-red-700 p-3 rounded-[4px] flex  items-center cursor-pointer "  to={`/projects/${item.id}`} > 
                   
                   <span className="text-white text-[16px] " >{item.title}</span>
                </Link>
                </SidebarMenuItem>
              ))}
 
            
                </div>
                <SidebarMenuItem >
                  <SidebarMenuButton  className="bg-[#f29943] rounded-[4px] flex gap-4 justify-center hover:bg-[#e9a45f] hover:text-white text-white p-6" onClick={openModalHandler}   >
                <span className="font-semibold text-[18px]">Add project</span> <FaPlus className="size-[30px] font-semibold " />
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
