"use client";

export default function LeftSidebar() {
  return (
    <div 
      className="h-screen w-[260px] m-[7px] rounded-[20px]"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #1A1715 100%)"
      }}
    >
      <div className="p-6">
        <h1 className="text-[22px] font-bold text-white mb-6">GBZQR</h1>
        
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 bg-gray-300 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
        
        <div className="space-y-1">
          <div className="px-4 py-3 text-white hover:bg-[#1E1B19] rounded cursor-pointer">
            QR Menü
          </div>
        </div>
      </div>
    </div>
  );
}

