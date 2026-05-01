import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className, hover = true }: CardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 overflow-hidden",
      hover && "hover:shadow-xl hover:border-emerald-100/50 transition-all duration-500",
      className
    )}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h3 className="text-2xl font-black text-zinc-900 tracking-tight leading-none mb-2 capitalize">{title}</h3>
        {subtitle && <p className="text-gray-400 font-medium text-sm">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
