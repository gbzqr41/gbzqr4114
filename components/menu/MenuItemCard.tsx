"use client";

import { useState } from "react";
import type { MenuItem } from "../dashboard/SidebarEditor";
import MenuItemActions from "./MenuItemActions";
import styles from "../../styles/menu.module.css";

type MenuItemCardProps = {
  item: MenuItem;
  categoryId: string;
  editingItemId: string | null;
  editingItem: { [key: string]: { name: string; description: string; price: number } };
  onUpdateItem: (categoryId: string, itemId: string, updates: Partial<MenuItem>) => void;
  onDeleteItem: (categoryId: string, itemId: string) => void;
  onToggleAvailability: (categoryId: string, itemId: string) => void;
  onStartEdit: (itemId: string) => void;
  onView?: () => void;
};

export default function MenuItemCard({
  item,
  categoryId,
  editingItemId,
  editingItem,
  onUpdateItem,
  onDeleteItem,
  onToggleAvailability,
  onStartEdit,
  onView,
}: MenuItemCardProps) {
  const isEditing = editingItemId === item.id;

  if (isEditing) {
    return (
      <div className={styles.menuItemCard}>
        <div className={styles.menuItemEdit}>
          <input
            type="text"
            value={editingItem[item.id]?.name ?? item.name}
            onChange={(e) => {
              onUpdateItem(categoryId, item.id, { name: e.target.value });
            }}
            onBlur={(e) => onUpdateItem(categoryId, item.id, { name: e.target.value })}
            className={styles.menuItemEditInput}
            placeholder="Item name"
          />
          <textarea
            value={editingItem[item.id]?.description ?? item.description ?? ""}
            onChange={(e) => {
              onUpdateItem(categoryId, item.id, { description: e.target.value });
            }}
            onBlur={(e) => onUpdateItem(categoryId, item.id, { description: e.target.value })}
            className={styles.menuItemEditTextarea}
            placeholder="Description"
            rows={2}
          />
          <input
            type="number"
            value={editingItem[item.id]?.price ?? item.price}
            onChange={(e) => {
              onUpdateItem(categoryId, item.id, { price: parseFloat(e.target.value) || 0 });
            }}
            onBlur={(e) => onUpdateItem(categoryId, item.id, { price: parseFloat(e.target.value) || 0 })}
            className={styles.menuItemEditInput}
            placeholder="Price"
            step="0.01"
          />
          <div className={styles.menuItemEditActions}>
            <button
              onClick={() => {
                onStartEdit("");
              }}
              className={styles.menuItemEditSave}
            >
              Save
            </button>
            <button
              onClick={() => {
                onDeleteItem(categoryId, item.id);
                onStartEdit("");
              }}
              className={styles.menuItemEditDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  const shouldAnimate = (item as any).animate === true;
  const isDeleting = (item as any).deleting === true;

  return (
    <div 
      className={`${styles.menuItemCard} ${shouldAnimate ? styles.menuItemCardAnimate : ''} ${isDeleting ? styles.menuItemCardExit : ''}`}
      onClick={() => {
        if (onView) {
          onView();
        }
      }}
      style={{ cursor: onView ? 'pointer' : 'default' }}
    >
      <div className={styles.menuItemContent}>
        <div className={styles.menuItemLeft}>
          <div className={styles.menuItemInfo}>
            <h4 className={styles.menuItemName}>{item.name}</h4>
            <p className={styles.menuItemPrice}>
              {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.price)} TL
            </p>
          </div>
        </div>
        <div className={styles.menuItemRight}>
          {item.image && (
            <img src={item.image} alt={item.name} className={styles.menuItemImage} />
          )}
        </div>
      </div>
    </div>
  );
}

