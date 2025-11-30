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
      <div 
        className="relative pointer-events-auto" 
        style={{ 
          maxHeight: '100%', 
          maxWidth: '100%', 
          width: '318.9375px',
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
