"use client";

import { useEffect } from "react";
import { Category } from "./SidebarEditor";
import QrViewContent from "@/components/qr-view/QrViewContent";

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
      className="pointer-events-none" 
      style={{ 
        boxSizing: 'border-box', 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden', 
        minHeight: 0 
      }}
    >
      <div 
        className="relative pointer-events-auto cursor-pointer" 
        onClick={handleClick}
        style={{ 
          maxHeight: '100%', 
          maxWidth: '100%', 
          aspectRatio: '375/812', 
          flexShrink: 1,
          width: '337.5px'
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
            <div style={{ 
              width: '100%', 
              height: '100%', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <QrViewContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
