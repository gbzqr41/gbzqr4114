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
    variations: product.variations || [],
    ingredients: (product as any).ingredients || [],
    requiredProducts: (product as any).requiredProducts || [],
    recommendedProducts: (product as any).recommendedProducts || [],
  });

  const [newVariation, setNewVariation] = useState({ name: "", extraPrice: 0 });
  const [newIngredient, setNewIngredient] = useState("");
  const [newRequiredProduct, setNewRequiredProduct] = useState("");
  const [newRecommendedProduct, setNewRecommendedProduct] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: product.name,
        price: product.price,
        portion: product.portion || "",
        description: product.description || "",
        image: product.image || "",
        variations: product.variations || [],
        ingredients: (product as any).ingredients || [],
        requiredProducts: (product as any).requiredProducts || [],
        recommendedProducts: (product as any).recommendedProducts || [],
      });
    }
  }, [isOpen, product]);

  const handleSave = () => {
    onSave(formData);
    setTimeout(() => {
      onClose();
    }, 0);
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

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient.trim()],
      });
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const handleAddRequiredProduct = () => {
    if (newRequiredProduct.trim()) {
      setFormData({
        ...formData,
        requiredProducts: [...formData.requiredProducts, newRequiredProduct.trim()],
      });
      setNewRequiredProduct("");
    }
  };

  const handleRemoveRequiredProduct = (index: number) => {
    setFormData({
      ...formData,
      requiredProducts: formData.requiredProducts.filter((_, i) => i !== index),
    });
  };

  const handleAddRecommendedProduct = () => {
    if (newRecommendedProduct.trim()) {
      setFormData({
        ...formData,
        recommendedProducts: [...formData.recommendedProducts, newRecommendedProduct.trim()],
      });
      setNewRecommendedProduct("");
    }
  };

  const handleRemoveRecommendedProduct = (index: number) => {
    setFormData({
      ...formData,
      recommendedProducts: formData.recommendedProducts.filter((_, i) => i !== index),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
        setIsUploading(false);
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
              <div className={styles.imageSection}>
                <label className={`${styles.imagePreview} ${isUploading ? 'loading' : ''}`}>
                  {formData.image && !isUploading ? (
                    <img src={formData.image} alt="Product" className={styles.image} />
                  ) : (
                    <div className={styles.imagePlaceholder}></div>
                  )}
                  <input type="file" accept="image/*,video/*" onChange={handleImageUpload} className={styles.fileInput} />
                </label>
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
                <button className={styles.addVariationButton} onClick={handleAddVariation}>
                  Varyasyon ekle
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

            {/* Ingredients */}
            <div className={styles.formSection}>
              <label className={styles.label}>İçindekiler</label>
              <div className={styles.variationsList}>
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className={styles.variationItem}>
                    <span className={styles.variationName}>{ingredient}</span>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.addVariationWrapper}>
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  className={styles.textInput}
                  placeholder="İçindekiler"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddIngredient();
                    }
                  }}
                />
                <button className={styles.addVariationButton} onClick={handleAddIngredient}>
                  Ekle
                </button>
              </div>
            </div>

            {/* Required Products */}
            <div className={styles.formSection}>
              <label className={styles.label}>Zorunlu Ürün</label>
              <div className={styles.variationsList}>
                {formData.requiredProducts.map((reqProduct, index) => (
                  <div key={index} className={styles.variationItem}>
                    <span className={styles.variationName}>{reqProduct}</span>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleRemoveRequiredProduct(index)}
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.addVariationWrapper}>
                <input
                  type="text"
                  value={newRequiredProduct}
                  onChange={(e) => setNewRequiredProduct(e.target.value)}
                  className={styles.textInput}
                  placeholder="Zorunlu ürün"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddRequiredProduct();
                    }
                  }}
                />
                <button className={styles.addVariationButton} onClick={handleAddRequiredProduct}>
                  Ekle
                </button>
              </div>
            </div>

            {/* Recommended Products */}
            <div className={styles.formSection}>
              <label className={styles.label}>Yanında İyi Gider</label>
              <div className={styles.variationsList}>
                {formData.recommendedProducts.map((recProduct, index) => (
                  <div key={index} className={styles.variationItem}>
                    <span className={styles.variationName}>{recProduct}</span>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleRemoveRecommendedProduct(index)}
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.addVariationWrapper}>
                <input
                  type="text"
                  value={newRecommendedProduct}
                  onChange={(e) => setNewRecommendedProduct(e.target.value)}
                  className={styles.textInput}
                  placeholder="Yanında iyi gider ürün"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddRecommendedProduct();
                    }
                  }}
                />
                <button className={styles.addVariationButton} onClick={handleAddRecommendedProduct}>
                  Ekle
                </button>
              </div>
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
