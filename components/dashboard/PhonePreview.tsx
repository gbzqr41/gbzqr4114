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
      style={{ 
        boxSizing: 'border-box', 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden', 
        minHeight: 0 
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
          gap: '6px'
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
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: '70px'
            }}>
              <QrViewContent />
            </div>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#fff',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '12px 0',
              zIndex: 1000
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '10px', color: '#000' }}>Anasayfa</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 18.7083C18 17.0886 16.8283 15 15 15H9C7.17172 15 6 17.0886 6 18.7083M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '10px', color: '#000' }}>Profil</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', position: 'relative' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '10px', color: '#000' }}>Bildirim</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2V4M15 2V4M7 10H17M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '10px', color: '#000' }}>Sepet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
