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
  const isEditing = editingCategoryId === category.id;
  const shouldAnimate = category.animate === true;
  const isDeleting = category.deleting === true;

  return (
    <div className={`${styles.catCard} ${shouldAnimate ? styles.catCardAnimate : ''} ${isDeleting ? styles.catCardExit : ''}`}>
      <div className={styles.catCardHeader}>
        {isEditing ? (
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
            autoFocus
          />
        ) : (
          <div className={styles.catCardTitleWrapper}>
            <CategoryBadge index={index} />
            <h3
              className={styles.catCardTitle}
              onClick={(e) => {
                if (e.detail === 2) {
                  onStartEdit(category.id);
                } else {
                  onToggleOpen(category.id);
                }
              }}
            >
              {category.name}
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
      {children}
    </div>
  );
}
