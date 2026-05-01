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
          <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-emerald-500 transition-colors duration-500">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="rounded-lg" style={{ width: 'auto', height: 'auto' }} />
          </div>
          <div>
            <span className="font-black text-xl tracking-tighter text-zinc-900 block leading-tight">TastyBytes</span>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] leading-tight">Admin Console</span>
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
          ? "bg-zinc-900 text-white shadow-2xl shadow-zinc-200 translate-x-1"
          : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900"
      )}
    >
      <span className={cn(
        "transition-transform duration-500 group-hover:scale-110",
        active ? "text-emerald-500" : "group-hover:text-emerald-500"
      )}>
        {icon}
      </span>
      <span className="font-bold tracking-tight">{label}</span>
      
      {active && (
        <motion.div
            layoutId="sidebar-active-indicator"
            className="absolute right-6 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
        />
      )}
    </Link>
  );
};
