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

  return (
    <div className={styles.menuItemCard}>
      <div className={styles.menuItemContent}>
        <div className={styles.menuItemLeft}>
          {item.image ? (
            <img src={item.image} alt={item.name} className={styles.menuItemImage} />
          ) : (
            <div className={styles.menuItemImage}></div>
          )}
          <div className={styles.menuItemInfo}>
            <div className={styles.menuItemNameWrapper}>
              <h4 className={styles.menuItemName}>{item.name}</h4>
            </div>
            <p className={styles.menuItemPrice}>
              {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.price)} TL
            </p>
          </div>
        </div>
        <MenuItemActions
          itemId={item.id}
          categoryId={categoryId}
          onEdit={() => onStartEdit(item.id)}
          onToggleAvailability={() => onToggleAvailability(categoryId, item.id)}
          onDelete={() => onDeleteItem(categoryId, item.id)}
        />
      </div>
    </div>
  );
}

