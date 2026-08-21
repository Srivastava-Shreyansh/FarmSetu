import { useState } from "react";
import { LayoutDashboard, ClipboardList, Sprout, Wallet, LogOut, Menu, Plus, Edit2, Trash2, Bell, TrendingUp, Package, CheckCircle, Leaf, ChevronRight, AlertCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { farmers, farmerOrders, walletTransactions, getVegetablesByFarmer } from "../../constants/data";
import { Button, Card, Badge, StatusBadge, StatCard, Modal, EmptyState, ImageUpload } from "../../components/ui";


export default function OnboardingPage({ navigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    type: "Producer",
  });
  const total = 3;

  return (
    <div className="px-5 pb-10 max-w-md mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex gap-1.5 mb-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < step ? "bg-primary" : "bg-earth"}`}
            />
          ))}
        </div>
        <p className="text-xs text-muted font-medium">
          Step {step} of {total}
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold font-serif mb-1">
              Tell us about yourself
            </h2>
            <p className="text-sm text-muted">
              Consumers will see this on your profile.
            </p>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ramesh Patel"
              className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">
              Mobile Number
            </label>
            <input
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              placeholder="9876543210"
              type="tel"
              className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2.5 block">
              I am a…
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["Producer", "Local Vendor"].map((t) => (
                <button
                  key={t}
                  onClick={() => setForm({ ...form, type: t })}
                  className={`py-3.5 rounded-xl text-sm font-semibold border transition-all ${
                    form.type === t
                      ? "bg-primary text-cream border-primary shadow-sm"
                      : "bg-cream-dark border-earth hover:border-primary-muted text-foreground"
                  }`}
                >
                  {t === "Producer" ? "🌱 Producer" : "🏪 Local Vendor"}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted mt-2">
              {form.type === "Producer"
                ? "You grow vegetables on your own farm."
                : "You source from wholesale markets and sell locally."}
            </p>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={() => setStep(2)}
            disabled={!form.name || !form.mobile}
          >
            Continue →
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold font-serif mb-1">
              Your location
            </h2>
            <p className="text-sm text-muted">
              Consumers nearby will discover you first.
            </p>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">
              Full Address
            </label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Survey No. 42, Village Name, District, State, PIN"
              rows={3}
              className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              ← Back
            </Button>
            <Button
              className="flex-1"
              onClick={() => setStep(3)}
              disabled={!form.address}
            >
              Continue →
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold font-serif mb-1">
              Add your photos
            </h2>
            <p className="text-sm text-muted">
              Profiles with photos get 3× more orders.
            </p>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Profile Photo
            </label>
            <ImageUpload label="Upload your photo" onSelect={() => {}} />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Farm / Shop Photo
            </label>
            <ImageUpload
              label="Upload farm or shop photo"
              onSelect={() => {}}
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setStep(2)}
            >
              ← Back
            </Button>
            <Button
              className="flex-1"
              size="lg"
              onClick={() => navigate("farmer.dashboard")}
            >
              <CheckCircle size={16} /> Complete Setup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export const pageTitles = {
  "farmer.dashboard": "Dashboard",
  "farmer.orders": "Orders",
  "farmer.produce": "My Produce",
  "farmer.wallet": "Wallet",
};
