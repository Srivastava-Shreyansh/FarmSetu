import { useState } from "react";
import { LayoutDashboard, ClipboardList, Sprout, Wallet, LogOut, Menu, Plus, Edit2, Trash2, Bell, TrendingUp, Package, CheckCircle, Leaf, ChevronRight, AlertCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { farmers, farmerOrders, walletTransactions, getVegetablesByFarmer } from "../../constants/data";
import { Button, Card, Badge, StatusBadge, StatCard, Modal, EmptyState, ImageUpload } from "../../components/ui";


export default function FarmerHeader({ title, onMenuOpen }) {
  return (
    <header className="h-14 bg-white border-b border-earth flex items-center px-4 gap-3 sticky top-0 z-30">
      <button
        onClick={onMenuOpen}
        className="lg:hidden w-9 h-9 rounded-xl bg-cream-dark flex items-center justify-center hover:bg-earth transition-colors"
      >
        <Menu size={18} className="text-foreground" />
      </button>
      <h1 className="font-bold font-serif text-foreground">{title}</h1>
    </header>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
