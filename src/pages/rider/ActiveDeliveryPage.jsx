import { deliverySteps } from "../../components/rider/deliverySteps";
import { useState } from "react";
import { Leaf, Navigation, Phone, CheckCircle, Package, TrendingUp, Clock, MapPin, LogOut, ChevronRight, Bell, Star } from "lucide-react";
import { Button, Card, Badge, StatCard, EmptyState } from "../../components/ui";


export default function ActiveDeliveryPage({ navigate }) {
  const [stepIdx, setStepIdx] = useState(0);
  const current = deliverySteps[stepIdx];

  return (
    <div className="p-5 pb-24 space-y-4">
      {current.key === "delivered" ? (
        <div className="flex flex-col items-center text-center py-12">
          <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mb-4 text-5xl">
            🎉
          </div>
          <h2 className="text-2xl font-bold font-serif mb-2">Delivered!</h2>
          <p className="text-muted text-sm mb-2">
            Order #ORD1024 completed successfully.
          </p>
          <p className="text-primary font-bold text-lg mb-6">
            +₹35 added to earnings
          </p>
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={28}
                className="text-amber-400 fill-amber-400"
              />
            ))}
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate("rider.dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      ) : (
        <>
          {/* Status card */}
          <div className="bg-primary rounded-2xl p-5 text-cream">
            <p className="text-cream/70 text-xs font-medium uppercase tracking-wide mb-1">
              Current Status
            </p>
            <h3 className="text-xl font-bold font-serif">{current.label}</h3>
            <p className="text-cream/70 text-sm mt-1">{current.sub}</p>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1.5">
            {deliverySteps.slice(0, -1).map((s, i) => (
              <div
                key={s.key}
                className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                  i <= stepIdx ? "bg-primary" : "bg-earth"
                }`}
              />
            ))}
          </div>

          {/* Order info */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold font-serif">Order #ORD1024</p>
                <p className="text-xs text-muted">₹136.50 · Earnings ₹35</p>
              </div>
              <Badge variant="green">Ready for Pickup</Badge>
            </div>
            <div className="text-xs text-muted space-y-0.5">
              <p>Tomato × 2 kg — ₹84</p>
              <p>Onion × 1.5 kg — ₹52.50</p>
            </div>
          </Card>

          {/* Farmer card */}
          {(current.key === "going_to_farmer" ||
            current.key === "picked_up") && (
            <Card className="p-4">
              <p className="text-xs font-semibold text-muted mb-3 uppercase tracking-wide">
                Pickup From
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-primary-light rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  🌾
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">
                    Ramesh Patel
                  </p>
                  <p className="text-xs text-muted">
                    Producer · Anand, Gujarat
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted flex items-start gap-1.5 mb-4">
                <MapPin
                  size={12}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                Survey No. 42, Near Water Tank, Anand, Gujarat 388001
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone size={13} /> Call Farmer
                </Button>
                <Button size="sm" className="flex-1">
                  <Navigation size={13} /> Navigate
                </Button>
              </div>
            </Card>
          )}

          {/* Consumer card */}
          {current.key === "going_to_consumer" && (
            <Card className="p-4">
              <p className="text-xs font-semibold text-muted mb-3 uppercase tracking-wide">
                Deliver To
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  🛒
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">
                    Anjali Sharma
                  </p>
                  <p className="text-xs text-muted">Consumer</p>
                </div>
              </div>
              <p className="text-xs text-muted flex items-start gap-1.5 mb-4">
                <MapPin
                  size={12}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                14B, Shastri Nagar, Anand, Gujarat 388001
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone size={13} /> Call Customer
                </Button>
                <Button size="sm" className="flex-1">
                  <Navigation size={13} /> Navigate
                </Button>
              </div>
            </Card>
          )}

          {/* Action button */}
          {current.action && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-earth z-40">
              <Button
                className="w-full"
                size="lg"
                onClick={() => setStepIdx((i) => i + 1)}
              >
                <CheckCircle size={18} /> {current.action}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

