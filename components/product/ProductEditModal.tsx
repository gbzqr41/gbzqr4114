"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/productModal.module.css";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  image?: string;
  portion?: string;
  allergens?: string[];
  variations?: Array<{ name: string; extraPrice: number }>;
};

type ProductEditModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => void;
};

export default function ProductEditModal({ product, isOpen, onClose, onSave }: ProductEditModalProps) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    portion: product.portion || "",
    description: product.description || "",
    image: product.image || "",
    allergens: product.allergens || [],
    variations: product.variations || [],
  });

  const [newAllergen, setNewAllergen] = useState("");
  const [newVariation, setNewVariation] = useState({ name: "", extraPrice: 0 });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: product.name,
        price: product.price,
        portion: product.portion || "",
        description: product.description || "",
        image: product.image || "",
        allergens: product.allergens || [],
        variations: product.variations || [],
      });
    }
  }, [isOpen, product]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleAddAllergen = () => {
    if (newAllergen.trim()) {
      setFormData({
        ...formData,
        allergens: [...formData.allergens, newAllergen.trim()],
      });
      setNewAllergen("");
    }
  };

  const handleRemoveAllergen = (index: number) => {
    setFormData({
      ...formData,
      allergens: formData.allergens.filter((_, i) => i !== index),
    });
  };

  const handleAddVariation = () => {
    if (newVariation.name.trim()) {
      setFormData({
        ...formData,
        variations: [...formData.variations, { ...newVariation }],
      });
      setNewVariation({ name: "", extraPrice: 0 });
    }
  };

  const handleRemoveVariation = (index: number) => {
    setFormData({
      ...formData,
      variations: formData.variations.filter((_, i) => i !== index),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Ürün Düzenle</h2>
            <button className={styles.closeButton} onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.modalBody}>
            {/* Product Image */}
            <div className={styles.formSection}>
              <label className={styles.label}>Ürün Görseli</label>
              <div className={styles.imageSection}>
                <div className={styles.imagePreview}>
                  {formData.image ? (
                    <img src={formData.image} alt="Product" className={styles.image} />
                  ) : (
                    <div className={styles.imagePlaceholder}>120×120</div>
                  )}
                </div>
                <div className={styles.imageActions}>
                  <label className={styles.uploadButton}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className={styles.fileInput} />
                    Yükle
                  </label>
                  {formData.image && (
                    <button className={styles.replaceButton} onClick={() => setFormData({ ...formData, image: "" })}>
                      Değiştir
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Product Name */}
            <div className={styles.formSection}>
              <label className={styles.label}>Ürün Adı</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={styles.textInput}
                placeholder="Ürün adını girin"
              />
            </div>

            {/* Price */}
            <div className={styles.formSection}>
              <label className={styles.label}>Fiyat</label>
              <div className={styles.priceInputWrapper}>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className={styles.numberInput}
                  placeholder="150"
                />
                <span className={styles.currency}>TL</span>
              </div>
            </div>

            {/* Portion / Gramaj */}
            <div className={styles.formSection}>
              <label className={styles.label}>Porsiyon / Gramaj</label>
              <div className={styles.portionInputWrapper}>
                <input
                  type="number"
                  value={formData.portion.replace(/\s*g$/, "")}
                  onChange={(e) => setFormData({ ...formData, portion: e.target.value ? `${e.target.value} g` : "" })}
                  className={styles.numberInput}
                  placeholder="125"
                />
                <span className={styles.unit}>g</span>
              </div>
            </div>

            {/* Allergens */}
            <div className={styles.formSection}>
              <label className={styles.label}>Alerjenler</label>
              <div className={styles.allergenTags}>
                {formData.allergens.map((allergen, index) => (
                  <div key={index} className={styles.tag}>
                    <span>{allergen}</span>
                    <button
                      className={styles.tagRemove}
                      onClick={() => handleRemoveAllergen(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.addAllergenWrapper}>
                <input
                  type="text"
                  value={newAllergen}
                  onChange={(e) => setNewAllergen(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddAllergen()}
                  className={styles.textInput}
                  placeholder="Yeni alerjen ekle"
                />
                <button className={styles.addButton} onClick={handleAddAllergen}>
                  Ekle
                </button>
              </div>
            </div>

            {/* Variations */}
            <div className={styles.formSection}>
              <label className={styles.label}>Varyasyonlar</label>
              <div className={styles.variationsList}>
                {formData.variations.map((variation, index) => (
                  <div key={index} className={styles.variationItem}>
                    <div className={styles.variationContent}>
                      <span className={styles.variationName}>{variation.name}</span>
                      <span className={styles.variationPrice}>+{variation.extraPrice} TL</span>
                    </div>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleRemoveVariation(index)}
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.addVariationWrapper}>
                <input
                  type="text"
                  value={newVariation.name}
                  onChange={(e) => setNewVariation({ ...newVariation, name: e.target.value })}
                  className={styles.textInput}
                  placeholder="Varyasyon adı"
                />
                <input
                  type="number"
                  value={newVariation.extraPrice}
                  onChange={(e) => setNewVariation({ ...newVariation, extraPrice: parseFloat(e.target.value) || 0 })}
                  className={styles.numberInput}
                  placeholder="Ek fiyat"
                />
                <button className={styles.addButton} onClick={handleAddVariation}>
                  Ekle
                </button>
              </div>
            </div>

            {/* Description */}
            <div className={styles.formSection}>
              <label className={styles.label}>Açıklama</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={styles.textarea}
                placeholder="Ürün açıklamasını girin"
                rows={4}
              />
            </div>
          </div>

          {/* Save / Cancel Buttons */}
          <div className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={onClose}>
              İptal
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

