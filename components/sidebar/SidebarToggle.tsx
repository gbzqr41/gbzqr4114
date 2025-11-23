"use client";

import styles from "../../styles/sidebar.module.css";

type SidebarToggleProps = {
  onClick: () => void;
};

export default function SidebarToggle({ onClick }: SidebarToggleProps) {
  return (
    <button
      onClick={onClick}
      className={styles.sideToggle}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12L20 12M4 12L10 6M4 12L10 18" stroke="rgb(96, 96, 96)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

