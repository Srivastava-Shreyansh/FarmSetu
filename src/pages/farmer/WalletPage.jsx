import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Sprout,
  Wallet,
  LogOut,
  Menu,
  Plus,
  Edit2,
  Trash2,
  Bell,
  TrendingUp,
  Package,
  CheckCircle,
  Leaf,
  ChevronRight,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { gsap } from "gsap";
import { farmers, farmerOrders, walletTransactions, getVegetablesByFarmer } from "../../constants/data";
import { Button, Card, Badge, StatusBadge, StatCard, Modal, EmptyState, ImageUpload } from "../../components/ui";

export default function WalletPage() {
  const containerRef = useRef(null);
  const farmer = farmers[0];
  const [showRecharge, setShowRecharge] = useState(false);
  const [amount, setAmount] = useState("");
  const presets = [500, 1000, 2000, 5000];

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll("[data-animate-wallet]");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all",
          }
        );
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="p-5 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Grid: Balance & Earnings Advantage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Balance hero */}
        <div data-animate-wallet className="lg:col-span-6 bg-gradient-to-br from-[#103d2d] via-primary to-[#163d2e] rounded-3xl p-7 text-cream relative overflow-hidden shadow-xl flex flex-col justify-between">
          <div className="pointer-events-none absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full blur-xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-6 w-36 h-36 bg-[#d8e9b6]/10 rounded-full blur-lg" />
          
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[#d8e9b6] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Wallet size={14} /> Security Wallet Balance
              </p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-cream backdrop-blur-sm">
                Instant UPI Enabled
              </span>
            </div>
            <p className="text-4xl sm:text-5xl font-extrabold font-serif mt-3 mb-6 text-white tracking-tight">
              ₹{farmer.walletBalance.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/15 pt-5">
            <div>
              <p className="text-xs text-cream/70 font-medium">
                Total deductions (2% platform operations fee)
              </p>
              <p className="text-base font-extrabold text-white mt-0.5">₹{farmer.totalDeductions}</p>
            </div>
            <Button
              size="sm"
              onClick={() => setShowRecharge(true)}
              className="bg-[#d8e9b6] text-primary hover:bg-white font-bold py-2.5 px-5 shadow-lg transition-all cursor-pointer"
            >
              <Plus size={16} /> Recharge Wallet
            </Button>
          </div>
        </div>

        {/* Earnings Advantage */}
        <div data-animate-wallet className="lg:col-span-6">
          <Card className="overflow-hidden border-earth bg-white shadow-sm h-full flex flex-col justify-between">
            <div className="bg-primary-light px-5 py-3.5 border-b border-primary-muted/40">
              <p className="text-xs font-extrabold uppercase tracking-wider text-primary">Your Direct Sales Advantage · August</p>
              <p className="mt-0.5 text-xs text-foreground font-medium">Direct farm selling keeps 95%+ of purchase revenue with the grower.</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-earth flex-1">
              <div className="p-5 flex flex-col justify-center">
                <p className="text-xs font-bold text-muted uppercase tracking-wider">FarmSetu Payout</p>
                <p className="mt-2 text-3xl font-extrabold font-serif text-primary">₹{farmer.farmFreshPayout.toLocaleString()}</p>
                <p className="mt-1 text-xs font-bold text-emerald-700">Direct-to-consumer</p>
              </div>
              <div className="p-5 flex flex-col justify-center bg-cream/40">
                <p className="text-xs font-bold text-muted uppercase tracking-wider">Traditional Mandi</p>
                <p className="mt-2 text-3xl font-extrabold font-serif text-muted">₹{farmer.traditionalMandiPayout.toLocaleString()}</p>
                <p className="mt-1 text-xs font-semibold text-muted">After middleman cut</p>
              </div>
            </div>
            <div className="border-t border-earth bg-cream/60 px-5 py-3.5 text-xs font-extrabold text-primary flex items-center gap-2">
              <TrendingUp size={16} />
              <span>You earned ₹{(farmer.farmFreshPayout - farmer.traditionalMandiPayout).toLocaleString()} more with FarmSetu this month!</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Fee explanation */}
      <div data-animate-wallet>
        <Card className="p-5 border-amber-200 bg-amber-50/80 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-amber-700">
              <AlertCircle size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-900 mb-1">
                2% Platform & Logistics Operations Fee
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed max-w-3xl">
                For every completed order, a flat 2% is deducted from your wallet to maintain neighborhood logistics hubs, cold chain maintenance, and rider payouts.
              </p>
              <div className="mt-4 bg-white/90 border border-amber-200 rounded-2xl p-4 max-w-md space-y-1.5 text-xs text-amber-900 shadow-xs">
                <div className="flex justify-between">
                  <span className="font-medium text-muted">Example order payout value</span>
                  <span className="font-bold">₹1,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-muted">Platform fee (2%)</span>
                  <span className="font-bold text-red-600">− ₹25</span>
                </div>
                <div className="flex justify-between border-t border-amber-200 pt-1.5 font-bold">
                  <span>Wallet deduction</span>
                  <span className="text-primary font-extrabold">₹25</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Transactions */}
      <div data-animate-wallet className="bg-white rounded-3xl border border-earth p-6 shadow-sm">
        <h3 className="font-bold font-serif text-xl text-foreground mb-4">Wallet Transaction History</h3>
        {walletTransactions.length === 0 ? (
          <EmptyState
            icon={<Wallet size={24} />}
            title="No transactions yet"
            description="Your wallet activity will appear here."
          />
        ) : (
          <div className="space-y-3">
            {walletTransactions
              .slice()
              .reverse()
              .map((txn) => (
                <Card key={txn.id} className="p-4 hover:border-primary-muted transition-colors">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        txn.type === "recharge"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}
                    >
                      {txn.type === "recharge" ? (
                        <ArrowDownLeft size={18} />
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">
                        {txn.description}
                      </p>
                      {txn.orderId && txn.orderValue && (
                        <p className="text-xs text-muted mt-0.5">
                          Order value ₹{txn.orderValue} · Fee ₹{txn.platformFee}
                        </p>
                      )}
                      <p className="text-[11px] font-medium text-subtle mt-1">
                        {new Date(txn.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p
                        className={`font-extrabold text-base ${txn.type === "recharge" ? "text-primary" : "text-red-600"}`}
                      >
                        {txn.type === "recharge" ? "+" : ""}₹
                        {Math.abs(txn.amount)}
                      </p>
                      <p className="text-xs font-semibold text-muted mt-0.5">
                        Bal ₹{txn.balance.toFixed(0)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        )}
      </div>

      {/* Recharge modal */}
      <Modal
        open={showRecharge}
        onClose={() => setShowRecharge(false)}
        title="Recharge Security Wallet"
      >
        <div className="space-y-4">
          <p className="text-xs text-muted font-medium">
            Current available balance:{" "}
            <span className="font-bold text-primary text-sm">
              ₹{farmer.walletBalance.toLocaleString()}
            </span>
          </p>
          <div>
            <label className="text-xs font-bold uppercase text-foreground tracking-wider mb-2 block">
              Select Preset Amount
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(String(a))}
                  className={`py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                    amount === String(a)
                      ? "bg-primary text-cream border-primary shadow-sm"
                      : "bg-cream text-foreground border-earth hover:border-primary-muted"
                  }`}
                >
                  ₹{a.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-foreground tracking-wider mb-1.5 block">
              Or Enter Custom Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <Button
            className="w-full bg-primary hover:bg-primary-hover font-bold py-3 text-sm"
            size="lg"
            disabled={!amount || Number(amount) < 100}
            onClick={() => setShowRecharge(false)}
          >
            Pay ₹{amount || "0"} via Instant UPI
          </Button>
          <p className="text-[11px] text-center text-muted">
            Supported Payment Methods: PhonePe, GPay, Paytm, BHIM, NetBanking
          </p>
        </div>
      </Modal>
    </div>
  );
}
