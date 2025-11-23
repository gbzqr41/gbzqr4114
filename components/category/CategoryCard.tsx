"use client";

import CategoryBadge from "./CategoryBadge";
import CategoryActions from "./CategoryActions";
import styles from "../../styles/category.module.css";
import type { Category } from "../dashboard/SidebarEditor";

type CategoryCardProps = {
  category: Category;
  index: number;
  editingCategoryId: string | null;
  editingCategoryName: { [key: string]: string };
  categoryOpenStates: { [key: string]: boolean };
  onEditCategory: (categoryId: string, name: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onToggleOpen: (categoryId: string) => void;
  onStartEdit: (categoryId: string) => void;
  onUpdateCategoryName: (categoryId: string, name: string) => void;
  children: React.ReactNode;
};

export default function CategoryCard({
  category,
  index,
  editingCategoryId,
  editingCategoryName,
  categoryOpenStates,
  onEditCategory,
  onDeleteCategory,
  onToggleOpen,
  onStartEdit,
  onUpdateCategoryName,
  children,
}: CategoryCardProps) {
  const MAX_CATEGORY_TITLE = 30;
  const displayName = category.name.length > MAX_CATEGORY_TITLE ? category.name.slice(0, MAX_CATEGORY_TITLE) + "..." : category.name;
  
  const isEditing = editingCategoryId === category.id;
  const shouldAnimate = category.animate === true;
  const isDeleting = category.deleting === true;

  return (
    <div className={`${styles.catCard} ${shouldAnimate ? styles.catCardAnimate : ''} ${isDeleting ? styles.catCardExit : ''}`}>
      <div className={styles.catCardHeader}>
        {isEditing ? (
          <div className={styles.catCardInputWrapper}>
            <input
              type="text"
              value={editingCategoryName[category.id] ?? category.name}
              onChange={(e) => {
                onUpdateCategoryName(category.id, e.target.value);
              }}
              onBlur={(e) => {
                onEditCategory(category.id, e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onEditCategory(category.id, e.currentTarget.value);
                }
              }}
              className={styles.catCardInput}
              maxLength={MAX_CATEGORY_TITLE}
              autoFocus
            />
            <button
              className={styles.catCardInputClear}
              onClick={() => {
                onUpdateCategoryName(category.id, "");
              }}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className={styles.catCardTitleWrapper}>
            <CategoryBadge index={index} />
            <h3
              className={styles.catCardTitle}
              onClick={() => {
                onToggleOpen(category.id);
              }}
            >
              {displayName}
            </h3>
          </div>
        )}
        <CategoryActions
          categoryId={category.id}
          onEdit={() => onStartEdit(category.id)}
          onToggle={() => onToggleOpen(category.id)}
          onDelete={() => onDeleteCategory(category.id)}
        />
      </div>
      <div className={`${styles.catCardContent} ${(categoryOpenStates[category.id] ?? true) ? '' : styles.catCardContentClosed}`}>
        {children}
      </div>
    </div>
  );
}
