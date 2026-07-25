import { createContext, useContext, useState, type ReactNode } from "react";

const TabsCtx = createContext<{ value: string; onChange: (v: string) => void } | null>(null);

export function Tabs({ value, onValueChange, children, className = "" }: { value: string; onValueChange: (v: string) => void; children: ReactNode; className?: string }) {
  return <div className={className}><TabsCtx.Provider value={{ value, onChange: onValueChange }}>{children}</TabsCtx.Provider></div>;
}

export function TabsList({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`inline-flex gap-1 p-1 rounded-lg ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children, className = "" }: { value: string; children: ReactNode; className?: string }) {
  const ctx = useContext(TabsCtx)!;
  return (
    <button onClick={() => ctx.onChange(value)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${ctx.value === value ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"} ${className}`}>
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }: { value: string; children: ReactNode; className?: string }) {
  const ctx = useContext(TabsCtx)!;
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
