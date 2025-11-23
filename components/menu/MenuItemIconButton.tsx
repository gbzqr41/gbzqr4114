"use client";

import styles from "../../styles/menu.module.css";

type MenuItemIconButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  type?: 'edit' | 'view' | 'delete';
};

export default function MenuItemIconButton({ onClick, icon, type = 'edit' }: MenuItemIconButtonProps) {
  const typeClass = type === 'edit' ? styles.menuIconBtnEdit : type === 'view' ? styles.menuIconBtnView : styles.menuIconBtnDelete;
  const buttonClass = `${styles.menuIconBtn} ${typeClass}`;
  
  return (
    <button
      onClick={onClick}
      className={buttonClass}
    >
      {icon}
    </button>
  );
}

