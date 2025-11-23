"use client";

import styles from "../../styles/category.module.css";

type CategoryAddButtonProps = {
  onClick: () => void;
  variant?: "empty-state" | "header";
};

export default function CategoryAddButton({ onClick, variant = "header" }: CategoryAddButtonProps) {
  if (variant === "empty-state") {
    return (
      <button
        onClick={onClick}
        className={styles.catAddBtnEmpty}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7V17M7 12H17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={styles.catAddBtnHeader}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 7V17M7 12H17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

