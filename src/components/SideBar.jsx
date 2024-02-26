import React, { useState } from 'react'
import logo from '../assets/react.svg'
import { Dash,Document,Profile ,LogoutCurve,Setting ,ArrowCircleLeft,SearchNormal, Activity, AttachSquare} from 'iconsax-react'


export default function SideBar() {
  const [open , setOpen] = useState(true);


    const Menus = [
        {Title : "Dashboard", icon : <Dash/>},
        {Title : "Analytics", icon : <Activity/>},
        {Title : "Media",spacing:true, icon: <Document/>},
        {Title : "Reports", icon :<AttachSquare/>},
        {Title : "Profile", icon: <Profile/>},
        {Title : "Settings", spacing : true ,icon : <Setting/>},
        {Title : "Sign Out" ,icon : <LogoutCurve/>},
    ];
  return (
    <div className={`text-white bg-[#081A51]  min-h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
       <ArrowCircleLeft className={`bg-white text-3xl text-[#081A51] 
        rounded-full absolute -right-3 top-9 cursor-pointer ${!open && "rotate-180"}`} onClick={()=>setOpen(!open)}/>
        <div className='inline-flex'>
          <Dash className={`bg-amber-300 text-3xl rounded cursor-pointer block text-black float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}/>
          <h1 className={`text-white text-2xl origin-left font-medium duration-300 ${!open && "scale-0"}`}>CultureVoyage</h1>
        </div>
        <div className={`flex items-center rounded-md bg-slate-500 mt-6 py-2 ${!open ? "px-2.5" : "px-4"}`}>
          <SearchNormal className={`text-white text-lg block cursor-pointer float-left ${open && "mr-2"}`}/>
          <input type={"search"} placeholder='Search' className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`}/>
        </div>
        <ul className='pt-2'>
           {Menus.map((menu,index)=>(
              <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-500 rounded-md ${menu.spacing? "mt-9" : "mt-2"}`}>
               <span className='text-2xl block float-left'>
                {menu.icon? menu.icon:<Activity/>}
               </span>
               <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>{menu.Title}</span>

              </li>
           ))}
        </ul>

    
    </div>
  )
}
