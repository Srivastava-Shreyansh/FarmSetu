import React from "react";
import {
  Plus,
  Minus,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  X,
  Loader2,
  Upload,
  ShieldCheck,
  Leaf,
} from "lucide-react";

// ─── Button ───────────────────────────────────────────────────────────────────

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]";
  const sizes = {
    sm: "text-xs px-3.5 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-sm px-6 py-3.5",
  };
  const variants = {
    primary: "bg-primary text-cream hover:bg-primary-hover shadow-sm",
    secondary: "bg-primary-light text-primary hover:bg-primary-muted",
    outline: "border border-earth bg-white text-foreground hover:bg-cream-dark",
    ghost:
      "bg-transparent text-muted hover:bg-cream-dark hover:text-foreground",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

export const Input = React.forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <input
        ref={ref}
        className={`w-full rounded-xl border border-earth bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${className}`}
        {...props}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

// ─── Badge ────────────────────────────────────────────────────────────────────

export function Badge({ variant = "green", children, className = "" }) {
  const variants = {
    green: "bg-primary-light text-primary",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-600",
    gray: "bg-cream-dark text-muted",
    blue: "bg-blue-50 text-blue-700",
    violet: "bg-violet-50 text-violet-700",
    orange: "bg-orange-50 text-orange-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// ─── StatusBadge ──────────────────────────────────────────────────────────────

const statusConfig = {
  placed: { label: "Order Placed", variant: "gray" },
  confirmed: { label: "Confirmed", variant: "blue" },
  preparing: { label: "Preparing", variant: "amber" },
  ready: { label: "Ready for Pickup", variant: "green" },
  rider_assigned: { label: "Rider Assigned", variant: "violet" },
  picked_up: { label: "Picked Up", variant: "violet" },
  out_for_delivery: { label: "Out for Delivery", variant: "orange" },
  delivered: { label: "Delivered", variant: "green" },
};

export function StatusBadge({ status }) {
  const { label, variant } = statusConfig[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-earth ${
        onClick
          ? "cursor-pointer hover:border-primary-muted hover:shadow-md transition-all"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-earth sticky top-0 bg-white rounded-t-3xl sm:rounded-t-2xl z-10">
          <h2 className="text-lg font-bold font-serif">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center hover:bg-earth transition-colors"
          >
            <X size={16} className="text-muted" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-cream-dark flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-base font-bold font-serif mb-1.5">{title}</h3>
      <p className="text-sm text-muted max-w-xs leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// ─── Loading ──────────────────────────────────────────────────────────────────

export function Loading() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 size={24} className="text-primary animate-spin" />
    </div>
  );
}

// ─── QuantitySelector ─────────────────────────────────────────────────────────

export function QuantitySelector({ value, onChange, step = 0.5 }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(0, +(value - step).toFixed(1)))}
        className="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center hover:bg-primary-muted transition-colors"
      >
        <Minus size={13} />
      </button>
      <span className="text-sm font-bold w-12 text-center">{value} kg</span>
      <button
        onClick={() => onChange(+(value + step).toFixed(1))}
        className="w-7 h-7 rounded-full bg-primary text-cream flex items-center justify-center hover:bg-primary-hover transition-colors"
      >
        <Plus size={13} />
      </button>
    </div>
  );
}

// ─── VegetableCard ────────────────────────────────────────────────────────────

export function VegetableCard({
  vegetable,
  farmer,
  cartItem,
  onAdd,
  onUpdateQty,
  onDetail,
}) {
  return (
    <div className="bg-white rounded-2xl border border-earth overflow-hidden flex flex-col group">
      {/* Image */}
      <button
        className="relative block w-full"
        onClick={() => onDetail?.(vegetable)}
        disabled={!onDetail}
      >
        <img
          src={`https://images.unsplash.com/${vegetable.image}?w=400&h=280&fit=crop&auto=format`}
          alt={vegetable.name}
          className="w-full h-36 object-cover bg-cream-dark transition-transform group-hover:scale-105 duration-300"
        />

        <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-cream shadow-sm">
          Harvested {vegetable.harvestedAt?.replace("Today, ", "today · ") || "today"}
        </div>

        {!vegetable.available && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="text-white text-xs font-semibold bg-foreground/70 px-3 py-1 rounded-full">
              Unavailable
            </span>
          </div>
        )}
      </button>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <button
          onClick={() => onDetail?.(vegetable)}
          className="text-left"
          disabled={!onDetail}
        >
          <h4 className="font-bold text-sm text-foreground leading-tight">
            {vegetable.name}
          </h4>
          <p className="text-xs text-muted mt-0.5 truncate">{farmer.name}</p>
        </button>
        <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-primary">
          <Leaf size={11} /> {vegetable.availableQuantity || "Fresh stock"} available
        </p>
        <p className="text-base font-bold text-primary mt-1.5">
          ₹{vegetable.pricePerKg}/kg
        </p>

        <div className="mt-auto pt-2">
          {vegetable.available ? (
            cartItem ? (
              <QuantitySelector
                value={cartItem.quantity}
                onChange={(qty) => onUpdateQty(vegetable, qty)}
              />
            ) : (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(vegetable, farmer);
                }}
                className="w-full"
              >
                <Plus size={13} /> Add
              </Button>
            )
          ) : (
            <Button
              size="sm"
              variant="ghost"
              disabled
              className="w-full text-subtle"
            >
              Out of Stock
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FarmerCard ───────────────────────────────────────────────────────────────

export function FarmerCard({
  farmer,
  vegetables: vegs,
  onClick,
  layout = "carousel",
  className = "",
}) {
  const availableVegs = vegs.filter((v) => v.available);

  if (layout === "list") {
    return (
      <button
        onClick={onClick}
        className={`w-full text-left bg-white border border-earth rounded-2xl overflow-hidden hover:border-primary-muted hover:shadow-md transition-all ${className}`}
      >
        <div className="flex gap-0">
          <div className="relative w-28 flex-shrink-0">
            <img
              src={`https://images.unsplash.com/${farmer.farmImage}?w=224&h=224&fit=crop&auto=format`}
              alt={`${farmer.name}'s farm`}
              className="w-full h-full object-cover bg-cream-dark"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
          </div>
          <div className="flex-1 p-4 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <img
                  src={`https://images.unsplash.com/${farmer.image}?w=56&h=56&fit=crop&auto=format`}
                  alt={farmer.name}
                  className="w-7 h-7 rounded-full object-cover border border-earth flex-shrink-0"
                />

                <h3 className="font-bold text-sm text-foreground leading-tight">
                  {farmer.name}
                </h3>
              </div>
              <Badge
                variant={farmer.type === "Producer" ? "green" : "amber"}
                className="flex-shrink-0"
              >
                {farmer.type === "Producer" ? "🌱 Direct Farmer" : "🏪 Local Vendor"}
              </Badge>
            </div>
            <p className="text-xs text-muted flex items-center gap-1 mb-2">
              <MapPin size={10} /> {farmer.location}
            </p>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1">
                <Star size={11} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold">{farmer.rating}</span>
                <span className="text-xs text-subtle">
                  ({farmer.reviewCount})
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Clock size={10} /> {farmer.deliveryTime}
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {availableVegs.slice(0, 3).map((v) => (
                <span
                  key={v.id}
                  className="text-xs bg-cream-dark text-muted px-2 py-0.5 rounded-full"
                >
                  {v.name}
                </span>
              ))}
              {availableVegs.length > 3 && (
                <span className="text-xs text-subtle">
                  +{availableVegs.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
    );
  }

  const containerWidthClass = layout === "grid" ? "w-full" : "w-52 flex-shrink-0";

  return (
    <button
      onClick={onClick}
      className={`${containerWidthClass} rounded-2xl overflow-hidden bg-white border border-earth hover:border-primary-muted hover:shadow-lg transition-all text-left group flex flex-col justify-between ${className}`}
    >
      <div className="w-full">
        <div className="relative h-32 sm:h-36">
          <img
            src={`https://images.unsplash.com/${farmer.farmImage}?w=416&h=256&fit=crop&auto=format`}
            alt={`${farmer.name}'s farm`}
            className="w-full h-full object-cover bg-cream-dark group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/50" />
          <div className="absolute top-2 left-2">
            <Badge variant={farmer.type === "Producer" ? "green" : "amber"}>
              {farmer.type === "Producer" ? "🌱 Direct Farmer" : "🏪 Local Vendor"}
            </Badge>
          </div>
        </div>
        <div className="p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={`https://images.unsplash.com/${farmer.image}?w=64&h=64&fit=crop&auto=format`}
              alt={farmer.name}
              className="w-10 h-10 rounded-full object-cover border border-earth shadow-sm flex-shrink-0 bg-white"
            />

            <p className="font-bold text-sm text-foreground leading-tight truncate">
              {farmer.name}
            </p>
          </div>
          <p className="text-xs text-muted flex items-center gap-1 mb-2">
            <MapPin size={11} className="text-primary-muted flex-shrink-0" /> <span className="truncate">{farmer.location}</span>
          </p>
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="font-bold">{farmer.rating}</span>
              <span className="text-subtle text-[11px]">({farmer.reviewCount})</span>
            </div>
            <span className="text-muted flex items-center gap-1 font-medium">
              <Clock size={11} /> {farmer.deliveryTime}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-earth/60">
            {availableVegs.slice(0, 2).map((v) => (
              <span
                key={v.id}
                className="text-[11px] font-medium bg-cream-dark text-foreground px-2 py-0.5 rounded-md"
              >
                {v.name}
              </span>
            ))}
            {availableVegs.length > 2 && (
              <span className="text-[11px] text-subtle font-medium self-center">
                +{availableVegs.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

export function StatCard({ label, value, sub, icon, color = "green" }) {
  const colorMap = {
    green: "bg-primary-light text-primary",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
    violet: "bg-violet-50 text-violet-600",
  };
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs text-muted mb-1">{label}</p>
          <p className="text-2xl font-bold font-serif leading-none">{value}</p>
          {sub && <p className="text-xs text-subtle mt-1">{sub}</p>}
        </div>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

// ─── OrderTimeline ────────────────────────────────────────────────────────────

const statusSteps = [
  "placed",
  "confirmed",
  "preparing",
  "ready",
  "rider_assigned",
  "picked_up",
  "out_for_delivery",
  "delivered",
];

const stepLabels = {
  placed: "Order Placed",
  confirmed: "Farmer Confirmed",
  preparing: "Preparing Order",
  ready: "Ready for Pickup",
  rider_assigned: "Rider Assigned",
  picked_up: "Picked Up",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

const stepSubs = {
  placed: "Your order has been received",
  confirmed: "Farmer has accepted your order",
  preparing: "Your vegetables are being packed",
  ready: "Order is packed and waiting for rider",
  rider_assigned: "A rider is on the way to pick up",
  picked_up: "Rider has collected your order",
  out_for_delivery: "On the way to your door",
  delivered: "Enjoy your fresh vegetables!",
};

export function OrderTimeline({ status }) {
  const currentIdx = statusSteps.indexOf(status);
  return (
    <div className="space-y-0">
      {statusSteps.map((step, idx) => {
        const done = idx < currentIdx;
        const current = idx === currentIdx;
        const future = idx > currentIdx;
        return (
          <div key={step} className="flex gap-3">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  done
                    ? "bg-primary"
                    : current
                      ? "bg-primary ring-4 ring-primary/20"
                      : "bg-earth"
                }`}
              >
                {done && <CheckCircle size={12} className="text-cream" />}
                {current && <div className="w-2 h-2 bg-cream rounded-full" />}
              </div>
              {idx < statusSteps.length - 1 && (
                <div
                  className={`w-px h-8 mt-0.5 transition-colors ${idx < currentIdx ? "bg-primary" : "bg-earth"}`}
                />
              )}
            </div>
            <div className="pb-8 flex-1">
              <p
                className={`text-sm font-semibold leading-none mb-1 ${future ? "text-subtle" : "text-foreground"}`}
              >
                {stepLabels[step]}
              </p>
              {(done || current) && (
                <p
                  className={`text-xs ${current ? "text-primary" : "text-muted"}`}
                >
                  {stepSubs[step]}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ImageUpload ──────────────────────────────────────────────────────────────

export function ImageUpload({ label, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full h-32 rounded-2xl border-2 border-dashed border-earth bg-cream-dark hover:border-primary hover:bg-primary-light transition-all flex flex-col items-center justify-center gap-2 text-muted group"
    >
      <Upload
        size={22}
        className="group-hover:text-primary transition-colors"
      />
      <span className="text-sm group-hover:text-primary transition-colors font-medium">
        {label}
      </span>
    </button>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

export function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-foreground text-cream text-sm px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 min-w-48 max-w-xs">
      <CheckCircle size={15} className="text-primary-muted flex-shrink-0" />
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-subtle hover:text-cream transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── TrustStrip ───────────────────────────────────────────────────────────────

export function TrustStrip() {
  return (
    <div className="flex items-center gap-4 overflow-x-auto scroll-none py-1">
      {[
        { icon: <ShieldCheck size={14} />, text: "No middlemen" },
        { icon: <CheckCircle size={14} />, text: "Quality checked" },
        { icon: <Star size={14} />, text: "Farmer rated" },
      ].map(({ icon, text }) => (
        <div
          key={text}
          className="flex items-center gap-1.5 text-xs text-muted flex-shrink-0"
        >
          <span className="text-primary">{icon}</span>
          {text}
        </div>
      ))}
    </div>
  );
}

