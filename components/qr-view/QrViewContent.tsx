"use client";

import { useEffect, useState, useRef } from "react";
import { Category, MenuItem } from "@/components/dashboard/SidebarEditor";
import MenuDetailView from "@/components/menu/MenuDetailView";
import AddressTablePopup from "./AddressTablePopup";
import { Search, X, Home, User, Bell, ShoppingCart, Calendar, Phone, MapPin, Globe, Clock, Check, Navigation, Heart, Grid3x3, Filter } from "lucide-react";

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
  const [showStickyCategories, setShowStickyCategories] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const menuScrollRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const stickyMenuScrollRef = useRef<HTMLDivElement>(null);
  const stickyMenuContainerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const sliderVideoRef = useRef<HTMLVideoElement>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);

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
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sliderVideoRef.current) {
      sliderVideoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (cardVideoRef.current) {
      cardVideoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = mainContainerRef.current;
      if (container) {
        const scrollTop = container.scrollTop;
        const categoriesSection = container.querySelector('[data-categories-section]') as HTMLElement;
        if (categoriesSection) {
          const categoriesRect = categoriesSection.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const categoriesBottom = categoriesRect.bottom - containerRect.top + scrollTop;
          if (scrollTop > categoriesBottom) {
            setShowStickyCategories(true);
          } else {
            setShowStickyCategories(false);
          }
        } else {
          if (scrollTop > 400) {
            setShowStickyCategories(true);
          } else {
            setShowStickyCategories(false);
          }
        }
      } else {
        const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const categoriesSection = document.querySelector('[data-categories-section]') as HTMLElement;
        if (categoriesSection) {
          const categoriesRect = categoriesSection.getBoundingClientRect();
          const categoriesBottom = categoriesRect.bottom + scrollY;
          if (scrollY > categoriesBottom) {
            setShowStickyCategories(true);
          } else {
            setShowStickyCategories(false);
          }
        } else {
          if (scrollY > 400) {
            setShowStickyCategories(true);
          } else {
            setShowStickyCategories(false);
          }
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

  const handleSwipe = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe left - next slide
        setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
      } else {
        // Swipe right - previous slide
        setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
      }
    }
  };

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
      {showStickyCategories && (
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
          <div 
            ref={stickyMenuContainerRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0
            }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              border: '2px solid #f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Search size={24} color="black" />
            </div>
            <div
              ref={stickyMenuScrollRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
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
              {['Kahvaltı', 'Çorba', 'Et ve Tavuk', 'Salatalar', 'Tatlı', 'İçecek', 'Kahve', 'Sandwich', 'Makarna', 'Balık'].map((menu) => (
                <span
                  key={menu}
                  data-menu={menu}
                  onClick={() => {
                    const newSelectedMenu = menu;
                    setSelectedMenu(newSelectedMenu);
                    setTimeout(() => {
                      const menuElement = stickyMenuScrollRef.current?.querySelector(`[data-menu="${newSelectedMenu}"]`) as HTMLElement;
                      if (menuElement && stickyMenuScrollRef.current && stickyMenuContainerRef.current) {
                        const containerRect = stickyMenuContainerRef.current.getBoundingClientRect();
                        const scrollRect = stickyMenuScrollRef.current.getBoundingClientRect();
                        const elementRect = menuElement.getBoundingClientRect();
                        const currentScrollLeft = stickyMenuScrollRef.current.scrollLeft;
                        const elementOffsetInScroll = elementRect.left - scrollRect.left + currentScrollLeft;
                        const elementWidth = elementRect.width;
                        const containerWidth = containerRect.width;
                        const searchIconWidth = 50;
                        const gap = 8;
                        const scrollAreaWidth = scrollRect.width;
                        const centerOfScrollArea = searchIconWidth + gap + (scrollAreaWidth / 2);
                        const targetScrollLeft = elementOffsetInScroll - (centerOfScrollArea - searchIconWidth - gap) + (elementWidth / 2);
                        const maxScroll = stickyMenuScrollRef.current.scrollWidth - scrollRect.width;
                        stickyMenuScrollRef.current.scrollTo({ 
                          left: Math.max(0, Math.min(targetScrollLeft, maxScroll)), 
                          behavior: 'smooth' 
                        });
                      }
                      const stickySectionId = menu.toLowerCase().replace(/\s+/g, '-');
                      const stickySectionElement = document.getElementById(stickySectionId) || document.querySelector(`[data-section="${stickySectionId}"]`);
                      if (stickySectionElement && mainContainerRef.current) {
                        const containerRect = mainContainerRef.current.getBoundingClientRect();
                        const sectionRect = stickySectionElement.getBoundingClientRect();
                        const scrollTop = mainContainerRef.current.scrollTop;
                        const targetScrollTop = scrollTop + sectionRect.top - containerRect.top - 20;
                        mainContainerRef.current.scrollTo({
                          top: targetScrollTop,
                          behavior: 'smooth'
                        });
                      }
                    }, 0);
                  }}
                  style={{
                    fontSize: '16px',
                    color: selectedMenu === menu ? '#fff' : '#000',
                    backgroundColor: selectedMenu === menu ? '#000' : '#f3f4f6',
                    padding: '0 20px',
                    height: '50px',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: selectedMenu === menu ? '600' : '400',
                    transition: 'color 0.2s ease, background-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                >
                  {menu}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <div ref={mainContainerRef} className="bg-white" style={{ padding: '0 10px 10px 10px', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', paddingBottom: '100px', overflowY: 'auto', height: '100vh', backgroundColor: '#fff', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="max-w-md mx-auto bg-white" style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', position: 'relative', flex: 1, minHeight: 0, backgroundColor: '#fff', paddingBottom: '100px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0',
          gap: '10px',
          flexShrink: 0,
          margin: '0',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 10,
          height: '0',
          overflow: 'hidden'
        }}>
          <div 
            onClick={() => {
              setAddressPopupMode('address');
              setShowAddressPopup(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              cursor: 'pointer',
              flex: 1
            }}>
          </div>
        </div>
        <div 
          ref={sliderRef}
          style={{ 
            height: '230px', 
            borderRadius: '0',
            marginTop: '0',
            marginLeft: '-10px',
            marginRight: '-10px',
            marginBottom: '16px',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
            touchAction: 'pan-y',
            width: 'calc(100% + 20px)'
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            touchEndX.current = e.changedTouches[0].clientX;
            handleSwipe();
          }}
        >
          <div style={{
            display: 'flex',
            width: '300%',
            height: '100%',
            transform: `translateX(-${currentSlide * 33.333}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}>
            <div style={{ 
              width: '33.333%',
              height: '100%',
              position: 'relative'
            }}>
              <video
                ref={sliderVideoRef}
                autoPlay
                loop
                muted
                playsInline
                onEnded={(e) => {
                  e.currentTarget.play();
                }}
                onPause={(e) => {
                  e.currentTarget.play();
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              >
                <source src="https://github.com/mikail006/videoml/raw/refs/heads/main/Bringing%20flavors%20to%20life,%20one%20shot%20at%20a%20time.%20%F0%9F%8D%BD%EF%B8%8F%F0%9F%8E%A5%20%23FoodArt%20%23CulinaryStorytelling%20%23FoodVideogra.mp4" type="video/mp4" />
              </video>
              <div style={{
                position: 'absolute',
                left: '30px',
                bottom: '30px',
                color: '#fff'
              }}>
                <h1 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#fff',
                  margin: '0 0 8px 0'
                }}>
                  Doğal ve Taze
                </h1>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '400',
                  color: '#fff',
                  margin: 0
                }}>
                  Her ürün özenle seçilmiş malzemelerle günlük hazırlanır.
                </h3>
              </div>
            </div>
            <div style={{ 
              width: '33.333%',
              height: '100%',
              position: 'relative'
            }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                onEnded={(e) => {
                  e.currentTarget.play();
                }}
                onPause={(e) => {
                  e.currentTarget.play();
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              >
                <source src="https://github.com/mikail006/videoml/raw/refs/heads/main/1.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{ 
              width: '33.333%',
              height: '100%',
              backgroundImage: 'url(https://i.pinimg.com/736x/47/06/6c/47066ccfb40ce0b87e27828aa0760b42.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '500',
                  color: '#fff',
                  margin: '0 0 10px 0'
                }}>
                  HAMBURGER
                </h3>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#fff',
                  margin: 0
                }}>
                  Lezzetli Burger
                </h1>
              </div>
            </div>
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
                width: '20px',
                height: '2px',
                backgroundColor: currentSlide === 0 ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                borderRadius: '1px'
              }}
            ></div>
            <div 
              onClick={() => setCurrentSlide(1)}
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: currentSlide === 1 ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                borderRadius: '1px'
              }}
            ></div>
            <div 
              onClick={() => setCurrentSlide(2)}
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: currentSlide === 2 ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                borderRadius: '1px'
              }}
            ></div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          flexShrink: 0
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#000' }}>Kategoriler</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>Filtrele</span>
          </div>
        </div>
        <div 
          ref={menuContainerRef}
          data-categories-section
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
            flexShrink: 0
          }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            border: '2px solid #f3f4f6',
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
              gap: '8px',
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
            {['Kahvaltı', 'Çorba', 'Et ve Tavuk', 'Salatalar', 'Tatlı', 'İçecek', 'Kahve', 'Sandwich', 'Makarna', 'Balık'].map((menu) => (
              <span
                key={menu}
                data-menu={menu}
                onClick={() => {
                  const newSelectedMenu = menu;
                  setSelectedMenu(newSelectedMenu);
                  setTimeout(() => {
                    const menuElement = menuScrollRef.current?.querySelector(`[data-menu="${newSelectedMenu}"]`) as HTMLElement;
                    if (menuElement && menuScrollRef.current && menuContainerRef.current) {
                      const containerRect = menuContainerRef.current.getBoundingClientRect();
                      const scrollRect = menuScrollRef.current.getBoundingClientRect();
                      const elementRect = menuElement.getBoundingClientRect();
                      const currentScrollLeft = menuScrollRef.current.scrollLeft;
                      const elementOffsetInScroll = elementRect.left - scrollRect.left + currentScrollLeft;
                      const elementWidth = elementRect.width;
                      const containerWidth = containerRect.width;
                      const searchIconWidth = 50;
                      const gap = 8;
                      const scrollAreaWidth = scrollRect.width;
                      const centerOfScrollArea = searchIconWidth + gap + (scrollAreaWidth / 2);
                      const targetScrollLeft = elementOffsetInScroll - (centerOfScrollArea - searchIconWidth - gap) + (elementWidth / 2);
                      const maxScroll = menuScrollRef.current.scrollWidth - scrollRect.width;
                      menuScrollRef.current.scrollTo({ 
                        left: Math.max(0, Math.min(targetScrollLeft, maxScroll)), 
                        behavior: 'smooth' 
                      });
                    }
                    const sectionId = menu.toLowerCase().replace(/\s+/g, '-').replace('ve', 've');
                    const sectionElement = document.getElementById(sectionId) || document.querySelector(`[data-section="${sectionId}"]`);
                    if (sectionElement && mainContainerRef.current) {
                      const containerRect = mainContainerRef.current.getBoundingClientRect();
                      const sectionRect = sectionElement.getBoundingClientRect();
                      const scrollTop = mainContainerRef.current.scrollTop;
                      const targetScrollTop = scrollTop + sectionRect.top - containerRect.top - 20;
                      mainContainerRef.current.scrollTo({
                        top: targetScrollTop,
                        behavior: 'smooth'
                      });
                    }
                    const normalSectionId = menu.toLowerCase().replace(/\s+/g, '-').replace('ve', 've');
                    const normalSectionElement = document.getElementById(normalSectionId) || document.querySelector(`[data-section="${normalSectionId}"]`);
                    if (normalSectionElement && mainContainerRef.current) {
                      const containerRect = mainContainerRef.current.getBoundingClientRect();
                      const sectionRect = normalSectionElement.getBoundingClientRect();
                      const scrollTop = mainContainerRef.current.scrollTop;
                      const targetScrollTop = scrollTop + sectionRect.top - containerRect.top - 20;
                      mainContainerRef.current.scrollTo({
                        top: targetScrollTop,
                        behavior: 'smooth'
                      });
                    }
                  }, 0);
                }}
                style={{
                  fontSize: '16px',
                  color: selectedMenu === menu ? '#fff' : '#000',
                  backgroundColor: selectedMenu === menu ? '#000' : '#f3f4f6',
                  padding: '0 20px',
                  height: '50px',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: selectedMenu === menu ? '600' : '400',
                  transition: 'color 0.2s ease, background-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
              >
                {menu}
              </span>
            ))}
          </div>
        </div>
        <div style={{
          marginBottom: '16px',
          flexShrink: 0
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#000',
            marginBottom: '12px'
          }}>
            Şefin Seçimi
          </h2>
          <div style={{
            height: '210px',
            backgroundColor: '#f3f4f6',
            borderRadius: '20px',
            padding: '10px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            display: 'flex',
            gap: '10px'
          }}>
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div style={{
              width: '180px',
              height: '190px',
              backgroundColor: 'transparent',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <video
                ref={cardVideoRef}
                autoPlay
                loop
                muted
                playsInline
                onEnded={(e) => {
                  e.currentTarget.play();
                }}
                onPause={(e) => {
                  e.currentTarget.play();
                }}
                style={{
                  width: '100%',
                  height: '84px',
                  objectFit: 'cover',
                  flexShrink: 0,
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px'
                }}
              >
                <source src="https://github.com/mikail006/videoml/raw/refs/heads/main/Bringing%20flavors%20to%20life,%20one%20shot%20at%20a%20time.%20%F0%9F%8D%BD%EF%B8%8F%F0%9F%8E%A5%20%23FoodArt%20%23CulinaryStorytelling%20%23FoodVideogra.mp4" type="video/mp4" />
              </video>
              <div style={{
                padding: '8px 12px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0
              }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: '0 0 5px 0',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  Dürüm
                </h3>
                <p style={{
                  fontSize: '13px',
                  margin: '0 0 7px 0',
                  color: '#A2A2A2',
                  lineHeight: '1.2'
                }}>
                  Domates, turşu, soğan, marul
                </p>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  399,00 TL
                </div>
              </div>
            </div>
            <div style={{
              width: '180px',
              height: '190px',
              backgroundColor: 'transparent',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <img
                src="https://i.pinimg.com/736x/e9/b8/b8/e9b8b80e371b09eb1fe826cd50d9fb8a.jpg"
                alt="Kokoreç"
                style={{
                  width: '100%',
                  height: '84px',
                  objectFit: 'cover',
                  flexShrink: 0,
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px'
                }}
              />
              <div style={{
                padding: '8px 12px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0
              }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: '0 0 5px 0',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  Kokoreç
                </h3>
                <p style={{
                  fontSize: '13px',
                  margin: '0 0 7px 0',
                  color: '#A2A2A2',
                  lineHeight: '1.2'
                }}>
                  Soğan, maydanoz, baharat
                </p>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  299,00 TL
                </div>
              </div>
            </div>
            <div style={{
              width: '180px',
              height: '190px',
              backgroundColor: 'transparent',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <img
                src="https://i.pinimg.com/1200x/f7/90/e8/f790e80e420556ae58def8563c5adbd0.jpg"
                alt="Lahmacun"
                style={{
                  width: '100%',
                  height: '84px',
                  objectFit: 'cover',
                  flexShrink: 0,
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px'
                }}
              />
              <div style={{
                padding: '8px 12px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0
              }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: '0 0 5px 0',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  Lahmacun
                </h3>
                <p style={{
                  fontSize: '13px',
                  margin: '0 0 7px 0',
                  color: '#A2A2A2',
                  lineHeight: '1.2'
                }}>
                  Kıyma, soğan, domates, biber
                </p>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  149,00 TL
                </div>
              </div>
            </div>
            <div style={{
              width: '180px',
              height: '190px',
              backgroundColor: 'transparent',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <img
                src="https://i.pinimg.com/1200x/4e/8b/0e/4e8b0ec1b0fa6d8360b796e7e3e6092e.jpg"
                alt="Pizza"
                style={{
                  width: '100%',
                  height: '84px',
                  objectFit: 'cover',
                  flexShrink: 0,
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px'
                }}
              />
              <div style={{
                padding: '8px 12px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0
              }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: '0 0 5px 0',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  Pizza
                </h3>
                <p style={{
                  fontSize: '13px',
                  margin: '0 0 7px 0',
                  color: '#A2A2A2',
                  lineHeight: '1.2'
                }}>
                  Peynir, domates, zeytin
                </p>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  449,00 TL
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          marginBottom: '31px',
          flexShrink: 0
        }}>
          <h2 
            id="kahvaltı"
            data-section="kahvaltı"
            style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#000',
              marginBottom: '12px'
            }}>
            Kahvaltı
          </h2>
          <div style={{
            backgroundColor: 'transparent',
            borderRadius: '20px',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '100px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: '0 0 4px 0',
                  color: '#000'
                }}>
                  Menemen
                </h3>
                <p style={{
                  fontSize: '13px',
                  margin: '0 0 4px 0',
                  color: '#A2A2A2'
                }}>
                  Yumurta, domates, biber, soğan
                </p>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000'
                }}>
                  89,00 TL
                </div>
              </div>
              <video
                autoPlay
                loop
                muted
                playsInline
                onEnded={(e) => {
                  e.currentTarget.play();
                }}
                onPause={(e) => {
                  e.currentTarget.play();
                }}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  flexShrink: 0
                }}
              >
                <source src="https://github.com/mikail006/videoml/raw/refs/heads/main/1.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: '0 0 4px 0',
                  color: '#000'
                }}>
                  Omlet
                </h3>
                <p style={{
                  fontSize: '13px',
                  margin: '0 0 4px 0',
                  color: '#A2A2A2'
                }}>
                  Yumurta, peynir, domates
                </p>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000'
                }}>
                  79,00 TL
                </div>
              </div>
              <img
                src="https://i.pinimg.com/736x/e9/b8/b8/e9b8b80e371b09eb1fe826cd50d9fb8a.jpg"
                alt="Omlet"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  flexShrink: 0
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: '0 0 4px 0',
                  color: '#000'
                }}>
                  Sucuklu Yumurta
                </h3>
                <p style={{
                  fontSize: '13px',
                  margin: '0 0 4px 0',
                  color: '#A2A2A2'
                }}>
                  Yumurta, sucuk, domates
                </p>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000'
                }}>
                  99,00 TL
                </div>
              </div>
              <img
                src="https://i.pinimg.com/1200x/f7/90/e8/f790e80e420556ae58def8563c5adbd0.jpg"
                alt="Sucuklu Yumurta"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  flexShrink: 0
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: '0 0 4px 0',
                  color: '#000'
                }}>
                  Kaşarlı Tost
                </h3>
                <p style={{
                  fontSize: '13px',
                  margin: '0 0 4px 0',
                  color: '#A2A2A2'
                }}>
                  Ekmek, kaşar peyniri, domates
                </p>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000'
                }}>
                  69,00 TL
                </div>
              </div>
              <img
                src="https://i.pinimg.com/1200x/4e/8b/0e/4e8b0ec1b0fa6d8360b796e7e3e6092e.jpg"
                alt="Kaşarlı Tost"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  flexShrink: 0
                }}
              />
            </div>
          </div>
        </div>
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(229, 231, 235, 0.5)',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '12px 0',
          zIndex: 1000
        }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <Home size={24} color="black" />
          <span style={{ fontSize: '12px', color: '#000' }}>Anasayfa</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          <span style={{ fontSize: '12px', color: '#000' }}>Keşfet</span>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>
              <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
              <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
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
          <div style={{ position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 0 1-8 0"/>
              <path d="M3.103 6.034h17.794"/>
              <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>
            </svg>
            <div style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#ff4444'
            }}></div>
          </div>
          <span style={{ fontSize: '12px', color: '#000' }}>Sepet</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="10" r="3"/>
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
          </svg>
          <span style={{ fontSize: '12px', color: '#000' }}>Profil</span>
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

