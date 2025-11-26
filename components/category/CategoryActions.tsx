"use client";

import CategoryIconButton from "./CategoryIconButton";
import styles from "../../styles/category.module.css";

type CategoryActionsProps = {
  categoryId: string;
  isEditing?: boolean;
  onEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onSave?: () => void;
  onSaveMouseDown?: () => void;
};

export default function CategoryActions({ categoryId, isEditing = false, onEdit, onToggle, onDelete, onSave, onSaveMouseDown }: CategoryActionsProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) {
      e.preventDefault();
      if (onSaveMouseDown) {
        onSaveMouseDown();
      }
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isEditing) {
      if (onSave) {
        onSave();
      }
    } else {
      onEdit();
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <div className={styles.catActions}>
      <CategoryIconButton
        type="edit"
        onClick={handleEdit}
        onMouseDown={handleMouseDown}
        icon={
          isEditing ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7L9.00004 18L3.99994 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        }
      />
      <CategoryIconButton
        type="view"
        onClick={handleToggle}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />
      <CategoryIconButton
        type="delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6M18 6H15M18 6H20M6 6H4M6 6H9M15 6V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V6M15 6H9" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />
    </div>
  );
}

