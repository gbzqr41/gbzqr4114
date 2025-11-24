"use client";

import { useRouter } from "next/navigation";
import { Category } from "./SidebarEditor";

const MAX_CATEGORY_TITLE = 30;
const getDisplayName = (name: string) => {
  return name.length > MAX_CATEGORY_TITLE ? name.slice(0, MAX_CATEGORY_TITLE) + "..." : name;
};

type PhonePreviewProps = {
  categories: Category[];
  businessName?: string;
};

export default function PhonePreview({ categories, businessName = "My Restaurant" }: PhonePreviewProps) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem("gbzqr_categories", JSON.stringify(categories));
    localStorage.setItem("gbzqr_businessName", businessName);
    window.open("/qr-view", "_blank");
  };

  return (
    <div 
      className="pointer-events-none" 
      style={{ 
        boxSizing: 'border-box', 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden', 
        minHeight: 0 
      }}
    >
      <div 
        className="relative pointer-events-auto cursor-pointer" 
        onClick={handleClick}
        style={{ 
          maxHeight: '100%', 
          maxWidth: '100%', 
          aspectRatio: '375/812', 
          flexShrink: 1,
          width: '337.5px'
        }}
      >
        <div 
          className="bg-black shadow-2xl" 
          style={{ 
            width: '100%', 
            height: '100%', 
            boxSizing: 'border-box',
            borderRadius: '3rem',
            padding: '8px',
            overflow: 'hidden'
          }}
        >
          <div 
            className="w-full h-full bg-white overflow-hidden relative" 
            style={{ 
              borderRadius: 'calc(3rem - 8px)'
            }}
          >
            <div 
              className="h-full overflow-y-auto pt-8"
            >
              <div className="px-6 py-4 space-y-8">
                {categories.length > 0 && (
                  categories.map((category) => (
                    <div key={category.id} className="space-y-4">
                      <h2 className="text-xl font-semibold text-black">{getDisplayName(category.name)}</h2>
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
        </div>
      </div>
    </div>
  );
}
