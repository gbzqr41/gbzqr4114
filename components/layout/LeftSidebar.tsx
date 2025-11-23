"use client";

import { useState, useEffect, useRef } from "react";

export default function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const userSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        userSectionRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !userSectionRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

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
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-[36px] h-[36px] rounded-full bg-transparent flex items-center justify-center flex-shrink-0"
              style={{ border: '2px solid rgb(96, 96, 96)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L20 12M4 12L10 6M4 12L10 18" stroke="rgb(96, 96, 96)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
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
          
          <div className="space-y-1">
            <div className="px-4 py-3 text-white hover:bg-[#1E1B19] rounded cursor-pointer flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 20.5L3.5 13.5L20.5 13.5V20.5H3.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 10.5L3.5 3.5L20.5 3.5V10.5L3.5 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Pano</span>
            </div>
            <div className="px-4 py-3 text-white hover:bg-[#1E1B19] rounded cursor-pointer flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8H17.1597C18.1999 8 19.0664 8.79732 19.1528 9.83391L19.8195 17.8339C19.9167 18.9999 18.9965 20 17.8264 20H6.1736C5.00352 20 4.08334 18.9999 4.18051 17.8339L4.84718 9.83391C4.93356 8.79732 5.80009 8 6.84027 8H8M16 8H8M16 8L16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7L8 8M16 8L16 12M8 8L8 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Sipariş</span>
            </div>
            <div className="px-4 py-3 text-white rounded cursor-pointer flex items-center gap-3" style={{ background: 'linear-gradient(135deg, rgba(40, 0, 60, 0.35), rgba(0, 0, 0, 0.45))', color: '#ffffff' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H9V9H3V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 3H21V9H15V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 15H9V21H3V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 15H16M18 15H19M16 19H19V16H16V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>QR Menü</span>
            </div>
            <div className="px-4 py-3 text-white hover:bg-[#1E1B19] rounded cursor-pointer flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 18V6H8L2.70711 11.2929C2.31658 11.6834 2.31658 12.3166 2.70711 12.7071L8 18H21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12C12 13.1046 11.1046 14 10 14C8.89543 14 8 13.1046 8 12C8 10.8954 8.89543 10 10 10C11.1046 10 12 10.8954 12 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Ürün</span>
            </div>
            <div className="px-4 py-3 text-white hover:bg-[#1E1B19] rounded cursor-pointer flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11V17M12 7L12 17M8 14L8 17M4 4H20V20H4V4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>İstatistik</span>
            </div>
            <div className="px-4 py-3 text-white hover:bg-[#1E1B19] rounded cursor-pointer flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17V16.9929M9.13733 9C9.51961 7.84083 10.6567 7 12 7C13.6568 7 15 8.27919 15 9.85714C15 12.106 12.5726 11.7539 12.0848 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Ayarlar</span>
            </div>
            <div className="px-4 py-3 text-white hover:bg-[#1E1B19] rounded cursor-pointer flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.10863 14.1079L3.76461 15.7639C4.02858 16.0413 4.38552 16.2119 4.76752 16.2431C5.84479 16.3311 7.91395 15.0073 8.44327 14.1917C8.8559 13.5559 8.69631 12.6629 8.69702 11.9465C10.8675 11.3476 13.1582 11.3453 15.3275 11.9399C15.3268 12.6563 15.1654 13.5497 15.5768 14.1847C16.1037 14.9979 18.1615 16.3114 19.2367 16.2294C19.6149 16.2006 19.97 16.0352 20.2357 15.7642L21.895 14.1049C22.5266 13.4721 22.4856 12.3791 21.7923 11.8009C16.3175 6.31749 7.7222 6.27776 2.21038 11.7982C1.51362 12.3797 1.47304 13.4775 2.10863 14.1079Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Yardım</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

