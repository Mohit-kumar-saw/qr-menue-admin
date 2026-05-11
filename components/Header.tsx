"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";

export const Header = () => {
  const pathname = usePathname() || "";

  const getTitle = () => {
    if (pathname === "/" || pathname === "/dashboard") return "dashboard";
    if (pathname.startsWith("/categories")) return "categories";
    if (pathname.startsWith("/menu")) return "menu";
    if (pathname.startsWith("/qr")) return "qr";
    return "dashboard";
  };

  const title = getTitle();

  return (
    <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 md:px-10 flex items-center justify-between sticky top-0 z-30 transition-all">
      <div className="flex items-center gap-4 md:hidden">
        <div className="w-10 h-10 bg-[#021d4f] rounded-[1rem] flex items-center justify-center shadow-lg overflow-hidden">
          <Image src="/logo-splash.jpeg" alt="Logo" width={32} height={32} className="object-cover w-full h-full" priority />
        </div>
        <h2 className="text-xl font-serif font-semibold tracking-tight capitalize">{title}</h2>
      </div>
      
      <div className="hidden md:block">
        <h2 className="text-3xl font-serif font-semibold capitalize tracking-tight text-zinc-900">{title}</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#021d4f] mt-1">Overview</p>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative hidden sm:block group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#021d4f] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Quick search..."
            className="pl-12 pr-6 py-3 bg-gray-50 border-none rounded-2xl w-48 lg:w-72 focus:ring-4 focus:ring-blue-900/10 focus:bg-white transition-all text-sm font-bold shadow-inner outline-none"
          />
        </div>
        
        <button className="relative p-3 text-gray-400 hover:text-zinc-900 transition-colors hover:bg-blue-50 rounded-2xl">
           <Bell size={22} />
           <span className="absolute top-2.5 right-3 w-2 h-2 bg-amber-500 rounded-full border-2 border-white shadow-sm"></span>
        </button>

        <div className="w-12 h-12 bg-[#021d4f] rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl hover:scale-105 transition-transform cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
};
