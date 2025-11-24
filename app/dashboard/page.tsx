"use client";

import { useState } from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import SidebarEditor, { Category } from "@/components/dashboard/SidebarEditor";
import PhonePreview from "@/components/dashboard/PhonePreview";

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <div className="bg-gray-50 flex overflow-hidden" style={{ height: '100vh', minHeight: 0 }}>
      <LeftSidebar />
      <div className="flex-1 w-full h-full p-[50px] flex flex-col" style={{ overflow: 'hidden', minHeight: 0 }}>
        <div className="flex items-center justify-between mb-6" style={{ flexShrink: 0 }}>
          <div>
            <h2 className="text-[28px] text-black font-semibold">QR Menü Oluşturma</h2>
            <div className="w-[50px] h-[1px] bg-black mt-2"></div>
          </div>
        </div>
        <div className="flex-1 w-full flex overflow-hidden" style={{ minHeight: 0 }}>
          <div className="w-full flex bg-[#F6F7F9] rounded-[20px] p-[10px]" style={{ minHeight: 0, overflow: 'hidden' }}>
            <div className="w-[46%] border-r border-gray-200" style={{ overflow: 'hidden' }}>
              <SidebarEditor categories={categories} onCategoriesChange={setCategories} />
            </div>
            <div className="w-[54%] flex items-center justify-center" style={{ boxSizing: 'border-box', minHeight: 0, overflow: 'hidden', paddingTop: '30px', paddingBottom: '30px', flexShrink: 1 }}>
              <PhonePreview categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

