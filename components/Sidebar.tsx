"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  UtensilsCrossed,
  QrCode,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Sidebar = () => {
  const pathname = usePathname() || "";

  const getActiveTab = () => {
    if (pathname === "/" || pathname === "/dashboard") return "dashboard";
    if (pathname.startsWith("/categories")) return "categories";
    if (pathname.startsWith("/menu")) return "menu";
    if (pathname.startsWith("/qr")) return "qr";
    return "dashboard";
  };

  const activeTab = getActiveTab();

  return (
    <aside className="hidden md:flex w-72 bg-white border-r border-gray-100 flex-col flex-shrink-0 animate-in slide-in-from-left duration-700">
      <div className="p-10 flex items-center gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-[#021d4f] transition-colors duration-500 overflow-hidden">
            <Image src="/logo-splash.jpeg" alt="Logo" width={48} height={48} className="object-cover w-full h-full" priority />
          </div>
          <div>
            <span className="font-serif font-semibold text-xl tracking-tight text-zinc-900 block leading-tight">The Bliss</span>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] leading-tight">Palampur</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-6 py-6 space-y-4">
        <SidebarLink
          icon={<LayoutDashboard size={22} />}
          label="Dashboard"
          active={activeTab === "dashboard"}
          href="/"
        />
        <SidebarLink
          icon={<Layers size={22} />}
          label="Categories"
          active={activeTab === "categories"}
          href="/categories"
        />
        <SidebarLink
          icon={<UtensilsCrossed size={22} />}
          label="Menu Catalog"
          active={activeTab === "menu"}
          href="/menu"
        />
        <SidebarLink
          icon={<QrCode size={22} />}
          label="QR Generator"
          active={activeTab === "qr"}
          href="/qr"
        />
      </nav>

      <div className="p-8 border-t border-gray-50">
        <button className="flex items-center gap-4 w-full px-6 py-4 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 font-bold text-sm">
          <LogOut size={22} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  href: string;
}

const SidebarLink = ({ icon, label, active, href }: SidebarLinkProps) => {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden",
        active
          ? "bg-[#021d4f] text-white shadow-2xl shadow-blue-900/20 translate-x-1"
          : "text-zinc-400 hover:bg-blue-50/50 hover:text-[#021d4f]"
      )}
    >
      <span className={cn(
        "transition-transform duration-500 group-hover:scale-110",
        active ? "text-amber-500" : "group-hover:text-amber-500"
      )}>
        {icon}
      </span>
      <span className="font-bold tracking-tight">{label}</span>
      
      {active && (
        <motion.div
            layoutId="sidebar-active-indicator"
            className="absolute right-6 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />
      )}
    </Link>
  );
};
