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
      <div className="bg-[#ffffff] rounded-[20px] p-[10px] h-full">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <button
              onClick={addCategory}
              className="bg-transparent border-2 border-gray-300 rounded-[10px] text-black font-bold px-[22px] py-[14px] hover:bg-[#f7f7f7] transition-colors"
            >
              Kategori Ekle (+)
            </button>
            <p className="text-[14px] text-[#888] text-center mt-4">
              Menünü oluşturmaya başlamak için bir kategori ekleyin.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black">Kategoriler</h2>
              <button
                onClick={addCategory}
                className="bg-transparent border-2 border-gray-300 rounded-lg text-black px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>

            <div className="space-y-5">
              {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-[18px] p-5 shadow-sm border border-gray-200">
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
                <h3
                  className="text-lg font-bold text-black cursor-pointer"
                  onClick={() => {
                    setEditingCategoryId(category.id);
                    setEditingCategoryName({ ...editingCategoryName, [category.id]: category.name });
                  }}
                >
                  {category.name}
                </h3>
              )}
              <button
                onClick={() => deleteCategory(category.id)}
                className="text-red-600 hover:text-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3">Menü Ekle</p>

            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Menü arayın…"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
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
                      <div className="w-10 h-10 bg-[#f3f3f3] rounded-[5px] flex-shrink-0"></div>
                      <span className="text-sm text-black">{product}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 mb-4">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200"
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
                          onClick={() => deleteItem(category.id, item.id)}
                          className="flex-1 bg-red-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-black">{item.name}</h4>
                            {!item.isAvailable && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Unavailable
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          )}
                          <p className="text-sm font-semibold text-black mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleItemAvailability(category.id, item.id)}
                            className={`px-2 py-1 rounded text-xs ${
                              item.isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {item.isAvailable ? "Available" : "Unavailable"}
                          </button>
                          <button
                            onClick={() => {
                              setEditingItemId(item.id);
                              setEditingItem({ ...editingItem, [item.id]: { name: item.name, description: item.description ?? "", price: item.price } });
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2">
              <input
                type="text"
                value={newItems[category.id]?.name || ""}
                onChange={(e) => setNewItems({ ...newItems, [category.id]: { ...newItems[category.id], name: e.target.value, description: newItems[category.id]?.description ?? "", price: newItems[category.id]?.price ?? 0, isAvailable: true } })}
                placeholder="Item name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
              <textarea
                value={newItems[category.id]?.description || ""}
                onChange={(e) => setNewItems({ ...newItems, [category.id]: { ...newItems[category.id], name: newItems[category.id]?.name ?? "", description: e.target.value, price: newItems[category.id]?.price ?? 0, isAvailable: true } })}
                placeholder="Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                rows={2}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newItems[category.id]?.price || 0}
                  onChange={(e) =>
                    setNewItems({ ...newItems, [category.id]: { ...newItems[category.id], name: newItems[category.id]?.name ?? "", description: newItems[category.id]?.description ?? "", price: parseFloat(e.target.value) || 0, isAvailable: true } })
                  }
                  placeholder="Price"
                  step="0.01"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
                <button
                  onClick={() => addItem(category.id)}
                  className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
            ))}
          </div>
        </>
      )}
      </div>
    </div>
  );
}

