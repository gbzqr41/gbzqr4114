"use client";

import { useEffect, useState, useRef } from "react";
import { Category, MenuItem } from "@/components/dashboard/SidebarEditor";
import MenuDetailView from "@/components/menu/MenuDetailView";
import AddressTablePopup from "./AddressTablePopup";

export default function QrViewContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [businessName, setBusinessName] = useState("My Restaurant");
  const [activeButton, setActiveButton] = useState<string>("burger");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showServiceMenu, setShowServiceMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [addressPopupMode, setAddressPopupMode] = useState<'table' | 'address' | 'addAddress'>('address');
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = () => {
      const storedCategories = localStorage.getItem("gbzqr_categories");
      const storedBusinessName = localStorage.getItem("gbzqr_businessName");
      
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
      if (storedBusinessName) {
        setBusinessName(storedBusinessName);
      }
    };

    loadData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gbzqr_categories' || e.key === 'gbzqr_businessName') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const interval = setInterval(() => {
      loadData();
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (categoryScrollRef.current) {
      const activeBtn = categoryScrollRef.current.querySelector(`[data-category="${activeButton}"]`) as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeButton]);

  const handleAddToCart = (item: MenuItem, quantity: number, variations?: any, extras?: any) => {
    // Cart functionality - localStorage'a kaydet
    const cart = JSON.parse(localStorage.getItem('gbzqr_cart') || '[]');
    const cartItem = {
      ...item,
      quantity,
      variations,
      extras,
      id: `${item.id}_${Date.now()}`
    };
    cart.push(cartItem);
    localStorage.setItem('gbzqr_cart', JSON.stringify(cart));
    setShowCartSuccess(true);
    setTimeout(() => {
      setShowCartSuccess(false);
    }, 2000);
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="bg-white" style={{ padding: '20px 10px 0 10px', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', paddingBottom: '90px' }}>
        <div className="max-w-md mx-auto bg-white" style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', position: 'relative', flex: 1, minHeight: 0, height: '100%' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0',
          gap: '10px',
          flexShrink: 0,
          marginBottom: '16px'
        }}>
          <div 
            onClick={() => setIsMenuOpen(true)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              cursor: 'pointer'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: 'auto' }}>
              <path d="M3 12H21M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div 
            onClick={() => {
              setAddressPopupMode('address');
              setShowAddressPopup(true);
            }}
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '14px',
              color: '#000',
              cursor: 'pointer'
            }}>
            Gaziler Mah. 1711 Sok.
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: 'auto' }}>
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div style={{ 
          height: '180px', 
          backgroundColor: 'rgb(242, 242, 242)', 
          borderRadius: '8px', 
          padding: '25px',
          marginBottom: '16px',
          flexShrink: 0
        }}>
        </div>
        <div 
          ref={categoryScrollRef}
          className="category-scroll"
          style={{ 
            display: 'flex', 
            gap: '7px', 
            marginBottom: '16px', 
            flexShrink: 0,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style>{`
            .category-scroll::-webkit-scrollbar {
              display: none;
            }
            .category-scroll {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <button
            data-category="burger"
            onClick={() => setActiveButton("burger")}
            style={{
              padding: '5px 15px',
              border: '2px solid #000',
              borderRadius: '9999px',
              backgroundColor: activeButton === "burger" ? '#000' : 'transparent',
              color: activeButton === "burger" ? '#fff' : '#000',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              flexShrink: 0
            }}
          >
            burger
          </button>
          <button
            data-category="döner"
            onClick={() => setActiveButton("döner")}
            style={{
              padding: '5px 15px',
              border: '2px solid #000',
              borderRadius: '9999px',
              backgroundColor: activeButton === "döner" ? '#000' : 'transparent',
              color: activeButton === "döner" ? '#fff' : '#000',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              flexShrink: 0
            }}
          >
            döner
          </button>
          {['pizza', 'salata', 'çorba', 'tatlı', 'içecek', 'kahve', 'sandwich', 'makarna', 'balık', 'tavuk'].map((category) => (
            <button
              key={category}
              data-category={category}
              onClick={() => setActiveButton(category)}
              style={{
                padding: '5px 15px',
                border: '2px solid #000',
                borderRadius: '9999px',
                backgroundColor: activeButton === category ? '#000' : 'transparent',
                color: activeButton === category ? '#fff' : '#000',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                flexShrink: 0
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px', 
          marginBottom: '16px', 
          flexShrink: 0 
        }}>
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div
              key={item}
              onClick={() => {
                const mockItem: MenuItem = {
                  id: `mock-${item}`,
                  name: 'Klasik Burger',
                  description: 'Etli, taze ve lezzetli burger',
                  price: 149.00,
                  isAvailable: true,
                  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop'
                };
                setSelectedItem(mockItem);
              }}
              style={{
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#000', margin: '0 0 4px 0' }}>
                  Klasik Burger
                </h3>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  Etli, taze ve lezzetli burger
                </p>
              </div>
              <div style={{ width: '100px', height: '100px', flexShrink: 0 }}>
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop"
                  alt="Burger"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8" style={{ overflowY: 'auto', flex: 1, minHeight: 0, paddingBottom: '0' }}>
          {categories.length > 0 && (
            categories.map((category) => (
              <div key={category.id} className="space-y-4">
                <h2 className="text-xl font-semibold text-black">{category.name}</h2>
                {category.items.length === 0 ? (
                  <p className="text-sm text-gray-400">No items in this category</p>
                ) : (
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => item.isAvailable && setSelectedItem(item)}
                        className={`p-4 rounded-lg border ${
                          item.isAvailable
                            ? "bg-white border-gray-200 cursor-pointer"
                            : "bg-gray-50 border-gray-200 opacity-60"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-black">{item.name}</h3>
                              {!item.isAvailable && (
                                <span className="text-xs text-red-600">(Unavailable)</span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="font-bold text-black">{item.price.toFixed(2)} TL</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: '448px',
          margin: '0 auto',
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
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={() => setShowServiceMenu(!showServiceMenu)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#000',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1001
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 11V6C18 4.34315 16.6569 3 15 3C13.3431 3 12 4.34315 12 6V11M18 11C18 12.6569 16.6569 14 15 14C13.3431 14 12 12.6569 12 11M18 11H21C21.5523 11 22 11.4477 22 12V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V12C2 11.4477 2.44772 11 3 11H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {showServiceMenu && (
            <>
              <div 
                onClick={() => setShowServiceMenu(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1001
                }}
              />
              <div style={{
              position: 'absolute',
              bottom: '68px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 1002,
              minWidth: '140px'
            }}>
              <button
                onClick={() => {
                  localStorage.setItem('gbzqr_serviceAlert', JSON.stringify({ type: 'waiter', timestamp: Date.now() }));
                  window.dispatchEvent(new Event('storage'));
                  setShowServiceMenu(false);
                }}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#000',
                  textAlign: 'left'
                }}
              >
                Garson Çağır
              </button>
              <button
                onClick={() => {
                  localStorage.setItem('gbzqr_serviceAlert', JSON.stringify({ type: 'bill', timestamp: Date.now() }));
                  window.dispatchEvent(new Event('storage'));
                  setShowServiceMenu(false);
                }}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#000',
                  textAlign: 'left'
                }}
              >
                Sipariş İste
              </button>
            </div>
            </>
          )}
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
      {isMenuOpen && (
        <>
          <div 
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9998
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '80%',
            backgroundColor: '#fff',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.3s ease-out',
            boxSizing: 'border-box'
          }}>
            <div style={{
              overflowY: 'auto',
              flex: '1 1 0',
              height: '100%',
              minHeight: '100%',
              padding: '20px',
              paddingBottom: '40px',
              backgroundColor: '#fff',
              width: '100%',
              boxSizing: 'border-box'
            }}>
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#d1d5db',
              borderRadius: '2px',
              margin: '0 auto 20px',
              cursor: 'pointer'
            }} onClick={() => setIsMenuOpen(false)} />
            <div style={{
              width: '100%',
              height: '150px',
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              marginBottom: '20px',
              overflow: 'hidden'
            }}>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
                alt="Restaurant"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#000', margin: '0 0 16px 0' }}>
              {businessName}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '14px', color: '#000' }}>+90 555 123 45 67</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '14px', color: '#000' }}>Gaziler Mah. 1711 Sok. No:5</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '14px', color: '#000' }}>www.restaurant.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V12L16 14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>Çalışma Saatleri</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Pazartesi - Cuma: 09:00 - 22:00</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Cumartesi - Pazar: 10:00 - 23:00</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </>
      )}
    </div>
    {selectedItem && (
      <MenuDetailView
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />
    )}
    {showAddressPopup && (
      <AddressTablePopup
        mode={addressPopupMode}
        onClose={() => setShowAddressPopup(false)}
        onModeChange={(newMode) => setAddressPopupMode(newMode)}
        onSelectTable={(table) => {
          console.log('Selected table:', table);
        }}
        onSelectAddress={(address) => {
          console.log('Selected address:', address);
        }}
        onSaveAddress={(address) => {
          console.log('Saved address:', address);
        }}
      />
    )}
    {showCartSuccess && (
      <div
        style={{
          position: 'fixed',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 10001,
          animation: 'fadeInOut 2s ease-in-out',
          pointerEvents: 'none'
        }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#000'
        }}>
          Sepete Eklendi
        </span>
      </div>
    )}
    <style>{`
      @keyframes fadeInOut {
        0% {
          opacity: 0;
          transform: translateX(-50%) translateY(-10px);
        }
        10% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        90% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-10px);
        }
      }
    `}</style>
      </div>
    </>
  );
}

