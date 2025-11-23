"use client";

import { useEffect } from "react";
import type { MenuItem } from "../dashboard/SidebarEditor";
import styles from "../../styles/menuViewModal.module.css";

type MenuItemViewModalProps = {
  item: MenuItem;
  categoryId: string;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleAvailability: () => void;
};

export default function MenuItemViewModal({
  item,
  categoryId,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onToggleAvailability,
}: MenuItemViewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      
      window.addEventListener("keydown", handleEscape);
      
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTopButtons}>
          <button className={styles.modalTopButton} onClick={onEdit}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.modalTopButton} onClick={onDelete}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6M18 6H15M18 6H20M6 6H4M6 6H9M15 6V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V6M15 6H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.modalTopButton} onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.modalImageSection}>
            {item.image ? (
              <img src={item.image} alt={item.name} className={styles.modalImage} />
            ) : (
              <div className={styles.modalImagePlaceholder}></div>
            )}
          </div>

          <div className={styles.modalInfoSection}>
            <h3 className={styles.modalName}>{item.name}</h3>
            {item.description && (
              <p className={styles.modalDescription}>{item.description}</p>
            )}
            
            <div className={styles.modalDetails}>
              {(item as any).portion && (
                <div className={styles.modalDetailItem}>
                  <span className={styles.modalDetailLabel}>Gramaj:</span>
                  <span className={styles.modalDetailValue}>{(item as any).portion}</span>
                </div>
              )}
              {(item as any).allergens && (item as any).allergens.length > 0 && (
                <div className={styles.modalDetailItem}>
                  <span className={styles.modalDetailLabel}>Alerjenler:</span>
                  <div className={styles.modalDetailTags}>
                    {((item as any).allergens as string[]).map((allergen, index) => (
                      <span key={index} className={styles.modalDetailTag}>{allergen}</span>
                    ))}
                  </div>
                </div>
              )}
              {(item as any).variations && (item as any).variations.length > 0 && (
                <div className={styles.modalDetailItem}>
                  <span className={styles.modalDetailLabel}>Varyasyonlar:</span>
                  <div className={styles.modalDetailVariations}>
                    {((item as any).variations as Array<{ name: string; extraPrice: number }>).map((variation, index) => (
                      <div key={index} className={styles.modalDetailVariation}>
                        <span>{variation.name}</span>
                        <span className={styles.modalDetailVariationPrice}>
                          +{new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(variation.extraPrice)} TL
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

