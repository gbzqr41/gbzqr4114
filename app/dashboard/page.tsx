"use client";

import { useState, useRef, useEffect } from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import SidebarEditor, { Category } from "@/components/dashboard/SidebarEditor";
import PhonePreview from "@/components/dashboard/PhonePreview";
import ProfileBar from "@/components/header/ProfileBar";

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [serviceAlert, setServiceAlert] = useState<{ type: string; timestamp: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const handleLock = () => {
    setIsLocked(true);
    setShowPasswordModal(true);
    setPassword("");
  };

  const handlePasswordSubmit = () => {
    if (password === "1111") {
      setIsLocked(false);
      setShowPasswordModal(false);
      setPassword("");
    } else {
      alert("Yanlış şifre!");
      setPassword("");
    }
  };

  const handleNumberClick = (num: string) => {
    if (password.length < 4) {
      setPassword(password + num);
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };

  const handlePreview = () => {
    localStorage.setItem("gbzqr_categories", JSON.stringify(categories));
    window.open("/qr-view", "_blank");
  };

  useEffect(() => {
    const checkServiceAlert = () => {
      const alertData = localStorage.getItem('gbzqr_serviceAlert');
      if (alertData) {
        const parsed = JSON.parse(alertData);
        if (parsed.timestamp && (!serviceAlert || parsed.timestamp !== serviceAlert.timestamp)) {
          setServiceAlert(parsed);
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.frequency.value = 800;
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
        }
      }
    };

    const interval = setInterval(checkServiceAlert, 500);
    window.addEventListener('storage', checkServiceAlert);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkServiceAlert);
    };
  }, [serviceAlert]);

  return (
    <>
    <div className="bg-white flex overflow-hidden" style={{ height: '100vh', minHeight: 0 }} ref={containerRef}>
      <LeftSidebar />
      <div className="flex-1 w-full h-full pt-[50px] px-[50px] pb-[20px] flex flex-col" style={{ overflow: 'hidden', minHeight: 0 }}>
        <div className="flex items-center justify-between mb-6" style={{ flexShrink: 0 }}>
          <div>
            <h2 className="text-[28px] text-black font-bold">QR Menü Oluşturma</h2>
            <div className="flex items-center gap-2" style={{ marginTop: '10px' }}>
              <span className="text-sm" style={{ color: 'rgb(119, 119, 119)' }}>Anasayfa</span>
              <div className="w-[50px] h-[1px]" style={{ backgroundColor: 'rgb(119, 119, 119)' }}></div>
              <span className="text-sm" style={{ color: 'rgb(119, 119, 119)' }}>QR Menü</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePreview}
              style={{
                padding: '7px 14px',
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18.01V18M8 3H16C17.1046 3 18 3.89543 18 5V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V5C6 3.89543 6.89543 3 8 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              ÖN İZLEME
            </button>
            <button
              onClick={handleFullscreen}
              style={{
                padding: '7px 14px',
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              TAM EKRAN
            </button>
            <button
              onClick={handleLock}
              style={{
                padding: '7px 14px',
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              EKRAN KİLİTLE
            </button>
            <ProfileBar />
          </div>
        </div>
        <div className="flex-1 w-full flex overflow-hidden" style={{ minHeight: 0, backgroundColor: '#f2f2f2', borderRadius: '20px' }}>
          <div className="w-full flex bg-[#f2f2f2] rounded-[20px] p-[10px]" style={{ minHeight: 0, overflow: 'hidden' }}>
            <div className="w-[46%] border-r border-gray-200" style={{ overflow: 'hidden' }}>
              <SidebarEditor categories={categories} onCategoriesChange={setCategories} />
            </div>
            <div className="w-[54%] flex items-center justify-center" style={{ boxSizing: 'border-box', height: '100%', minHeight: 0, overflow: 'hidden', paddingTop: '30px', paddingBottom: '30px', flexShrink: 1 }}>
              <PhonePreview categories={categories} />
            </div>
          </div>
        </div>
      </div>
      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '12px',
            minWidth: '300px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', textAlign: 'center' }}>Şifre Girin</h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '30px'
            }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '2px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    backgroundColor: password.length > i ? '#000' : 'transparent',
                    color: password.length > i ? '#fff' : '#000'
                  }}
                >
                  {password.length > i ? '•' : ''}
                </div>
              ))}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginBottom: '10px'
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  style={{
                    padding: '20px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '20px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '10px'
            }}>
              <button
                onClick={handleDelete}
                style={{
                  padding: '20px',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Sil
              </button>
              <button
                onClick={() => handleNumberClick("0")}
                style={{
                  padding: '20px',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '20px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                0
              </button>
              <button
                onClick={handlePasswordSubmit}
                style={{
                  padding: '20px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    {serviceAlert && (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#fff',
        border: '2px solid #000',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 10000,
        minWidth: '300px'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            {serviceAlert.type === 'waiter' ? 'Müşteri Garson Çağırdı' : 'Müşteri Hesap İstiyor'}
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            {serviceAlert.type === 'waiter' 
              ? 'Bir müşteri garson çağırdı. Lütfen masaya gidin.' 
              : 'Bir müşteri hesap istiyor. Lütfen masaya gidin.'}
          </p>
        </div>
        <button
          onClick={() => {
            setServiceAlert(null);
            localStorage.removeItem('gbzqr_serviceAlert');
          }}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Tamam
        </button>
      </div>
    )}
    </>
  );
}

