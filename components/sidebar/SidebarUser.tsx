"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../../styles/sidebar.module.css";

export default function SidebarUser() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const userSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        userSectionRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !userSectionRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <div className={styles.sideUser}>
      <div
        ref={userSectionRef}
        onClick={() => setIsPopupOpen(!isPopupOpen)}
        className={styles.sideUserSection}
      >
        <div className={styles.sideUserAvatar}></div>
        <div className={styles.sideUserInfo}>
          <div className={styles.sideUserName}>Ahmet AKAT</div>
          <div className={styles.sideUserTitle}>Ünvan</div>
        </div>
      </div>
      {isPopupOpen && (
        <div ref={popupRef} className={styles.sideUserPopup}>
          <div className={styles.sideUserPopupItem}>Profile</div>
          <div className={styles.sideUserPopupItem}>Settings</div>
          <div className={styles.sideUserPopupItem}>Logout</div>
        </div>
      )}
    </div>
  );
}

