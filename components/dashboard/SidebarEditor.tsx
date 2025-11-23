"use client";

import { useState } from "react";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
};

export type Category = {
  id: string;
  name: string;
  items: MenuItem[];
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

  const addCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: "Yeni Kategori",
      items: [],
    };
    onCategoriesChange([...categories, newCategory]);
    setEditingCategoryId(newCategory.id);
    setEditingCategoryName({ ...editingCategoryName, [newCategory.id]: "Yeni Kategori" });
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
    onCategoriesChange(categories.filter((cat) => cat.id !== categoryId));
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
            <button
              onClick={addCategory}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(40, 0, 60, 0.35), rgba(0, 0, 0, 0.45))' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V17M7 12H17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <p className="text-[14px] text-[#888] text-center mt-4">
              Menünü oluşturmaya başlamak için bir kategori ekleyin.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white p-[10px] mb-6 rounded-[20px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-black">Kategoriler</h2>
                </div>
                <button
                  onClick={addCategory}
                  className="w-10 h-10 rounded-full bg-transparent border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7V17M7 12H17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {categories.map((category, index) => (
          <div key={category.id} className="bg-white rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              {editingCategoryId === category.id ? (
                <input
                  type="text"
                  value={editingCategoryName[category.id] ?? category.name}
                  onChange={(e) => setEditingCategoryName({ ...editingCategoryName, [category.id]: e.target.value })}
                  onBlur={(e) => updateCategoryName(category.id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      updateCategoryName(category.id, e.currentTarget.value);
                    }
                  }}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  autoFocus
                />
              ) : (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black border border-[#e5e5e5] rounded-full flex items-center justify-center text-white text-xs font-medium mr-2">
                    {index + 1}
                  </div>
                  <h3
                    className="text-lg font-bold text-black cursor-pointer"
                    onClick={(e) => {
                      if (e.detail === 2) {
                        setEditingCategoryId(category.id);
                        setEditingCategoryName({ ...editingCategoryName, [category.id]: category.name });
                      } else {
                        setCategoryOpenStates({ ...categoryOpenStates, [category.id]: !(categoryOpenStates[category.id] ?? true) });
                      }
                    }}
                  >
                    {category.name}
                  </h3>
                </div>
              )}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCategoryId(category.id);
                    setEditingCategoryName({ ...editingCategoryName, [category.id]: category.name });
                  }}
                  className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategoryOpenStates({ ...categoryOpenStates, [category.id]: !(categoryOpenStates[category.id] ?? true) });
                  }}
                  className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6M18 6H15M18 6H20M6 6H4M6 6H9M15 6V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V6M15 6H9" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-4 relative">
              <div className="flex items-center gap-2 w-full px-3 py-2 bg-[rgb(238,238,238)] border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-black">
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
                  className="absolute top-full left-0 w-full mt-1 bg-white border border-[#e5e5e5] rounded-xl shadow-md z-50 p-2.5"
                  onMouseDown={(e) => e.preventDefault()}
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

            {(categoryOpenStates[category.id] ?? true) && (
              <div className="space-y-3 mb-4">
                {category.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-3"
                >
                  {editingItemId === item.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingItem[item.id]?.name ?? item.name}
                        onChange={(e) => setEditingItem({ ...editingItem, [item.id]: { ...editingItem[item.id], name: e.target.value, description: editingItem[item.id]?.description ?? item.description ?? "", price: editingItem[item.id]?.price ?? item.price } })}
                        onBlur={(e) =>
                          updateItem(category.id, item.id, { name: e.target.value })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Item name"
                      />
                      <textarea
                        value={editingItem[item.id]?.description ?? item.description ?? ""}
                        onChange={(e) => setEditingItem({ ...editingItem, [item.id]: { ...editingItem[item.id], name: editingItem[item.id]?.name ?? item.name, description: e.target.value, price: editingItem[item.id]?.price ?? item.price } })}
                        onBlur={(e) =>
                          updateItem(category.id, item.id, {
                            description: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Description"
                        rows={2}
                      />
                      <input
                        type="number"
                        value={editingItem[item.id]?.price ?? item.price}
                        onChange={(e) => setEditingItem({ ...editingItem, [item.id]: { ...editingItem[item.id], name: editingItem[item.id]?.name ?? item.name, description: editingItem[item.id]?.description ?? item.description ?? "", price: parseFloat(e.target.value) || 0 } })}
                        onBlur={(e) =>
                          updateItem(category.id, item.id, {
                            price: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Price"
                        step="0.01"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingItemId(null);
                            setEditingItem((prev) => {
                              const updated = { ...prev };
                              delete updated[item.id];
                              return updated;
                            });
                          }}
                          className="flex-1 bg-gray-200 text-black px-2 py-1 rounded text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            deleteItem(category.id, item.id);
                            setEditingItemId(null);
                            setEditingItem((prev) => {
                              const updated = { ...prev };
                              delete updated[item.id];
                              return updated;
                            });
                          }}
                          className="flex-1 bg-red-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-[60px] h-[60px] bg-[rgb(238,238,238)] rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-black">{item.name}</h4>
                            </div>
                            <p className="text-sm font-semibold text-black mt-1">
                              {item.price.toFixed(0)} TL
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleItemAvailability(category.id, item.id)}
                            className="w-[30px] h-[30px] bg-white border border-[#e5e5e5] rounded-full flex items-center justify-center"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              setEditingItemId(item.id);
                              setEditingItem({ ...editingItem, [item.id]: { name: item.name, description: item.description ?? "", price: item.price } });
                            }}
                            className="w-[30px] h-[30px] bg-white border border-[#e5e5e5] rounded-full flex items-center justify-center"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteItem(category.id, item.id)}
                            className="w-[30px] h-[30px] bg-white border border-[#e5e5e5] rounded-full flex items-center justify-center"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 6V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6M18 6H15M18 6H20M6 6H4M6 6H9M15 6V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V6M15 6H9" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              </div>
            )}
          </div>
            ))}
          </div>
        </>
      )}
      </div>
    </div>
  );
}

