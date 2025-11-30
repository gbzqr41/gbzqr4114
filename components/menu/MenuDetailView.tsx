"use client";

import { useState } from "react";
import { MenuItem } from "@/components/dashboard/SidebarEditor";

type MenuDetailViewProps = {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, variations?: any, extras?: any) => void;
};

export default function MenuDetailView({ item, onClose, onAddToCart }: MenuDetailViewProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<string>("medium");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Mock data - gerçek uygulamada item'dan gelecek
  const calories = 450;
  const prepTime = 12;
  const tags = ["Gluten içermez", "Acı biber vardır"];
  const variations = [
    { id: "small", name: "Küçük Boy", price: 0 },
    { id: "medium", name: "Orta Boy", price: 5 },
    { id: "large", name: "Büyük Boy", price: 10 }
  ];
  const extras = [
    { id: "cheese", name: "Ekstra Peynir", price: 5 },
    { id: "sauce", name: "Ekstra Sos", price: 3 },
    { id: "pickles", name: "Turşu", price: 2 }
  ];

  // Dinamik fiyat hesaplama
  const calculateTotalPrice = () => {
    const basePrice = item.price;
    const variationPrice = variations.find(v => v.id === selectedVariation)?.price || 0;
    const extrasPrice = selectedExtras.reduce((sum, extraId) => {
      const extra = extras.find(e => e.id === extraId);
      return sum + (extra?.price || 0);
    }, 0);
    return (basePrice + variationPrice + extrasPrice) * quantity;
  };

  const handleAddToCart = () => {
    onAddToCart(item, quantity, selectedVariation, selectedExtras);
    onClose();
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 10000,
        overflowY: 'auto'
      }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 1
      }}>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
              stroke="black" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill={isFavorite ? "#ef4444" : "none"}
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {/* Product Image */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <img
            src={item.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop"}
            alt={item.name}
            style={{
              width: '250px',
              height: 'auto',
              borderRadius: '12px',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Product Name */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#000',
          margin: '0 0 12px 0'
        }}>
          {item.name}
        </h1>

        {/* Calories and Prep Time */}
        <div style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '16px'
        }}>
          {calories} kcal · {prepTime} dk
        </div>

        {/* Description */}
        {item.description && (
          <p style={{
            fontSize: '14px',
            color: '#374151',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            {item.description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '24px'
          }}>
            {tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: '#374151'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Variations */}
        {variations.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#000',
              marginBottom: '12px'
            }}>
              Boyut Seçimi
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {variations.map((variation) => (
                <label
                  key={variation.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    border: selectedVariation === variation.id ? '2px solid #000' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedVariation === variation.id ? '#f9fafb' : '#fff'
                  }}
                >
                  <input
                    type="radio"
                    name="variation"
                    value={variation.id}
                    checked={selectedVariation === variation.id}
                    onChange={(e) => setSelectedVariation(e.target.value)}
                    style={{ marginRight: '12px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                      {variation.name}
                    </div>
                    {variation.price > 0 && (
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        +{variation.price.toFixed(2)} TL
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Extras */}
        {extras.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#000',
              marginBottom: '12px'
            }}>
              Ekstra Seçenekler
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {extras.map((extra) => (
                <label
                  key={extra.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    border: selectedExtras.includes(extra.id) ? '2px solid #000' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedExtras.includes(extra.id) ? '#f9fafb' : '#fff'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.id)}
                    onChange={() => toggleExtra(extra.id)}
                    style={{ marginRight: '12px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                      {extra.name}
                    </div>
                    {extra.price > 0 && (
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        +{extra.price.toFixed(2)} TL
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector and Add to Cart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
          padding: '16px 0'
        }}>
          {/* Quantity Selector - Left */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#000'
              }}
            >
              –
            </button>
            <span style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#000',
              minWidth: '30px',
              textAlign: 'center'
            }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#000'
              }}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button - Right */}
          <button
            onClick={handleAddToCart}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '16px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <span>Sepete Ekle •</span>
            <span style={{ minWidth: '70px', textAlign: 'right' }}>{calculateTotalPrice().toFixed(2)} TL</span>
          </button>
        </div>
      </div>
    </div>
  );
}

