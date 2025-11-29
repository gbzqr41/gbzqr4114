"use client";

import { useEffect, useState } from "react";
import { Category } from "@/components/dashboard/SidebarEditor";

export default function QrViewContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [businessName, setBusinessName] = useState("My Restaurant");

  useEffect(() => {
    const storedCategories = localStorage.getItem("gbzqr_categories");
    const storedBusinessName = localStorage.getItem("gbzqr_businessName");
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
    if (storedBusinessName) {
      setBusinessName(storedBusinessName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ padding: '15px 10px 10px 10px', height: '100vh', overflow: 'hidden' }}>
      <div className="max-w-md mx-auto bg-white h-full" style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ 
          height: '150px', 
          backgroundColor: '#fee2e2', 
          borderRadius: '8px', 
          padding: '25px',
          marginBottom: '16px',
          flexShrink: 0
        }}>
          <h1 style={{ fontSize: '16px', fontWeight: '600', color: '#000', margin: 0 }}>Merhaba</h1>
        </div>

        <div className="space-y-8" style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
          {categories.length > 0 && (
            categories.map((category) => (
              <div key={category.id} className="space-y-4">
                <h2 className="text-xl font-semibold text-black">{category.name}</h2>
                {category.items.length === 0 ? (
                  <p className="text-sm text-gray-400">No items in this category</p>
                ) : (
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-lg border ${
                          item.isAvailable
                            ? "bg-white border-gray-200"
                            : "bg-gray-50 border-gray-200 opacity-60"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-black">{item.name}</h3>
                              {!item.isAvailable && (
                                <span className="text-xs text-red-600">(Unavailable)</span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="font-bold text-black">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

