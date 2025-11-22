"use client";

import { useRouter } from "next/navigation";
import { Category } from "./SidebarEditor";

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
    <div className="h-full flex flex-col bg-gray-100 pointer-events-none">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative pointer-events-auto cursor-pointer" onClick={handleClick}>
          <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
              <div className="h-full overflow-y-auto pt-8">
                <div className="px-6 py-4 space-y-8">
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
          </div>
        </div>
      </div>
    </div>
  );
}

