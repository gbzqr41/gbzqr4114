"use client";

import { useEffect, useState } from "react";
import { Category } from "@/components/dashboard/SidebarEditor";

export default function QrViewPage() {
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
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h1 className="text-2xl font-bold text-black">{businessName}</h1>
        </div>

        <div className="px-6 py-4 space-y-8">
          {categories.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>No categories yet. Add categories and menu items to see them here.</p>
            </div>
          ) : (
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


