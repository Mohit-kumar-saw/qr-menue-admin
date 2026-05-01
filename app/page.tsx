"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { UtensilsCrossed, Layers, TrendingUp, Plus, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";

export default function DashboardPage() {
  const { menuItems, categories } = useAdmin();

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Dishes" value={menuItems.length} icon={<UtensilsCrossed />} color="text-emerald-500" />
        <StatCard title="Categories" value={categories.length} icon={<Layers />} color="text-amber-500" />
        <StatCard title="Menu Scans" value="1,284" icon={<TrendingUp />} color="text-emerald-500" />

        <Card className="sm:col-span-2 p-10">
          <CardHeader 
            title="Quick Management" 
            subtitle="Access your most frequent tasks instantly"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="/menu"
              className="group flex flex-col items-center justify-center p-12 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 hover:bg-zinc-900 transition-all duration-500 hover:scale-[1.02] active:scale-95"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Plus className="text-emerald-500" size={32} />
              </div>
              <span className="font-black text-xl text-zinc-900 group-hover:text-white transition-colors">Add New Dish</span>
              <p className="text-zinc-400 group-hover:text-emerald-400/60 text-xs mt-2 uppercase tracking-widest font-bold transition-colors">Menu Catalog</p>
            </Link>
            
            <Link
              href="/qr"
              className="group flex flex-col items-center justify-center p-12 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 hover:bg-emerald-500 transition-all duration-500 hover:scale-[1.02] active:scale-95"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500">
                <QrCode className="text-zinc-900" size={32} />
              </div>
              <span className="font-black text-xl text-zinc-900 group-hover:text-white transition-colors">Print QR Code</span>
              <p className="text-zinc-400 group-hover:text-white/60 text-xs mt-2 uppercase tracking-widest font-bold transition-colors">Table Setup</p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <Card className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div className={cn("p-4 rounded-2xl bg-zinc-50 group-hover:bg-zinc-100 transition-colors duration-500 shadow-inner", color)}>
          {icon}
        </div>
        <div className="flex flex-col items-end">
            <span className="text-emerald-500 text-xs font-black bg-emerald-50 px-3 py-1.5 rounded-xl tracking-tighter shadow-sm">+12%</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">Growth</span>
        </div>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{title}</p>
        <p className="text-5xl font-black text-zinc-900 tracking-tighter">{value}</p>
      </div>
    </Card>
  );
}
