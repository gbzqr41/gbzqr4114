"use client";

import { useState } from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import SidebarEditor, { Category } from "@/components/dashboard/SidebarEditor";
import PhonePreview from "@/components/dashboard/PhonePreview";
import ProfileBar from "@/components/header/ProfileBar";

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <div className="bg-white flex overflow-hidden" style={{ height: '100vh', minHeight: 0 }}>
      <LeftSidebar />
      <div className="flex-1 w-full h-full p-[50px] flex flex-col" style={{ overflow: 'hidden', minHeight: 0 }}>
        <div className="flex items-center justify-between mb-6" style={{ flexShrink: 0 }}>
          <div>
            <h2 className="text-[28px] text-black font-bold">QR Menü Oluşturma</h2>
            <div className="flex items-center gap-2" style={{ marginTop: '10px' }}>
              <span className="text-sm" style={{ color: 'rgb(119, 119, 119)' }}>Anasayfa</span>
              <div className="w-[50px] h-[1px]" style={{ backgroundColor: 'rgb(119, 119, 119)' }}></div>
              <span className="text-sm" style={{ color: 'rgb(119, 119, 119)' }}>QR Menü</span>
            </div>
          </div>
          <ProfileBar />
        </div>
        <div className="flex-1 w-full flex overflow-hidden" style={{ minHeight: 0, backgroundColor: '#f2f2f2', borderRadius: '20px' }}>
          <div className="w-full flex bg-[#f2f2f2] rounded-[20px] p-[10px]" style={{ minHeight: 0, overflow: 'hidden' }}>
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

