import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Leaf,
  MapPin,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sprout,
  GripHorizontal,
  Users,
  CheckCircle2,
  HeartHandshake,
  X,
  FileText,
  Check,
  Zap,
  QrCode,
  Truck,
  ArrowRight,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

export default function Landing({ roles, onRoleSelect }) {
  const landingRef = useRef(null);
  const roleCardsRef = useRef(null);
  const dragBoundsRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const floatBadgeRef = useRef(null);
  const floatStatRef = useRef(null);
  const modalRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null); // null, 'pricing', 'transparency', 'routes'

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);
    const context = gsap.context(() => {
      // 1. Hero staggered entrance animation
      gsap.from("[data-hero-reveal]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "opacity,transform",
      });

      // 2. Continuous floating animation for hero badges
      if (floatBadgeRef.current) {
        gsap.to(floatBadgeRef.current, {
          y: -8,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
      if (floatStatRef.current) {
        gsap.to(floatStatRef.current, {
          y: 8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 0.5,
        });
      }

      // 3. Role cards entrance reveal
      gsap.from("[data-role-card]", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
        clearProps: "opacity,transform",
      });

      // 4. Stats section scroll animation
      gsap.from("[data-stat-card]", {
        y: 25,
        opacity: 0,
        scale: 0.97,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          once: true,
        },
        clearProps: "opacity,transform",
      });

      // 5. Value proposition feature reveals
      gsap.from("[data-feature-card]", {
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          once: true,
        },
        clearProps: "opacity,transform",
      });

      // 6. Enable GSAP Draggable when content overflows
      if (roleCardsRef.current && dragBoundsRef.current) {
        const containerWidth = dragBoundsRef.current.clientWidth;
        const contentWidth = roleCardsRef.current.scrollWidth;

        if (contentWidth > containerWidth + 10) {
          Draggable.create(roleCardsRef.current, {
            type: "x",
            bounds: {
              minX: -(contentWidth - containerWidth + 20),
              maxX: 0,
            },
            edgeResistance: 0.75,
            dragClickables: true,
            onDragStart: () => setIsDragging(true),
            onDragEnd: () => setTimeout(() => setIsDragging(false), 50),
          });
        }
      }
    }, landingRef);

    return () => context.revert();
  }, []);

  // Modal open animation
  useEffect(() => {
    if (selectedDoc && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.92, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.4)" }
      );
    }
  }, [selectedDoc]);

  const stats = [
    { label: "Direct Farm Payout", value: "100%", subtext: "Zero middleman commissions", icon: TrendingUp },
    { label: "Harvest to Door", value: "< 24 Hrs", subtext: "Hyper-local cold chain speed", icon: Clock },
    { label: "Local Farm Partners", value: "500+", subtext: "Verified local growers", icon: Users },
    { label: "Freshness Index", value: "4.95 / 5", subtext: "Rated by local households", icon: ShieldCheck },
  ];

  const docsData = {
    pricing: {
      id: "pricing",
      step: "01",
      title: "Farm-First Fair Pricing",
      tagline: "Direct-to-consumer economic model with zero intermediary markups.",
      icon: HeartHandshake,
      accent: "bg-[#e8f3ee] text-[#1e4d3b] border-[#c1dccc]",
      overview:
        "Conventional supply chains pass produce through 4–6 middlemen, inflating retail prices by up to 150% while leaving growers with less than 25% of the final sale. FarmSetu eliminates unnecessary intermediaries through direct digital contracts.",
      pillars: [
        {
          title: "0% Commission Cut",
          desc: "95%+ of every rupee spent by the consumer flows directly to the farmer's verified bank account via instant UPI settlements.",
        },
        {
          title: "Fair Market Benchmarks",
          desc: "Our automated pricing engine cross-references regional mandi rates to ensure consumers pay 15–20% below retail store prices while farmers earn 30–40% above wholesale.",
        },
        {
          title: "Seasonal Price Guarantee",
          desc: "Protects households against artificial inflation spikes while guaranteeing minimum support margins for local growers.",
        },
      ],
      metrics: [
        { label: "Farmer Earnings", value: "+38%" },
        { label: "Consumer Savings", value: "18%" },
        { label: "Middleman Take", value: "0%" },
      ],
    },
    transparency: {
      id: "transparency",
      step: "02",
      title: "Harvest Transparency & Verification",
      tagline: "Complete traceability from the exact field plot to your kitchen counter.",
      icon: Sprout,
      accent: "bg-amber-50 text-amber-800 border-amber-200",
      overview:
        "Every item listed on FarmSetu carries a verified digital passport. Know exactly who grew your food, when it was picked from the soil, and how it was harvested without chemical ripening agents.",
      pillars: [
        {
          title: "QR Code Traceability",
          desc: "Each produce bag is tagged at the farm gate. Scan the QR code on delivery to see harvest timestamps, farm GPS coordinates, and grower photos.",
        },
        {
          title: "Field Harvest Verification",
          desc: "Local field agents verify that vegetables are harvested at peak natural maturity without artificial acceleration or synthetic dyes.",
        },
        {
          title: "Organic & Soil Health Logs",
          desc: "Access verified soil testing reports, irrigation water purity certificates, and zero-pesticide compliance badges directly on your screen.",
        },
      ],
      metrics: [
        { label: "Traceability", value: "100%" },
        { label: "Harvest Window", value: "Same-Day" },
        { label: "Verified Farms", value: "500+" },
      ],
    },
    routes: {
      id: "routes",
      step: "03",
      title: "Optimized Local Routes",
      tagline: "Hyper-local eco-friendly cold chain delivery within 24 hours of harvest.",
      icon: CheckCircle2,
      accent: "bg-blue-50 text-blue-800 border-blue-200",
      overview:
        "FarmSetu operates neighborhood dispatch hubs that aggregate orders within a 5-kilometer radius. Our intelligent routing engine pairs local riders with batch deliveries to maximize speed and freshness.",
      pillars: [
        {
          title: "Batch Neighborhood Dispatch",
          desc: "Orders are grouped by locality to eliminate redundant transit loops and ensure produce reaches consumers within hours of field collection.",
        },
        {
          title: "Zero-Emission Rider Fleet",
          desc: "Our delivery network prioritizes electric two-wheelers and bicycles, reducing carbon emissions by up to 80% compared to traditional logistics.",
        },
        {
          title: "<24h Harvest-to-Table Promise",
          desc: "Vegetables picked at 5:00 AM are delivered to households before dinner, retaining maximum nutrients, natural crunch, and vibrant flavor.",
        },
      ],
      metrics: [
        { label: "Avg Delivery Time", value: "45 Mins" },
        { label: "Carbon Reduction", value: "80%" },
        { label: "Freshness Retention", value: "99%" },
      ],
    },
  };

  const features = [
    {
      id: "pricing",
      step: "01",
      title: "Farm-First Fair Pricing",
      desc: "Direct-to-consumer transactions ensure farmers earn higher income while consumers pay honest market rates.",
      icon: HeartHandshake,
      accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "transparency",
      step: "02",
      title: "Harvest Transparency",
      desc: "Every produce item comes with verified harvest timestamp and grower profile info direct from local fields.",
      icon: Sprout,
      accent: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "routes",
      step: "03",
      title: "Optimized Local Routes",
      desc: "Eco-friendly rider dispatch minimizes transit time and keeps produce crisp from field to kitchen.",
      icon: CheckCircle2,
      accent: "bg-blue-50 text-blue-700 border-blue-200",
    },
  ];

  return (
    <div ref={landingRef} className="min-h-screen overflow-x-hidden bg-[#f9f8f4] text-foreground font-sans selection:bg-[#1e4d3b] selection:text-cream">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[660px] overflow-hidden bg-primary px-5 pb-20 pt-8 text-cream sm:px-10 lg:px-16">
        {/* Background Image with Layered Gradients */}
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1800&auto=format&fit=crop"
          alt="Fresh cultivated green farm fields"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#103d2d] via-primary/95 to-[#163d2e]" />
        
        {/* Geometric Organic Accent Shapes */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute top-1/2 -left-28 h-80 w-80 rounded-full bg-[#d8e9b6]/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col">
          {/* Header Navigation Bar */}
          <header data-hero-reveal className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 border-b border-white/15 pb-6">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-left cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/10 shadow-inner backdrop-blur-md">
                <Leaf size={22} className="text-[#d8e9b6]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">FarmSetu</span>
                <span className="ml-2 hidden rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#d8e9b6] uppercase sm:inline-block">
                  AgriTech
                </span>
              </div>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <MapPin size={13} className="text-[#d8e9b6]" />
                <span className="text-cream/90">Lucknow, Uttar Pradesh</span>
              </div>
            </div>
          </header>

          {/* Hero Main Content */}
          <div className="relative mt-14 max-w-3xl lg:mt-20">
            <div data-hero-reveal className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8e9b6]/30 bg-[#d8e9b6]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#d8e9b6] backdrop-blur-sm">
              <Sparkles size={14} className="text-[#d8e9b6]" />
              <span>Direct Farm-to-Home Network</span>
            </div>

            <h1 data-hero-reveal className="font-serif text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Harvested with care. <br />
              <span className="italic font-normal text-[#d8e9b6]">Delivered with purpose.</span>
            </h1>

            <p data-hero-reveal className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              FarmSetu connects local farmers, conscious households, and delivery partners in one transparent food ecosystem — eliminating middlemen for fair prices and peak produce freshness.
            </p>

            <div data-hero-reveal className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#choose-role"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#d8e9b6] px-6 py-3.5 text-sm font-bold text-primary shadow-lg transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Started Now</span>
                <ChevronRight size={16} />
              </a>
              <div className="flex items-center gap-2 text-xs font-medium text-cream/70">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>100% Verified Local Produce</span>
              </div>
            </div>
          </div>

          {/* Floating Hero Micro-Badges */}
          <div
            ref={floatBadgeRef}
            className="pointer-events-none absolute right-4 top-36 hidden rounded-2xl border border-white/20 bg-white/15 p-3.5 backdrop-blur-md shadow-2xl lg:flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
              <Sprout size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Fresh Morning Harvest</p>
              <p className="text-[11px] text-cream/75">Direct from Lucknow farms</p>
            </div>
          </div>

          <div
            ref={floatStatRef}
            className="pointer-events-none absolute -right-4 bottom-6 hidden rounded-2xl border border-white/20 bg-white/15 p-3.5 backdrop-blur-md shadow-2xl lg:flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">0% Middleman Cut</p>
              <p className="text-[11px] text-cream/75">Fair earnings for growers</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROLE SELECTION SECTION --- */}
      <section id="choose-role" className="relative mx-auto -mt-12 max-w-6xl px-5 pb-20 sm:px-8">
        <div className="rounded-[2.5rem] border border-earth bg-white p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <Sprout size={14} />
                <span>Choose your role</span>
              </div>
              <h2 className="mt-1 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                How will you engage with FarmSetu?
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-earth bg-cream px-3.5 py-1.5 text-xs font-bold text-muted">
              <GripHorizontal size={15} className="text-primary" />
              <span>Select a role to proceed</span>
            </div>
          </div>

          {/* Role Cards Grid Container */}
          <div ref={dragBoundsRef} className="overflow-hidden py-1">
            <div
              ref={roleCardsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
            >
              {roles && roles.length > 0 ? (
                roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      type="button"
                      data-role-card
                      key={role.id}
                      onClick={() => {
                        if (!isDragging) onRoleSelect(role.id);
                      }}
                      className="group relative flex flex-col justify-between rounded-2xl border border-earth bg-[#fcfcf8] p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-muted hover:shadow-xl active:scale-[0.98] cursor-pointer min-h-[220px]"
                    >
                      <div>
                        <div className="mb-6 flex items-start justify-between">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ${role.color || "bg-primary-light text-primary"}`}>
                            {Icon && <Icon size={24} />}
                          </div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-earth-dark group-hover:bg-primary group-hover:text-cream transition-colors">
                            <ArrowUpRight size={18} />
                          </span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-foreground">
                          {role.label}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {role.desc}
                        </p>
                      </div>

                      <div className="mt-8 border-t border-earth/60 pt-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-primary group-hover:underline">
                          Continue as {role.label.split(" /")[0]}
                        </span>
                        <ChevronRight size={15} className="text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-3 text-center py-8 text-muted">Loading roles...</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- LIVE NETWORK STATS SECTION (ScrollTrigger) --- */}
      <section ref={statsRef} className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                data-stat-card
                key={i}
                className="rounded-2xl border border-earth bg-white p-6 shadow-sm transition-all hover:border-primary-muted hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    {stat.label}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Icon size={18} />
                  </div>
                </div>
                <p className="mt-4 font-serif text-3xl font-extrabold text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-muted">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- VALUE PROPOSITION SECTION (ScrollTrigger) --- */}
      <section ref={featuresRef} className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Why FarmSetu
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl text-foreground">
            Built for local resilience & fresh quality
          </h2>
          <p className="mt-3 text-sm text-muted">
            Transforming how agricultural produce flows from fields directly to your dining table.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                data-feature-card
                key={item.step}
                className="relative overflow-hidden rounded-2xl border border-earth bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-extrabold text-primary-muted">
                      {item.step}
                    </span>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.accent}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-earth/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(item.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    <span>Get Documentation</span>
                    <ChevronRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(item.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-cream text-primary hover:bg-primary hover:text-cream transition-colors"
                  >
                    <FileText size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- FOOTER SECTION WITH TOPIC ROUTES --- */}
      <footer className="border-t border-earth bg-cream-dark px-5 py-14 text-xs text-muted sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 pb-10 sm:grid-cols-2 md:grid-cols-4 border-b border-earth/80">
            {/* Brand column */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 font-serif text-lg font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Leaf size={20} />
                <span>FarmSetu</span>
              </button>
              <p className="text-xs leading-relaxed text-muted max-w-xs">
                Empowering regional farmers, delivering fresh morning harvests, and streamlining local delivery logistics.
              </p>
            </div>

            {/* Core Documentation Routes */}
            <div>
              <p className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
                Core Initiatives
              </p>
              <ul className="space-y-2 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedDoc("pricing")}
                    className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Farm-First Fair Pricing</span>
                    <ChevronRight size={12} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedDoc("transparency")}
                    className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Harvest Transparency</span>
                    <ChevronRight size={12} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedDoc("routes")}
                    className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Optimized Local Routes</span>
                    <ChevronRight size={12} />
                  </button>
                </li>
              </ul>
            </div>

            {/* Roles Quick Access */}
            <div>
              <p className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
                Ecosystem Roles
              </p>
              <ul className="space-y-2 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => onRoleSelect("consumer")}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Consumer Hub & Market
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onRoleSelect("farmer")}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Farmer & Vendor Portal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onRoleSelect("rider")}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Delivery Partner Network
                  </button>
                </li>
              </ul>
            </div>

            {/* Hub info */}
            <div>
              <p className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
                Regional Operating Hub
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Central Agri Hub <br />
                Lucknow, Uttar Pradesh, India
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Local Network
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-muted">
            <p>© {new Date().getFullYear()} FarmSetu Platform. Lucknow, Uttar Pradesh, India. All rights reserved.</p>
            <div className="flex items-center gap-4 font-medium text-foreground">
              <span>Direct Farm Network</span>
              <span>•</span>
              <span>Zero Middleman</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FEATURE DOCUMENTATION MODAL --- */}
      {selectedDoc && docsData[selectedDoc] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-earth bg-white p-6 shadow-2xl sm:p-8"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedDoc(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-muted hover:bg-earth hover:text-foreground transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            {(() => {
              const doc = docsData[selectedDoc];
              const Icon = doc.icon;
              return (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-serif text-2xl font-bold text-primary-muted">
                      {doc.step}
                    </span>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${doc.accent}`}>
                      <Icon size={20} />
                    </div>
                    <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">
                      Product Architecture
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                    {doc.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {doc.tagline}
                  </p>

                  {/* Overview */}
                  <div className="mt-5 rounded-2xl bg-cream p-4 border border-earth/70 text-sm leading-relaxed text-foreground">
                    <p className="font-medium">{doc.overview}</p>
                  </div>

                  {/* Key Metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {doc.metrics.map((m, idx) => (
                      <div key={idx} className="rounded-xl border border-earth bg-[#fcfcf8] p-3 text-center">
                        <p className="font-serif text-xl font-extrabold text-primary">
                          {m.value}
                        </p>
                        <p className="text-[11px] font-semibold text-muted mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Pillars */}
                  <div className="mt-6 space-y-4">
                    <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                      <FileText size={18} className="text-primary" />
                      How FarmSetu Implements This:
                    </h3>
                    <div className="space-y-3">
                      {doc.pillars.map((pillar, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 rounded-xl border border-earth/60 bg-white p-4 shadow-sm"
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                            <Check size={14} />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-foreground">
                              {pillar.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted">
                              {pillar.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-earth pt-5">
                    <p className="text-xs text-muted font-medium">
                      Ready to experience transparent farm-to-table delivery?
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDoc(null);
                        const roleSection = document.getElementById("choose-role");
                        if (roleSection) roleSection.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-cream shadow hover:bg-primary-hover transition-colors cursor-pointer"
                    >
                      <span>Choose Role & Get Started</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
