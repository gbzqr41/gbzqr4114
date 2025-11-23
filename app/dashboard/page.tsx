"use client";

import { useState } from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import SidebarEditor, { Category } from "@/components/dashboard/SidebarEditor";
import PhonePreview from "@/components/dashboard/PhonePreview";

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden relative">
      <LeftSidebar />
      <div className="flex-1 w-full h-full p-[50px] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[28px] text-black font-semibold">QR Menü Oluşturma</h2>
            <div className="w-[50px] h-[1px] bg-black mt-2"></div>
          </div>
        </div>
        <div className="flex-1 w-full flex overflow-hidden">
          <div className="w-full flex bg-[#F6F7F9] rounded-[20px] p-[10px]">
            <div className="w-[40%] border-r border-gray-200">
              <SidebarEditor categories={categories} onCategoriesChange={setCategories} />
            </div>
            <div className="w-[60%]">
              <PhonePreview categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

