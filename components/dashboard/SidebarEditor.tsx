"use client";

import { useState } from "react";
import CategoryAddButton from "../category/CategoryAddButton";
import CategoryCard from "../category/CategoryCard";
import MenuItemCard from "../menu/MenuItemCard";
import ProductEditModal from "../product/ProductEditModal";

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

  const addCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: "Yeni Kategori",
      items: [],
      animate: true,
    };
    onCategoriesChange([...categories, newCategory]);
    setEditingCategoryId(newCategory.id);
    setEditingCategoryName({ ...editingCategoryName, [newCategory.id]: "Yeni Kategori" });
    
    setTimeout(() => {
      onCategoriesChange(
        [...categories, newCategory].map((cat) =>
          cat.id === newCategory.id ? { ...cat, animate: false } : cat
        )
      );
    }, 120);
  };

  const updateCategoryName = (categoryId: string, newName: string) => {
    onCategoriesChange(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, name: newName } : cat
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
      };
      onCategoriesChange(
        categories.map((cat) =>
          cat.id === categoryId
            ? { ...cat, items: [...cat.items, item] }
            : cat
        )
      );
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
    };
    onCategoriesChange(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: [...cat.items, item] }
          : cat
      )
    );
    setOpenSearchPopup(null);
  };

  const dummyProducts = [
    "Tarhana Çorbası",
    "Mercimek Çorbası",
    "Ezogelin Çorbası",
    "Yayla Çorbası",
    "Domates Çorbası",
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
          ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
          : cat
      )
    );
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
                  {(categoryOpenStates[category.id] ?? true) && (
                    <div className="mb-4 relative">
                      <div className="flex items-center gap-2 w-full px-3 py-2 border border-gray-200 rounded-full focus-within:ring-2 focus-within:ring-black">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                          <path d="M20 20L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input
                          type="text"
                          placeholder="Menü arayın…"
                          className="flex-1 bg-transparent focus:outline-none text-sm"
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
                      </div>
                      {openSearchPopup === category.id && (
                        <div 
                          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e5e5e5] rounded-xl shadow-md z-[100] p-2.5 max-h-[300px] overflow-y-auto"
                          onMouseDown={(e) => e.preventDefault()}
                          style={{ position: 'absolute' }}
                        >
                          {dummyProducts.map((product, index) => (
                            <div
                              key={index}
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
                  )}

                  {(categoryOpenStates[category.id] ?? true) && (
                    <div className="space-y-3 mb-4">
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
                        />
                      ))}
                    </div>
                  )}
                </CategoryCard>
              ))}
              <button
                onClick={addCategory}
                className="absolute bottom-[20px] right-[20px] w-[50px] h-[50px] rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
          </div>
        </>
      )}
      </div>

      {modalItemId && modalCategoryId && (() => {
        const category = categories.find((cat) => cat.id === modalCategoryId);
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
    </div>
  );
}

