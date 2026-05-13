"use client";

import React, { useState, useMemo } from "react";
import { 
  Package, 
  Warehouse, 
  BarChart3, 
  Archive, 
  Settings, 
  User 
} from "lucide-react";
import { MOCK_INVENTORY } from "@/mock/inventory";
import { SearchResult, ResultType } from "../types";

const NAV_RESULTS: SearchResult[] = [
  { id: "nav-dash", title: "Dashboard", subtitle: "Overview & KPIs", type: "navigation", icon: <BarChart3 size={14} />, url: "/" },
  { id: "nav-inv", title: "Inventory", subtitle: "Manage Products & Stock", type: "navigation", icon: <Archive size={14} />, url: "/inventory" },
  { id: "nav-ana", title: "Analytics", subtitle: "Advanced Reports", type: "navigation", icon: <BarChart3 size={14} />, url: "/analytics" },
  { id: "nav-set", title: "Settings", subtitle: "System Configuration", type: "navigation", icon: <Settings size={14} />, url: "/settings" },
  { id: "nav-pro", title: "Profile", subtitle: "User Preferences", type: "navigation", icon: <User size={14} />, url: "/profile" },
];

export function useGlobalSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return NAV_RESULTS;

    const q = query.toLowerCase();
    
    // Filter Products
    const products = MOCK_INVENTORY.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.sku.toLowerCase().includes(q) ||
      item.supplier.toLowerCase().includes(q)
    ).slice(0, 5).map(item => ({
      id: item.id,
      title: item.name,
      subtitle: `${item.sku} • ${item.supplier}`,
      type: "product" as ResultType,
      icon: <Package size={14} className="text-orange-500" />,
      url: `/inventory` 
    }));

    // Filter Warehouses
    const warehouses = Array.from(new Set(MOCK_INVENTORY.map(i => i.warehouse)))
      .filter(w => w.toLowerCase().includes(q))
      .map(w => ({
        id: `wh-${w}`,
        title: w,
        subtitle: "Warehouse Location",
        type: "warehouse" as ResultType,
        icon: <Warehouse size={14} className="text-blue-500" />,
        url: `/inventory` 
      }));

    // Filter Nav
    const nav = NAV_RESULTS.filter(n => 
      n.title.toLowerCase().includes(q) || 
      n.subtitle?.toLowerCase().includes(q)
    );

    return [...nav, ...products, ...warehouses];
  }, [query]);

  return {
    query,
    setQuery,
    results
  };
}
