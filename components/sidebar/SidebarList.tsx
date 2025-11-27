"use client";

import React, { useState, useEffect, useRef } from "react";
import SidebarItem from "./SidebarItem";
import styles from "../../styles/sidebar.module.css";

type SidebarListProps = {
  activeItem?: string;
  onItemClick?: (item: string) => void;
};

export default function SidebarList({ activeItem = "QR Menü", onItemClick }: SidebarListProps) {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const profilePopupRef = useRef<HTMLDivElement>(null);
  const profileSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profilePopupRef.current &&
        profileSectionRef.current &&
        !profilePopupRef.current.contains(event.target as Node) &&
        !profileSectionRef.current.contains(event.target as Node)
      ) {
        setIsProfilePopupOpen(false);
      }
    };

    if (isProfilePopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfilePopupOpen]);

  const getIcon = (label: string, defaultIcon: React.ReactNode) => {
    const isActive = activeItem === label;
    const strokeWidth = isActive ? "2" : "1.5";
    
    if (!React.isValidElement(defaultIcon)) return defaultIcon;
    
    return React.cloneElement(defaultIcon as React.ReactElement<any>, {
      children: React.Children.map((defaultIcon as React.ReactElement<any>).props.children, (child: any) => {
        if (React.isValidElement(child) && child.type === 'path') {
          const props = (child as React.ReactElement<any>).props || {};
          return React.cloneElement(child as React.ReactElement<any>, {
            ...props,
            strokeWidth: strokeWidth
          } as any);
        }
        return child;
      })
    });
  };

  const mainItems = [
    { label: "Pano", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 20.5L3.5 13.5L20.5 13.5V20.5H3.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.5 10.5L3.5 3.5L20.5 3.5V10.5L3.5 10.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { label: "Sipariş", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8H17.1597C18.1999 8 19.0664 8.79732 19.1528 9.83391L19.8195 17.8339C19.9167 18.9999 18.9965 20 17.8264 20H6.1736C5.00352 20 4.08334 18.9999 4.18051 17.8339L4.84718 9.83391C4.93356 8.79732 5.80009 8 6.84027 8H8M16 8H8M16 8L16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7L8 8M16 8L16 12M8 8L8 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { label: "QR Menü", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3H9V9H3V3Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 3H21V9H15V3Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 15H9V21H3V15Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 15H16M18 15H19M16 19H19V16H16V19Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { label: "Ürün", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 18V6H8L2.70711 11.2929C2.31658 11.6834 2.31658 12.3166 2.70711 12.7071L8 18H21Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12C12 13.1046 11.1046 14 10 14C8.89543 14 8 13.1046 8 12C8 10.8954 8.89543 10 10 10C11.1046 10 12 10.8954 12 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { label: "İstatistik", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 11V17M12 7L12 17M8 14L8 17M4 4H20V20H4V4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { label: "Rezervasyon", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 11V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V11M20 11V7C20 5.89543 19.1046 5 18 5H15M20 11H4M15 3V5M15 7V5M9 3V5M9 7V5M4 11V7C4 5.89543 4.89543 5 6 5H9M15 5H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { label: "Müşteriler", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 18.7083C18 17.0886 16.8283 15 15 15H9C7.17172 15 6 17.0886 6 18.7083M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
  ];

  const bottomItems = [
    { label: "Geri Bildirim", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17L6 20L7.5 14L3 9L9.5 8.5L12 3L14.5 8.5L21 9L16.5 14L18 20L12 17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { label: "Ayarlar", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17V16.9929M9.13733 9C9.51961 7.84083 10.6567 7 12 7C13.6568 7 15 8.27919 15 9.85714C15 12.106 12.5726 11.7539 12.0848 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { label: "Yardım", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.10863 14.1079L3.76461 15.7639C4.02858 16.0413 4.38552 16.2119 4.76752 16.2431C5.84479 16.3311 7.91395 15.0073 8.44327 14.1917C8.8559 13.5559 8.69631 12.6629 8.69702 11.9465C10.8675 11.3476 13.1582 11.3453 15.3275 11.9399C15.3268 12.6563 15.1654 13.5497 15.5768 14.1847C16.1037 14.9979 18.1615 16.3114 19.2367 16.2294C19.6149 16.2006 19.97 16.0352 20.2357 15.7642L21.895 14.1049C22.5266 13.4721 22.4856 12.3791 21.7923 11.8009C16.3175 6.31749 7.7222 6.27776 2.21038 11.7982C1.51362 12.3797 1.47304 13.4775 2.10863 14.1079Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
  ];

  return (
    <>
      <div className={styles.sideList}>
        {mainItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={getIcon(item.label, item.icon)}
            isActive={activeItem === item.label}
            onClick={() => onItemClick?.(item.label)}
          />
        ))}
      </div>
      <div className={styles.sideListBottom}>
        {bottomItems.map((item) => (
          <div key={item.label} className={item.label === "Geri Bildirim" ? styles.sideItemFeedback : ""}>
            <SidebarItem
              label={item.label}
              icon={getIcon(item.label, item.icon)}
              isActive={activeItem === item.label}
              onClick={() => onItemClick?.(item.label)}
              badge={item.label === "Geri Bildirim" ? 1 : undefined}
            />
          </div>
        ))}
        <div className={styles.sideUser}>
          <div
            ref={profileSectionRef}
            onClick={() => setIsProfilePopupOpen(!isProfilePopupOpen)}
            className={styles.sideUserSection}
          >
            <div className={styles.sideUserAvatar}></div>
            <div className={styles.sideUserInfo}>
              <div className={styles.sideUserName}>Ahmet Özcan</div>
              <div className={styles.sideUserTitle}>Yönetici</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 'auto', flexShrink: 0 }}>
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {isProfilePopupOpen && (
            <div ref={profilePopupRef} className={styles.sideUserPopup}>
              <div className={styles.sideUserPopupTop}>
                <div className={styles.sideUserPopupAvatar}></div>
                <div className={styles.sideUserPopupInfo}>
                  <div className={styles.sideUserPopupName}>Ahmet Özcan</div>
                  <div className={styles.sideUserPopupTitle}>Yönetici</div>
                </div>
              </div>
              <div className={styles.sideUserPopupUpgrade}>
                <div className={styles.sideUserPopupUpgradeText}>7 gün ücretsiz deneme</div>
              </div>
              <div className={styles.sideUserPopupMenu}>
                <div className={styles.sideUserPopupItem}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                    <path d="M18 18.7083C18 17.0886 16.8283 15 15 15H9C7.17172 15 6 17.0886 6 18.7083M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Profil
                </div>
                <div className={styles.sideUserPopupItem}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                    <path d="M3 17C10.952 18.6176 16.6829 8.75775 11 3C16.0007 3.13144 20 7.11149 20 12C20 16.9715 16.1188 21 11 21C7.77111 21 4.65938 19.4319 3 17Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Karanlık Mod
                </div>
                <div className={styles.sideUserPopupItem}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                    <path d="M4 12L20 12M4 12L10 6M4 12L10 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Çıkış Yap
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

