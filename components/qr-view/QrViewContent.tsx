"use client";

import { useEffect, useState, useRef } from "react";
import { Category, MenuItem } from "@/components/dashboard/SidebarEditor";
import MenuDetailView from "@/components/menu/MenuDetailView";
import AddressTablePopup from "./AddressTablePopup";
import { Search, X, Home, User, Bell, ShoppingCart, Calendar, Phone, MapPin, Globe, Clock, Check, Navigation, Heart } from "lucide-react";

export default function QrViewContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [businessName, setBusinessName] = useState("My Restaurant");
  const [showServiceMenu, setShowServiceMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [addressPopupMode, setAddressPopupMode] = useState<'table' | 'address' | 'addAddress'>('address');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showStickySearch, setShowStickySearch] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("Kahvaltı");
  const menuScrollRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

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
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = mainContainerRef.current;
      if (container) {
        const scrollTop = container.scrollTop;
        if (scrollTop > 100) {
          setShowStickySearch(true);
        } else {
          setShowStickySearch(false);
        }
      } else {
        const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollY > 100) {
          setShowStickySearch(true);
        } else {
          setShowStickySearch(false);
        }
      }
    };

    const container = mainContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

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
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {showStickySearch && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: '448px',
          margin: '0 auto',
          zIndex: 1001,
          backgroundColor: '#fff',
          padding: '10px 10px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '100%',
            height: '50px',
            borderRadius: '9999px',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            flexShrink: 0,
            position: 'relative',
            boxSizing: 'border-box'
          }}>
            <Search size={20} style={{ flexShrink: 0, marginRight: '10px' }} color="black" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ne Aramıştınız"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '14px',
                color: '#000',
                minWidth: 0
              }}
            />
            {searchQuery && (
              <div
                onClick={() => setSearchQuery('')}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  marginLeft: '10px'
                }}
              >
                <X size={12} color="black" strokeWidth={3} />
              </div>
            )}
          </div>
        </div>
      )}
      <div ref={mainContainerRef} className="bg-white" style={{ padding: '10px 10px 10px 10px', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', paddingBottom: '90px', overflowY: 'auto', height: '100vh', backgroundColor: '#fff', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="max-w-md mx-auto bg-white" style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', position: 'relative', flex: 1, minHeight: 0, height: '100%', backgroundColor: '#fff' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0',
          gap: '10px',
          flexShrink: 0,
          margin: '10px 0'
        }}>
          <div 
            onClick={() => {
              setAddressPopupMode('address');
              setShowAddressPopup(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#000',
              cursor: 'pointer',
              flex: 1
            }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Navigation size={24} color="black" />
            </div>
            <span style={{ fontSize: '16px' }}>Gaziler Mah. 1711 Sok.</span>
          </div>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Heart size={24} style={{ display: 'block', margin: 'auto' }} color="black" />
          </div>
        </div>
        <div style={{ 
          height: '180px', 
          borderRadius: '8px', 
          marginBottom: '16px',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            width: '200%',
            height: '100%',
            transform: `translateX(-${currentSlide * 50}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}>
            <div style={{ 
              width: '50%',
              height: '100%',
              backgroundImage: 'url(https://i.pinimg.com/736x/47/06/6c/47066ccfb40ce0b87e27828aa0760b42.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'relative'
            }}></div>
            <div style={{ 
              width: '50%',
              height: '100%',
              backgroundImage: 'url(https://i.pinimg.com/736x/0d/34/a5/0d34a54ab821af63f1d7241d7bfd983f.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'relative'
            }}></div>
          </div>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            paddingTop: '3px',
            zIndex: 10
          }}>
            <div 
              onClick={() => setCurrentSlide(0)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: currentSlide === 0 ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                border: '1px solid rgba(0, 0, 0, 0.2)'
              }}
            ></div>
            <div 
              onClick={() => setCurrentSlide(1)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: currentSlide === 1 ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                border: '1px solid rgba(0, 0, 0, 0.2)'
              }}
            ></div>
          </div>
        </div>
        <div 
          ref={menuContainerRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
            flexShrink: 0
          }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Search size={24} color="black" />
          </div>
          <div
            ref={menuScrollRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              flex: 1
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {['Kahvaltı', 'Çorba', 'Et', 'Salat', 'Tatlı', 'İçecek', 'Kahve', 'Sandwich', 'Makarna', 'Balık'].map((menu) => (
              <span
                key={menu}
                data-menu={menu}
                onClick={() => {
                  requestAnimationFrame(() => {
                    const menuElement = menuScrollRef.current?.querySelector(`[data-menu="${menu}"]`) as HTMLElement;
                    if (menuElement && menuScrollRef.current && menuContainerRef.current) {
                      const containerRect = menuContainerRef.current.getBoundingClientRect();
                      const scrollRect = menuScrollRef.current.getBoundingClientRect();
                      const elementRect = menuElement.getBoundingClientRect();
                      const currentScrollLeft = menuScrollRef.current.scrollLeft;
                      const elementOffsetInScroll = elementRect.left - scrollRect.left + currentScrollLeft;
                      const elementWidth = elementRect.width;
                      const containerWidth = containerRect.width;
                      const searchIconWidth = 42;
                      const gap = 12;
                      const scrollAreaWidth = scrollRect.width;
                      const centerOfScrollArea = searchIconWidth + gap + (scrollAreaWidth / 2);
                      const targetScrollLeft = elementOffsetInScroll - (centerOfScrollArea - searchIconWidth - gap) + (elementWidth / 2);
                      const maxScroll = menuScrollRef.current.scrollWidth - scrollRect.width;
                      menuScrollRef.current.scrollTo({ 
                        left: Math.max(0, Math.min(targetScrollLeft, maxScroll)), 
                        behavior: 'smooth' 
                      });
                    }
                  });
                  setSelectedMenu(menu);
                }}
                style={{
                  fontSize: '16px',
                  color: selectedMenu === menu ? '#000' : '#9ca3af',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  fontWeight: selectedMenu === menu ? '600' : '400',
                  transition: 'font-weight 0.2s ease, color 0.2s ease'
                }}
              >
                {menu}
              </span>
            ))}
          </div>
        </div>
        <div style={{
          height: '150px',
          borderRadius: '20px',
          backgroundColor: 'rgb(247, 247, 247)',
          padding: '20px',
          marginBottom: '16px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#000', margin: '0 0 8px 0' }}>
              Mc Donald's
            </h3>
            <p style={{ fontSize: '12px', fontWeight: '400', color: '#6b7280', margin: 0 }}>
              Domates, turşu, soğan, marul
            </p>
          </div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#000' }}>
            399 TL
          </div>
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
          <Home size={24} color="black" />
          <span style={{ fontSize: '10px', color: '#000' }}>Anasayfa</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <User size={24} color="black" />
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
            <Bell size={24} color="white" />
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
          <ShoppingCart size={24} color="black" />
          <span style={{ fontSize: '10px', color: '#000' }}>Bildirim</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <Calendar size={24} color="black" />
          <span style={{ fontSize: '10px', color: '#000' }}>Sepet</span>
        </div>
      </div>
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
          <Check size={20} color="white" strokeWidth={2} />
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

