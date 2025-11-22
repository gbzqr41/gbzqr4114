"use client";

import { useState } from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import SidebarEditor, { Category } from "@/components/dashboard/SidebarEditor";
import PhonePreview from "@/components/dashboard/PhonePreview";

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <LeftSidebar />
      <div className="flex-1 w-full h-full p-[50px] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] text-black font-semibold">QR Menü Oluşturma</h2>
          <div className="flex gap-[15px]">
            <button className="bg-transparent border-2 border-[#E5E7EB] rounded-[6px] text-black px-4 py-2">
              QR Menü (+)
            </button>
            <button className="bg-transparent border-2 border-[#E5E7EB] rounded-[6px] text-black px-4 py-2">
              Hazır Menü
            </button>
            <button className="bg-transparent border-2 border-[#E5E7EB] rounded-[6px] text-black px-4 py-2">
              Ön İzleme
            </button>
          </div>
        </div>
        <div className="flex-1 w-full flex overflow-hidden">
          <div className="w-[40%] border-r border-gray-200">
            <SidebarEditor categories={categories} onCategoriesChange={setCategories} />
          </div>
          <div className="w-[60%]">
            <PhonePreview categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}

