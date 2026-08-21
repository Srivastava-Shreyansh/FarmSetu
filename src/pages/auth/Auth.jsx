import { useState } from "react";
import {
  Leaf,
  ChevronRight,
  ArrowLeft,
  ShoppingCart,
  Sprout,
  Truck,
  ShieldCheck,
  Zap,
  TrendingUp,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input } from "../../components/ui";
import Landing from "./Landing";

const roles = [
  {
    id: "consumer",
    label: "Consumer",
    desc: "Browse fresh produce direct from local farmers",
    icon: ShoppingCart,
    badge: "Consumer Market",
    color: "bg-emerald-50 border-emerald-200 text-emerald-800",
    gradient: "from-[#103d2d] via-[#1e4d3b] to-[#2d6a4f]",
    accentText: "text-[#d8e9b6]",
    bannerImg: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&auto=format&fit=crop",
    perks: [
      "Harvested daily from local Lucknow farms",
      "0% artificial ripening or chemical dyes",
      "Direct farm pricing with same-day delivery",
    ],
  },
  {
    id: "farmer",
    label: "Farmer / Vendor",
    desc: "List your produce and manage direct orders",
    icon: Sprout,
    badge: "Grower Portal",
    color: "bg-amber-50 border-amber-200 text-amber-900",
    gradient: "from-[#78350f] via-[#b45309] to-[#d97706]",
    accentText: "text-amber-200",
    bannerImg: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&auto=format&fit=crop",
    perks: [
      "95%+ of purchase price paid directly to you",
      "Instant UPI settlements on completed orders",
      "Free access to local demand analytics & crop pricing",
    ],
  },
  {
    id: "rider",
    label: "Delivery Rider",
    desc: "Pick up and deliver fresh neighborhood orders",
    icon: Truck,
    badge: "Rider Network",
    color: "bg-blue-50 border-blue-200 text-blue-900",
    gradient: "from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb]",
    accentText: "text-blue-200",
    bannerImg: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1000&auto=format&fit=crop",
    perks: [
      "Flexible delivery shifts within 5 km radius",
      "Competitive per-order earnings + daily bonuses",
      "Eco-friendly route optimization for max efficiency",
    ],
  },
];

// --- Zod Schemas ---
const loginSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, "Mobile must be exactly 10 digits"),
});

const signupConsumerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile must be exactly 10 digits"),
  address: z.string().min(5, "Delivery address is required"),
});

const signupFarmerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile must be exactly 10 digits"),
  type: z.enum(["PRODUCER", "LOCAL_VENDOR"], { required_error: "Select seller type" }),
  location: z.string().min(3, "Farm location is required"),
});

const signupRiderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile must be exactly 10 digits"),
  vehicle: z.string().min(2, "Vehicle type & registration required"),
});

