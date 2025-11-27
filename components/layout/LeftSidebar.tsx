"use client";

import { useState, useRef, useEffect } from "react";
import SidebarToggle from "../sidebar/SidebarToggle";
import SidebarList from "../sidebar/SidebarList";

export default function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      className={`transition-all ${isCollapsed ? 'w-0 overflow-hidden' : 'w-[260px]'}`}
      style={{
        background: "#000000",
        height: '100dvh',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0
      }}
    >
      <div className="px-6 flex flex-col relative" style={{ boxSizing: 'border-box', height: '100%', overflowY: 'auto', overflowX: 'hidden', flex: '1 1 0', minHeight: 0, width: '100%', paddingTop: '34px', paddingBottom: '30px' }}>
        <div className="flex-1 min-h-0" style={{ width: '100%', minWidth: 0 }}>
          <div className="flex items-center justify-between mb-6" style={{ width: '100%', minWidth: 0 }}>
            <h1 className="text-[26px] font-bold text-white">GBZQR</h1>
            <SidebarToggle onClick={() => setIsCollapsed(!isCollapsed)} />
          </div>
          
          <div className="flex items-center gap-2 w-full py-2 rounded-lg mb-4 focus-within:border-0" style={{ backgroundColor: '#222', border: '2px solid rgb(43, 43, 43)', paddingLeft: '10px', paddingRight: '10px', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M20 20L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="rgb(132, 132, 132)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Ara"
              className="flex-1 bg-transparent text-white focus:outline-none text-[13px] placeholder:text-[rgb(132,132,132)] placeholder:font-medium"
              style={{ minWidth: 0, width: 0 }}
            />
            <button
              type="button"
              onClick={() => searchInputRef.current?.focus()}
              style={{
                padding: '4px 8px',
                fontSize: '9px',
                color: 'rgb(132, 132, 132)',
                backgroundColor: 'transparent',
                border: '1px solid rgb(43, 43, 43)',
                borderRadius: '4px',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              CTRL + F
            </button>
          </div>
          
          <SidebarList activeItem="QR Menü" />
        </div>
      </div>
    </div>
  );
}

