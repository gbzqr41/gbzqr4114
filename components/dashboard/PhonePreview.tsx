"use client";

import { useEffect } from "react";
import { Category } from "./SidebarEditor";

type PhonePreviewProps = {
  categories: Category[];
  businessName?: string;
};

export default function PhonePreview({ categories, businessName = "My Restaurant" }: PhonePreviewProps) {
  useEffect(() => {
    localStorage.setItem("gbzqr_categories", JSON.stringify(categories));
    localStorage.setItem("gbzqr_businessName", businessName);
  }, [categories, businessName]);

  const handleClick = () => {
    localStorage.setItem("gbzqr_categories", JSON.stringify(categories));
    localStorage.setItem("gbzqr_businessName", businessName);
    window.open("/qr-view", "_blank");
  };

  return (
    <div 
      style={{ 
        boxSizing: 'border-box', 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden', 
        minHeight: 0,
        maxHeight: '100%'
      }}
    >
      <button
        onClick={handleClick}
        style={{
          padding: '7px',
          marginBottom: '10px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '999px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          flexShrink: 0
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18.01V18M8 3H16C17.1046 3 18 3.89543 18 5V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V5C6 3.89543 6.89543 3 8 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        ÖN İZLEME
      </button>
      <div 
        className="relative pointer-events-auto" 
        style={{ 
          maxHeight: '100%', 
          maxWidth: '100%', 
          width: '303.75px',
          aspectRatio: '375/812',
          flexShrink: 1,
          flex: '1 1 auto',
          minHeight: 0
        }}
      >
        <div 
          className="bg-black shadow-2xl" 
          style={{ 
            width: '100%', 
            height: '100%', 
            boxSizing: 'border-box',
            borderRadius: '1.8rem',
            padding: '8px',
            overflow: 'hidden'
          }}
        >
          <div 
            className="w-full h-full bg-white overflow-hidden relative" 
            style={{ 
              borderRadius: 'calc(1.8rem - 8px)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <iframe
              src="/qr-view"
              scrolling="yes"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: 'calc(1.8rem - 8px)',
                overflow: 'auto'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
