"use client";

import { useState } from "react";
import CategoryAddButton from "../category/CategoryAddButton";
import CategoryCard from "../category/CategoryCard";
import MenuItemCard from "../menu/MenuItemCard";
import ProductEditModal from "../product/ProductEditModal";
import MenuItemViewModal from "../menu/MenuItemViewModal";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  image?: string;
};

export type Category = {
  id: string;
  name: string;
  items: MenuItem[];
  animate?: boolean;
  deleting?: boolean;
};

type SidebarEditorProps = {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
};

export default function SidebarEditor({ categories, onCategoriesChange }: SidebarEditorProps) {
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState<{ [key: string]: string }>({});
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<{ [key: string]: { name: string; description: string; price: number } }>({});
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItems, setNewItems] = useState<{ [key: string]: Partial<MenuItem> }>({});
  const [openSearchPopup, setOpenSearchPopup] = useState<string | null>(null);
  const [categoryOpenStates, setCategoryOpenStates] = useState<{ [key: string]: boolean }>({});
  const [showItemFields, setShowItemFields] = useState<{ [key: string]: boolean }>({});
  const [modalItemId, setModalItemId] = useState<string | null>(null);
  const [modalCategoryId, setModalCategoryId] = useState<string | null>(null);
  const [viewModalItemId, setViewModalItemId] = useState<string | null>(null);
  const [viewModalCategoryId, setViewModalCategoryId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'menu' | 'design'>('menu');
  const [isQRPopupOpen, setIsQRPopupOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const addCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: "",
      items: [],
      animate: true,
    };
    onCategoriesChange([...categories, newCategory]);
    setEditingCategoryId(newCategory.id);
    setEditingCategoryName({ ...editingCategoryName, [newCategory.id]: "" });
    
    setTimeout(() => {
      onCategoriesChange(
        [...categories, newCategory].map((cat) =>
          cat.id === newCategory.id ? { ...cat, animate: false } : cat
        )
      );
    }, 120);
  };

  const updateCategoryName = (categoryId: string, newName: string) => {
    const finalName = newName.trim() || "Yeni Kategori";
    onCategoriesChange(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, name: finalName } : cat
      )
    );
    setEditingCategoryId(null);
    setEditingCategoryName((prev) => {
      const updated = { ...prev };
      delete updated[categoryId];
      return updated;
    });
  };

  const deleteCategory = (categoryId: string) => {
    onCategoriesChange(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, deleting: true } : cat
      )
    );
    
    setTimeout(() => {
      onCategoriesChange(categories.filter((cat) => cat.id !== categoryId));
    }, 120);
  };

  const addItem = (categoryId: string) => {
    const newItem = newItems[categoryId];
    if (newItem?.name?.trim() && newItem.price !== undefined) {
      const item: MenuItem = {
        id: Date.now().toString(),
        name: newItem.name,
        description: newItem.description || "",
        price: newItem.price,
        isAvailable: newItem.isAvailable ?? true,
        animate: true,
      } as MenuItem;
      onCategoriesChange(
        categories.map((cat) =>
          cat.id === categoryId
            ? { ...cat, items: [...cat.items, item] }
            : cat
        )
      );
      setTimeout(() => {
        onCategoriesChange(
          categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, items: cat.items.map((it) => it.id === item.id ? { ...it, animate: false } as MenuItem : it) }
              : cat
          )
        );
      }, 120);
      setNewItems((prev) => ({
        ...prev,
        [categoryId]: { name: "", description: "", price: 0, isAvailable: true },
      }));
    }
  };

  const addItemFromPopup = (categoryId: string, itemName: string) => {
    const item: MenuItem = {
      id: Date.now().toString(),
      name: itemName,
      description: "Açıklama...",
      price: 100,
      isAvailable: true,
      animate: true,
    } as MenuItem;
    
    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId
        ? { ...cat, items: [...cat.items, item] }
        : cat
    );
    onCategoriesChange(updatedCategories);
    
    const itemId = item.id;
    setTimeout(() => {
      const finalCategories = updatedCategories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.map((it) => it.id === itemId ? { ...it, animate: false } as MenuItem : it) }
          : cat
      );
      onCategoriesChange(finalCategories);
    }, 120);
    
    setOpenSearchPopup(null);
  };

  const dummyProducts = [
    "Dürüm",
  ];

  const updateItem = (categoryId: string, itemId: string, updates: Partial<MenuItem>) => {
    onCategoriesChange(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, ...updates } : item
              ),
            }
          : cat
      )
    );
    setEditingItemId(null);
    setEditingItem((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    onCategoriesChange(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.map((item) => item.id === itemId ? { ...item, deleting: true } as MenuItem : item) }
          : cat
      )
    );
    setTimeout(() => {
      onCategoriesChange(
        categories.map((cat) =>
          cat.id === categoryId
            ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
            : cat
        )
      );
    }, 120);
  };

  const toggleItemAvailability = (categoryId: string, itemId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    const item = category?.items.find((item) => item.id === itemId);
    if (item) {
      updateItem(categoryId, itemId, { isAvailable: !item.isAvailable });
    }
  };

  return (
    <div className="h-full p-[10px] overflow-y-auto">
      <div style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000, display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '9999px', padding: '10px', boxShadow: '0 5px 50px #0000000a' }}>
          <div 
            onClick={() => setActiveTab('menu')}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px', 
              cursor: 'pointer', 
              color: activeTab === 'menu' ? 'black' : '#888',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'none',
              minWidth: 'fit-content'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3V19M15 3L9 5M15 3L21 5V21L15 19M15 19L9 21M9 5V21M9 5L3 3V19L9 21" stroke={activeTab === 'menu' ? 'black' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Menü
          </div>
          <div 
            onClick={() => setActiveTab('design')}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px', 
              cursor: 'pointer', 
              color: activeTab === 'design' ? 'black' : '#888',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'none',
              marginLeft: '0'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20H20.5M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke={activeTab === 'design' ? 'black' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Tasarım
          </div>
        </div>
        <div style={{ display: 'flex', backgroundColor: 'black', borderRadius: '9999px', padding: '10px', boxShadow: '0 5px 50px #0000000a', marginLeft: '5px' }}>
          <div 
            onClick={() => setIsQRPopupOpen(true)}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px', 
              cursor: 'pointer', 
              color: 'white',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'none'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H9V9H3V3Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 3H21V9H15V3Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 15H9V21H3V15Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 15H16M18 15H19M16 19H19V16H16V19Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            QR +
          </div>
        </div>
      </div>
      {isQRPopupOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10001
          }}
          onClick={() => setIsQRPopupOpen(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '425px',
              width: '76.5%',
              position: 'relative',
              boxShadow: 'rgba(0, 0, 0, 0.18) 0px 5px 50px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ width: '300px', height: '300px', backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
              </div>
            </div>
            <div style={{ width: '300px', margin: '0 auto', position: 'relative' }}>
              <input
                type="text"
                value="https://example.com/menu"
                readOnly
                style={{
                  width: '100%',
                  padding: '12px',
                  paddingRight: '12px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '8px'
                }}
              />
              {isCopied && (
                <div style={{ position: 'absolute', right: '12px', top: '12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', whiteSpace: 'nowrap', backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>
                    Kopyalandı
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px' }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('https://example.com/menu');
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#e5e5e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4L3 11L10 14L13 21L20 4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: '14px', color: 'black' }}>Kopyala</span>
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: '5px'
                  }}
                >
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#e5e5e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.4898 14.9907C19.8414 16.831 18.6124 18.4108 16.9879 19.492C15.3635 20.5732 13.4316 21.0972 11.4835 20.9851C9.5353 20.873 7.67634 20.1308 6.18668 18.8704C4.69703 17.61 3.65738 15.8996 3.22438 13.997C2.79138 12.0944 2.98849 10.1026 3.78602 8.32177C4.58354 6.54091 5.93827 5.06746 7.64608 4.12343C9.35389 3.17941 11.3223 2.81593 13.2546 3.08779C16.5171 3.54676 18.6725 5.91142 21 8M21 8V2M21 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: '14px', color: 'black' }}>Yenile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-[10px] h-full">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <CategoryAddButton onClick={addCategory} variant="empty-state" />
            <p className="text-[14px] text-[#888] text-center mt-4">
              Menünü oluşturmaya başlamak için bir kategori ekleyin.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-5 relative">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                  editingCategoryId={editingCategoryId}
                  editingCategoryName={editingCategoryName}
                  categoryOpenStates={categoryOpenStates}
                  onEditCategory={updateCategoryName}
                  onDeleteCategory={deleteCategory}
                  onToggleOpen={(categoryId) => {
                    setCategoryOpenStates({ ...categoryOpenStates, [categoryId]: !(categoryOpenStates[categoryId] ?? true) });
                  }}
                  onStartEdit={(categoryId) => {
                    setEditingCategoryId(categoryId);
                    setEditingCategoryName({ ...editingCategoryName, [categoryId]: category.name });
                  }}
                  onUpdateCategoryName={(categoryId, name) => {
                    setEditingCategoryName({ ...editingCategoryName, [categoryId]: name });
                  }}
                >
                    <div className="mb-4 relative" style={{ zIndex: 100, pointerEvents: 'auto', position: 'relative' }}>
                      <div className="flex items-center gap-2 w-full px-3 py-2 border border-gray-200 rounded-full focus-within:ring-2 focus-within:ring-black" style={{ position: 'relative', zIndex: 100, pointerEvents: 'auto' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0" style={{ pointerEvents: 'none' }}>
                          <path d="M20 20L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input
                          type="text"
                          placeholder="Ürün arayın…"
                          className="flex-1 bg-transparent focus:outline-none text-sm"
                          style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                          onFocus={() => setOpenSearchPopup(category.id)}
                          onBlur={(e) => {
                            const target = e.currentTarget;
                            setTimeout(() => {
                              if (target && !target.contains(document.activeElement)) {
                                setOpenSearchPopup(null);
                              }
                            }, 200);
                          }}
                        />
                        <button
                          onClick={() => {
                            setModalItemId("new");
                            setModalCategoryId(category.id);
                          }}
                          className="w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #c041ff59, #ff898973)', position: 'relative', zIndex: openSearchPopup === category.id ? -1 : 1 }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7V17M7 12H17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      {openSearchPopup === category.id && (
                        <div 
                          className="absolute top-full left-0 right-0 bg-white p-2.5 max-h-[300px] overflow-y-auto"
                          onMouseDown={(e) => e.preventDefault()}
                          style={{ position: 'absolute', marginTop: '10px', borderRadius: '20px', boxShadow: 'rgba(0, 0, 0, 0.38) 0px 5px 50px', zIndex: 10000 }}
                        >
                          {dummyProducts.map((product, index) => (
                            <div
                              key={index}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                addItemFromPopup(category.id, product);
                              }}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                            >
                              <img
                                src="https://plus.unsplash.com/premium_photo-1669687759685-00f3ad6f0d4e?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt={product}
                                className="w-[60px] h-[60px] rounded-full object-cover flex-shrink-0"
                              />
                              <span className="text-sm text-black">{product}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-[10px] mb-4">
                      {category.items.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          categoryId={category.id}
                          editingItemId={editingItemId}
                          editingItem={editingItem}
                          onUpdateItem={(categoryId, itemId, updates) => {
                            updateItem(categoryId, itemId, updates);
                            if (updates.name || updates.description || updates.price) {
                              setEditingItem((prev) => {
                                const updated = { ...prev };
                                if (updated[itemId]) {
                                  updated[itemId] = { ...updated[itemId], ...updates };
                                }
                                return updated;
                              });
                            }
                          }}
                          onDeleteItem={deleteItem}
                          onToggleAvailability={toggleItemAvailability}
                          onStartEdit={(itemId) => {
                            if (itemId) {
                              setModalItemId(itemId);
                              setModalCategoryId(category.id);
                            } else {
                              setEditingItemId(null);
                              setEditingItem((prev) => {
                                const updated = { ...prev };
                                delete updated[item.id];
                                return updated;
                              });
                            }
                          }}
                          onView={() => {
                            setViewModalItemId(item.id);
                            setViewModalCategoryId(category.id);
                          }}
                        />
                      ))}
                    </div>
                </CategoryCard>
              ))}
            </div>
            <div className="flex justify-center mt-5">
                <button
                  onClick={addCategory}
                  className="w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                  style={{ background: 'linear-gradient(135deg, #c041ff59, #ff898973)', zIndex: openSearchPopup ? 0 : 50 }}
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7V17M7 12H17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {modalItemId && modalCategoryId && (() => {
        const category = categories.find((cat) => cat.id === modalCategoryId);
        
        if (modalItemId === "new") {
          return (
            <ProductEditModal
              product={{
                id: "new",
                name: "",
                description: "",
                price: 0,
                isAvailable: true,
              }}
              isOpen={!!modalItemId}
              onClose={() => {
                setModalItemId(null);
                setModalCategoryId(null);
              }}
              onSave={(updatedData) => {
                if (!updatedData || !modalCategoryId) return;
                
                let priceValue = 0;
                if (typeof updatedData.price === 'number') {
                  priceValue = updatedData.price;
                } else if (typeof updatedData.price === 'string') {
                  priceValue = parseFloat(updatedData.price) || 0;
                }
                
                const newItem: MenuItem = {
                  id: Date.now().toString(),
                  name: updatedData.name || "",
                  description: updatedData.description || "",
                  price: priceValue,
                  isAvailable: updatedData.isAvailable ?? true,
                  image: updatedData.image || "",
                  animate: true,
                } as MenuItem;
                
                const updatedCategories = categories.map((cat) =>
                  cat.id === modalCategoryId
                    ? { ...cat, items: [...cat.items, newItem] }
                    : cat
                );
                onCategoriesChange(updatedCategories);
                
                const itemId = newItem.id;
                const categoryId = modalCategoryId;
                
                setTimeout(() => {
                  const currentCategories = updatedCategories;
                  const finalCategories = currentCategories.map((cat) =>
                    cat.id === categoryId
                      ? { ...cat, items: cat.items.map((it) => it.id === itemId ? { ...it, animate: false } as MenuItem : it) }
                      : cat
                  );
                  onCategoriesChange(finalCategories);
                }, 120);
                
                setModalItemId(null);
                setModalCategoryId(null);
              }}
            />
          );
        }
        
        const item = category?.items.find((item) => item.id === modalItemId);
        if (!item) return null;
        
        return (
          <ProductEditModal
            product={{
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              isAvailable: item.isAvailable,
              image: item.image,
            }}
            isOpen={!!modalItemId}
            onClose={() => {
              setModalItemId(null);
              setModalCategoryId(null);
            }}
            onSave={(updatedData) => {
              updateItem(modalCategoryId, modalItemId, updatedData);
              setModalItemId(null);
              setModalCategoryId(null);
            }}
          />
        );
      })()}

      {viewModalItemId && viewModalCategoryId && (() => {
        const category = categories.find((cat) => cat.id === viewModalCategoryId);
        const item = category?.items.find((item) => item.id === viewModalItemId);
        if (!item) return null;
        
        return (
          <MenuItemViewModal
            item={item}
            categoryId={viewModalCategoryId}
            isOpen={!!viewModalItemId}
            onClose={() => {
              setViewModalItemId(null);
              setViewModalCategoryId(null);
            }}
            onEdit={() => {
              setViewModalItemId(null);
              setViewModalCategoryId(null);
              setModalItemId(item.id);
              setModalCategoryId(viewModalCategoryId);
            }}
            onDelete={() => {
              deleteItem(viewModalCategoryId, item.id);
              setViewModalItemId(null);
              setViewModalCategoryId(null);
            }}
            onToggleAvailability={() => {
              toggleItemAvailability(viewModalCategoryId, item.id);
              setViewModalItemId(null);
              setViewModalCategoryId(null);
            }}
          />
        );
      })()}
    </div>
  );
}

