"use client";

import styles from "../../styles/category.module.css";

type CategoryIconButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  type?: 'edit' | 'view' | 'delete';
};

export default function CategoryIconButton({ onClick, onMouseDown, icon, type = 'edit' }: CategoryIconButtonProps) {
  const typeClass = type === 'edit' ? styles.catIconBtnEdit : type === 'view' ? styles.catIconBtnView : styles.catIconBtnDelete;
  const buttonClass = `${styles.catIconBtn} ${typeClass}`;
  
  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      className={buttonClass}
    >
      {icon}
    </button>
  );
}

