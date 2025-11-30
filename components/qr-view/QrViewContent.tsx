"use client";

import { useEffect, useState } from "react";
import { Category } from "@/components/dashboard/SidebarEditor";

export default function QrViewContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [businessName, setBusinessName] = useState("My Restaurant");
  const [activeButton, setActiveButton] = useState<string>("burger");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedCategories = localStorage.getItem("gbzqr_categories");
    const storedBusinessName = localStorage.getItem("gbzqr_businessName");
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
    if (storedBusinessName) {
      setBusinessName(storedBusinessName);
    }
  }, []);

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
      <div className="bg-white" style={{ padding: '20px 10px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', scrollbarWidth: 'none', msOverflowStyle: 'none', position: 'relative' }}>
        <div className="max-w-md mx-auto bg-white h-full" style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          gap: '10px',
          flexShrink: 0
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '14px',
            color: '#000'
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div style={{ 
          height: '150px', 
          backgroundColor: '#fee2e2', 
          borderRadius: '8px', 
          padding: '25px',
          marginBottom: '16px',
          flexShrink: 0
        }}>
          <h1 style={{ fontSize: '16px', fontWeight: '600', color: '#000', margin: 0 }}>Merhaba</h1>
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '16px', 
          flexShrink: 0 
        }}>
          <button
            onClick={() => setActiveButton("burger")}
            style={{
              padding: '3px',
              border: '2px solid #000',
              borderRadius: '4px',
              backgroundColor: activeButton === "burger" ? '#000' : 'transparent',
              color: activeButton === "burger" ? '#fff' : '#000',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            burger
          </button>
          <button
            onClick={() => setActiveButton("döner")}
            style={{
              padding: '3px',
              border: '2px solid #000',
              borderRadius: '4px',
              backgroundColor: activeButton === "döner" ? '#000' : 'transparent',
              color: activeButton === "döner" ? '#fff' : '#000',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            döner
          </button>
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px', 
          marginBottom: '16px', 
          flexShrink: 0 
        }}>
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              style={{
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#fff'
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

        <div className="space-y-8" style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
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
                        className={`p-4 rounded-lg border ${
                          item.isAvailable
                            ? "bg-white border-gray-200"
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
                            <p className="font-bold text-black">${item.price.toFixed(2)}</p>
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
            height: '80%',
            backgroundColor: '#fff',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            zIndex: 9999,
            overflowY: 'auto',
            padding: '20px',
            animation: 'slideUp 0.3s ease-out'
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
        </>
      )}
    </div>
    </>
  );
}

