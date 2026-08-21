import { useState } from "react";
import { LayoutDashboard, ClipboardList, Sprout, Wallet, LogOut, Menu, Plus, Edit2, Trash2, Bell, TrendingUp, Package, CheckCircle, Leaf, ChevronRight, AlertCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { farmers, farmerOrders, walletTransactions, getVegetablesByFarmer } from "../../constants/data";
import { Button, Card, Badge, StatusBadge, StatCard, Modal, EmptyState, ImageUpload } from "../../components/ui";


export const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", page: "farmer.dashboard" },
  { icon: ClipboardList, label: "Orders", page: "farmer.orders" },
  { icon: Sprout, label: "Produce", page: "farmer.produce" },
  { icon: Wallet, label: "Wallet", page: "farmer.wallet" },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
