import { useState, useEffect, useRef } from "react";
import { Leaf, Navigation, Phone, CheckCircle, Package, TrendingUp, Clock, MapPin, LogOut, ChevronRight, Bell, Star } from "lucide-react";
import { gsap } from "gsap";
import { Button, Card, Badge, StatCard, EmptyState } from "../../components/ui";
import { pickupRequests } from "../../components/rider/pickupRequests";

export default function RiderDashboard({ navigate }) {
  const containerRef = useRef(null);
  const [requests, setRequests] = useState(pickupRequests);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from("[data-animate-rider]", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "opacity,transform",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const handleAccept = () => {
    setRequests([]);
    navigate("rider.delivery");
  };

  return (
    <div ref={containerRef} className="p-5 lg:p-8 max-w-7xl mx-auto w-full space-y-6 pb-24">
      {/* Greeting Banner */}
      <div data-animate-rider className="flex items-center justify-between rounded-3xl border border-earth bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb] p-6 text-cream shadow-lg">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200 backdrop-blur-sm">
            <Navigation size={14} />
            <span>Lucknow Eco-Delivery Fleet</span>
          </div>
          <h2 className="text-3xl font-extrabold font-serif leading-tight mt-2 text-white">
            Good morning, Arjun Kumar 🚴
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            Active neighborhood routes assigned for peak morning harvest deliveries.
          </p>
        </div>
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center text-3xl shadow-inner hidden sm:flex">
          🏍️
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div data-animate-rider>
          <StatCard
            label="Today's Earnings"
            value="₹480"
            sub="+₹35 pending"
            icon={<TrendingUp size={20} />}
            color="green"
          />
        </div>
        <div data-animate-rider>
          <StatCard
            label="Deliveries Today"
            value="6"
            sub="1 active route"
            icon={<Package size={20} />}
            color="blue"
          />
        </div>
        <div data-animate-rider>
          <StatCard
            label="Completed Trips"
            value="148"
            sub="All-time rating 4.9★"
            icon={<CheckCircle size={20} />}
            color="violet"
          />
        </div>
        <div data-animate-rider>
          <StatCard
            label="Avg Route Time"
            value="22 min"
            sub="Per delivery"
            icon={<Clock size={20} />}
            color="amber"
          />
        </div>
      </div>

      {/* Active delivery banner */}
      <div data-animate-rider>
        <Card
          className="border-blue-200 bg-blue-50/90 hover:bg-blue-100/80 transition-all cursor-pointer shadow-sm"
          onClick={() => navigate("rider.delivery")}
        >
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                ⚡
              </div>
              <div>
                <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                  Active Delivery In Progress
                </p>
                <p className="font-extrabold text-base text-foreground mt-0.5">
                  Order #ORD1022 — Suresh Nair
                </p>
                <p className="text-xs text-muted mt-1 flex items-center gap-1">
                  <MapPin size={13} className="text-blue-600" /> 5, Ram Nagar, Hazratganj, Lucknow
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
              <span>View Route Map</span>
              <ChevronRight size={18} />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Split: Pickup Requests & Today's Earnings Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pickup requests */}
        <div data-animate-rider className="lg:col-span-7 bg-white rounded-3xl border border-earth p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold font-serif text-xl text-foreground">Pickup Requests</h3>
              <p className="text-xs text-muted">Nearby farmers ready for batch pickup</p>
            </div>
            {requests.length > 0 && (
              <span className="px-3 py-1 bg-primary text-cream text-xs rounded-full font-bold">
                {requests.length} Requests
              </span>
            )}
          </div>

          {requests.length === 0 ? (
            <EmptyState
              icon={<Bell size={24} />}
              title="No pending requests"
              description="When a farmer pings for pickup, it will appear here."
            />
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <Card key={req.id} className="p-5 border-earth hover:border-blue-300 transition-colors">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 border-b border-earth pb-3">
                    <div>
                      <p className="font-bold font-serif text-lg text-foreground">Order #{req.id}</p>
                      <p className="text-xs text-muted mt-0.5">
                        Farmer pinged — order packed & ready at farm hub
                      </p>
                    </div>
                    <Badge variant="green">Ready for Pickup</Badge>
                  </div>

                  {/* Pickup + Deliver */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-primary-light rounded-2xl p-4 border border-primary-muted/40">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        Farmer Pickup Location
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {req.farmerName}
                      </p>
                      <p className="text-xs text-muted mt-1 leading-relaxed">
                        {req.farmerLocation}
                      </p>
                    </div>
                    <div className="bg-cream rounded-2xl p-4 border border-earth">
                      <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1.5">
                        Consumer Destination
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {req.consumerName}
                      </p>
                      <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                        {req.consumerAddress}
                      </p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted mb-4 bg-cream/50 p-3 rounded-xl border border-earth/60">
                    <span className="flex items-center gap-1 text-foreground">
                      <Navigation size={13} className="text-blue-600" /> {req.distance}
                    </span>
                    <span className="flex items-center gap-1 text-foreground">
                      <Clock size={13} className="text-amber-600" /> ~{req.estimatedTime}
                    </span>
                    <span className="ml-auto font-extrabold text-primary text-base">
                      +₹{req.earnings}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1 font-bold">
                      Decline
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-700 hover:bg-blue-800 font-bold" onClick={handleAccept}>
                      <CheckCircle size={15} /> Accept Pickup
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Earnings breakdown */}
        <div data-animate-rider className="lg:col-span-5">
          <Card className="p-6 bg-white border-earth shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-earth pb-3">
                <h3 className="font-bold font-serif text-xl text-foreground">Today's Earnings Log</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Live Shift
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { label: "ORD1019 · Delivered", amount: 32, time: "7:45 AM" },
                  { label: "ORD1020 · Delivered", amount: 40, time: "9:10 AM" },
                  { label: "ORD1021 · Delivered", amount: 35, time: "10:30 AM" },
                  {
                    label: "ORD1022 · Active Route",
                    amount: 35,
                    time: "Now",
                    pending: true,
                  },
                ].map(({ label, amount, time, pending }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between text-xs p-3 rounded-xl border border-earth/60 bg-[#fcfcf8]"
                  >
                    <div>
                      <p
                        className={`font-bold text-sm ${pending ? "text-blue-700" : "text-foreground"}`}
                      >
                        {label}
                      </p>
                      <p className="text-[11px] text-muted mt-0.5">{time}</p>
                    </div>
                    <p
                      className={`font-extrabold text-sm ${pending ? "text-muted" : "text-primary"}`}
                    >
                      {pending ? "~" : ""}₹{amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-earth pt-4 mt-6 flex justify-between items-center font-bold">
              <span className="text-sm text-foreground">Total Earned Today</span>
              <span className="text-primary text-xl font-extrabold">₹480</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
