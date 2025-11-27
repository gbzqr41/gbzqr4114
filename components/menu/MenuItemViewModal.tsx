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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.modalTopButton} onClick={onDelete}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6M18 6H15M18 6H20M6 6H4M6 6H9M15 6V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V6M15 6H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.modalTopButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 className={styles.modalName}>{item.name}</h3>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#000' }}>
                {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.price)} TL
              </span>
            </div>
            
            <p className={styles.modalDescription}>
              {item.description || "Dürüm ile ilgili açıklama"}
            </p>
            
            <div style={{ marginTop: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>İçindekiler</span>
            </div>
            
            <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>30dk.</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>400</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>-</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>kcal</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>-</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>g</span>
                <span style={{ fontSize: '14px', color: '#666' }}>200gram için</span>
              </div>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#000', marginBottom: '8px' }}>Zorunlu Seçim</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontSize: '14px' }}>Küçük boy L</div>
                <div style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontSize: '14px' }}>Büyük boy XL</div>
                <div style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontSize: '14px' }}>Mega Boy XXL</div>
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#000', marginBottom: '12px' }}>
                Önerilen Ürünler
                <span style={{ fontSize: '12px', fontWeight: '400', color: '#666', marginLeft: '8px' }}>Yanında iyi gider</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '12px', minHeight: '80px' }}></div>
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '12px', minHeight: '80px' }}></div>
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '12px', minHeight: '80px' }}></div>
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '12px', minHeight: '80px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