export default function Auth({ onLogin }) {
  const [step, setStep] = useState("role"); // role, login, signup, otp
  const [selectedRole, setSelectedRole] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [mobileForOtp, setMobileForOtp] = useState("");
  const [otp, setOtp] = useState("");

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: registerConsumer,
    handleSubmit: handleConsumerSubmit,
    formState: { errors: consumerErrors },
  } = useForm({ resolver: zodResolver(signupConsumerSchema) });

  const {
    register: registerFarmer,
    handleSubmit: handleFarmerSubmit,
    formState: { errors: farmerErrors },
  } = useForm({ resolver: zodResolver(signupFarmerSchema) });

  const {
    register: registerRider,
    handleSubmit: handleRiderSubmit,
    formState: { errors: riderErrors },
  } = useForm({ resolver: zodResolver(signupRiderSchema) });

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setStep("login");
    setAuthMode("login");
  };

  const onAuthSuccess = (data) => {
    setMobileForOtp(data.mobile);
    setStep("otp");
  };

  const handleFinalLogin = () => {
    if (selectedRole) onLogin(selectedRole);
  };

  const roleInfo = roles.find((r) => r.id === selectedRole) || roles[0];
  const RoleIcon = roleInfo.icon;

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-cream flex flex-col justify-center items-center px-5 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl border border-earth p-8 shadow-2xl">
          <button
            onClick={() => setStep(authMode)}
            className="flex items-center gap-2 text-muted text-xs font-bold mb-6 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to {authMode}
          </button>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary mb-4">
            <Lock size={22} />
          </div>

          <h1 className="text-2xl font-bold font-serif text-foreground">Verify Mobile Number</h1>
          <p className="text-muted text-xs mt-1 mb-6">
            Enter 6-digit OTP code sent to <span className="font-bold text-foreground">+91 {mobileForOtp || "9876543210"}</span>
          </p>

          <div className="space-y-4">
            <Input
              label="Enter 6-Digit OTP"
              type="tel"
              placeholder="• • • • • •"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              className="text-center tracking-widest text-xl font-bold font-mono"
            />
            
            <Button
              className="w-full bg-primary hover:bg-primary-hover py-3 text-sm font-bold cursor-pointer"
              size="lg"
              onClick={handleFinalLogin}
            >
              Verify & Enter {roleInfo.label} Portal
            </Button>

            <button
              className="w-full text-xs text-muted font-bold text-center py-2 hover:text-primary transition-colors cursor-pointer"
              onClick={handleFinalLogin}
            >
              🚀 Skip verification (Instant Demo Mode)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "login" || step === "signup") {
    return (
      <div className="min-h-screen bg-cream flex flex-col justify-between">
        {/* Top Navbar */}
        <header className="px-6 py-4 bg-white/80 border-b border-earth backdrop-blur-md flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep("role")}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-cream">
              <Leaf size={16} />
            </div>
            <span className="font-bold font-serif text-lg text-foreground tracking-tight">
              FarmSetu
            </span>
          </button>

          <button
            onClick={() => setStep("role")}
            className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Switch Role
          </button>
        </header>

        {/* Main Auth Split Container */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-4xl bg-white rounded-3xl border border-earth shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
            
            {/* Left Column: Role-Themed Hero Banner */}
            <div className={`lg:col-span-5 relative bg-gradient-to-br ${roleInfo.gradient} p-8 text-cream flex flex-col justify-between overflow-hidden`}>
              <img
                src={roleInfo.bannerImg}
                alt={roleInfo.label}
                className="absolute inset-0 h-full w-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold backdrop-blur-md">
                  <RoleIcon size={14} className={roleInfo.accentText} />
                  <span>{roleInfo.badge}</span>
                </div>
                <h2 className="mt-6 font-serif text-3xl font-extrabold text-white leading-tight">
                  {roleInfo.label} Access
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-cream/80">
                  {roleInfo.desc}
                </p>
              </div>

              {/* Role Perks List */}
              <div className="relative z-10 mt-8 space-y-3">
                {roleInfo.perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 size={15} className={`flex-shrink-0 mt-0.5 ${roleInfo.accentText}`} />
                    <span className="text-cream/90 font-medium">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Form Interface */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                {/* Form Mode Toggle */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-earth">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      {authMode === "login" ? `Sign In as ${roleInfo.label}` : `Create ${roleInfo.label} Account`}
                    </h3>
                    <p className="text-xs text-muted mt-1">
                      {authMode === "login"
                        ? "Enter your mobile number to receive OTP"
                        : "Fill in your profile details to register on FarmSetu"}
                    </p>
                  </div>
                  <span className={`hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${roleInfo.color}`}>
                    <RoleIcon size={13} /> {roleInfo.label}
                  </span>
                </div>

                {/* LOGIN FORM */}
                {authMode === "login" ? (
                  <form onSubmit={handleLoginSubmit(onAuthSuccess)} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                        10-Digit Mobile Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-sm font-bold text-muted">+91</span>
                        <input
                          type="tel"
                          placeholder="9876543210"
                          maxLength={10}
                          className="w-full h-11 pl-13 pr-4 bg-cream/50 border border-earth rounded-xl text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-all"
                          {...registerLogin("mobile")}
                        />
                      </div>
                      {loginErrors.mobile && (
                        <p className="text-xs font-semibold text-red-500 mt-1">{loginErrors.mobile.message}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary-hover py-3 text-sm font-bold shadow-md" size="lg">
                      <span>Send OTP Code</span>
                      <ArrowRight size={16} />
                    </Button>
                  </form>
                ) : (
                  /* SIGNUP FORMS */
                  <div className="space-y-4">
                    {/* Consumer Signup */}
                    {selectedRole === "consumer" && (
                      <form onSubmit={handleConsumerSubmit(onAuthSuccess)} className="space-y-4">
                        <Input label="Full Name" placeholder="e.g. Ramesh Sharma" error={consumerErrors.name?.message} {...registerConsumer("name")} />
                        <Input label="Mobile Number" type="tel" placeholder="9876543210" error={consumerErrors.mobile?.message} {...registerConsumer("mobile")} />
                        <Input label="Delivery Address in Lucknow" placeholder="123 Park Road, Hazratganj, Lucknow" error={consumerErrors.address?.message} {...registerConsumer("address")} />
                        <Button type="submit" className="w-full bg-primary hover:bg-primary-hover py-3 text-sm font-bold" size="lg">
                          Complete Consumer Registration
                        </Button>
                      </form>
                    )}

                    {/* Farmer Signup */}
                    {selectedRole === "farmer" && (
                      <form onSubmit={handleFarmerSubmit(onAuthSuccess)} className="space-y-4">
                        <Input label="Full Name / Vendor Name" placeholder="e.g. Balram Singh" error={farmerErrors.name?.message} {...registerFarmer("name")} />
                        <Input label="Mobile Number" type="tel" placeholder="9876543210" error={farmerErrors.mobile?.message} {...registerFarmer("mobile")} />
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-foreground uppercase tracking-wider">Seller Classification</label>
                          <select
                            className="w-full h-11 px-3 bg-cream/50 border border-earth rounded-xl text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white"
                            {...registerFarmer("type")}
                          >
                            <option value="">Select seller type...</option>
                            <option value="PRODUCER">Producer (Direct Farmer)</option>
                            <option value="LOCAL_VENDOR">Local Agri Vendor / Aggregator</option>
                          </select>
                          {farmerErrors.type && <p className="text-xs font-semibold text-red-500 mt-1">{farmerErrors.type.message}</p>}
                        </div>
                        <Input label="Farm Location / Village" placeholder="e.g. Village Bakshi Ka Talab, Lucknow" error={farmerErrors.location?.message} {...registerFarmer("location")} />
                        <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 text-sm font-bold" size="lg">
                          Register as Farmer / Vendor
                        </Button>
                      </form>
                    )}

                    {/* Rider Signup */}
                    {selectedRole === "rider" && (
                      <form onSubmit={handleRiderSubmit(onAuthSuccess)} className="space-y-4">
                        <Input label="Full Name" placeholder="e.g. Ajay Kumar" error={riderErrors.name?.message} {...registerRider("name")} />
                        <Input label="Mobile Number" type="tel" placeholder="9876543210" error={riderErrors.mobile?.message} {...registerRider("mobile")} />
                        <Input label="Vehicle Type & Reg No." placeholder="e.g. Honda EV Scooter - UP32 XX 5678" error={riderErrors.vehicle?.message} {...registerRider("vehicle")} />
                        <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 text-sm font-bold" size="lg">
                          Register as Delivery Partner
                        </Button>
                      </form>
                    )}
                  </div>
                )}
              </div>

              {/* Mode Switch Footer Link */}
              <div className="mt-8 pt-4 border-t border-earth text-center">
                {authMode === "login" ? (
                  <p className="text-xs text-muted font-medium">
                    Don't have a {roleInfo.label} account?{" "}
                    <button
                      type="button"
                      className="text-primary font-bold hover:underline cursor-pointer"
                      onClick={() => setAuthMode("signup")}
                    >
                      Create account now →
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-muted font-medium">
                    Already registered as {roleInfo.label}?{" "}
                    <button
                      type="button"
                      className="text-primary font-bold hover:underline cursor-pointer"
                      onClick={() => setAuthMode("login")}
                    >
                      Sign in here →
                    </button>
                  </p>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    );
  }

  return <Landing roles={roles} onRoleSelect={handleRoleSelect} />;
}
