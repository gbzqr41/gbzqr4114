"use client";

import { useState } from "react";
import SidebarToggle from "../sidebar/SidebarToggle";
import SidebarList from "../sidebar/SidebarList";
import SidebarUser from "../sidebar/SidebarUser";

export default function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={`h-screen rounded-[20px] transition-all ${isCollapsed ? 'w-0 overflow-hidden' : 'w-[260px]'}`}
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #1A1715 100%)"
      }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[26px] font-bold text-white">GBZQR</h1>
            <SidebarToggle onClick={() => setIsCollapsed(!isCollapsed)} />
          </div>
          
          <div className="flex items-center gap-2 w-full px-4 py-2 rounded-lg mb-4 focus-within:border-0" style={{ backgroundColor: '#242424', border: '2px solid rgb(132, 132, 132)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M20 20L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="rgb(132, 132, 132)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Ne Aramıştınız?"
              className="flex-1 bg-transparent text-white focus:outline-none text-[13px] placeholder:text-[rgb(132,132,132)]"
            />
          </div>
          
          <SidebarList activeItem="QR Menü" />
        </div>
        
        <SidebarUser />
      </div>
    </div>
  );
}

