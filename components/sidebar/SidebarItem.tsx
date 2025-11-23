"use client";

import styles from "../../styles/sidebar.module.css";

type SidebarItemProps = {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

export default function SidebarItem({ label, icon, isActive = false, onClick }: SidebarItemProps) {
  return (
    <div
      className={`${styles.sideItem} ${isActive ? styles.sideItemActive : ""}`}
      onClick={onClick}
    >
      <div className={styles.sideItemIcon}>{icon}</div>
      <span className={styles.sideItemLabel}>{label}</span>
    </div>
  );
}

