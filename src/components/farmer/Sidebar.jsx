import { navItems } from "./navItems";
import { useState } from "react";
import { LayoutDashboard, ClipboardList, Sprout, Wallet, LogOut, Menu, Plus, Edit2, Trash2, Bell, TrendingUp, Package, CheckCircle, Leaf, ChevronRight, AlertCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { farmers, farmerOrders, walletTransactions, getVegetablesByFarmer } from "../../constants/data";
import { Button, Card, Badge, StatusBadge, StatCard, Modal, EmptyState, ImageUpload } from "../../components/ui";


export default function Sidebar({ page, navigate, onLogout, open, onClose }) {
  const farmer = farmers[0];
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-foreground/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white border-r border-earth z-50 flex flex-col transition-transform duration-200 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 border-b border-earth">
          <button
            type="button"
            onClick={() => {
              navigate("auth");
              onClose();
            }}
            className="flex items-center gap-2 mb-5 cursor-pointer hover:opacity-80 transition-opacity text-left"
            title="Return to Landing Page"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf size={15} className="text-cream" />
            </div>
            <span className="font-bold font-serif text-foreground tracking-tight">
              FarmSetu
            </span>
          </button>
          <div className="flex items-center gap-3">
            <img
              src={`https://images.unsplash.com/${farmer.image}?w=64&h=64&fit=crop&auto=format`}
              alt={farmer.name}
              className="w-11 h-11 rounded-xl object-cover bg-cream-dark flex-shrink-0"
            />

            <div className="min-w-0">
              <p className="font-bold text-sm text-foreground truncate">
                {farmer.name}
              </p>
              <Badge
                variant={farmer.type === "Producer" ? "green" : "amber"}
                className="mt-1"
              >
                {farmer.type}
              </Badge>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, page: p }) => {
            const active = page === p;
            return (
              <button
                key={p}
                onClick={() => {
                  navigate(p);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary-light text-primary"
                    : "text-muted hover:bg-cream-dark hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                {label}
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-earth">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
