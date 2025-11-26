"use client";

import React from "react";
import styles from "../../styles/sidebar.module.css";

type SidebarItemProps = {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  badge?: number;
};

export default function SidebarItem({ label, icon, isActive = false, onClick, badge }: SidebarItemProps) {
  return (
    <div
      className={`${styles.sideItem} ${isActive ? styles.sideItemActive : ""}`}
      onClick={onClick}
    >
      <div className={styles.sideItemIcon}>{icon}</div>
      <span className={styles.sideItemLabel}>{label}</span>
      {badge !== undefined && (
        <div className={styles.sideItemBadge}></div>
      )}
    </div>
  );
}

