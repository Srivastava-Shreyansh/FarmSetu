import { useState, useEffect, useRef } from "react";
import { ChevronDown, ShoppingBasket, Sprout, Bike } from "lucide-react";
import { gsap } from "gsap";
import Auth from "./pages/auth/Auth";
import Consumer from "./pages/consumer/Consumer";
import Farmer from "./pages/farmer/Farmer";
import Rider from "./pages/rider/Rider";
import CustomCursor from "./components/ui/CustomCursor";

function PageTransitionWrapper({ children, pageKey }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => {
            if (containerRef.current) {
              gsap.set(containerRef.current, { clearProps: "opacity,transform" });
            }
          },
        }
      );
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageKey]);

  return <div ref={containerRef} className="min-h-screen w-full">{children}</div>;
}

export default function App() {
  const [page, setPage] = useState("auth");
  const [role, setRole] = useState(null);
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const [selectedVegetableId, setSelectedVegetableId] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navigate = (p) => setPage(p);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "consumer") navigate("consumer.home");
    else if (selectedRole === "farmer") navigate("farmer.dashboard");
    else navigate("rider.dashboard");
  };

  const handleLogout = () => {
    setRole(null);
    setCart([]);
    setSelectedFarmerId(null);
    setSelectedVegetableId(null);
    navigate("auth");
  };

  const switchRole = (nextRole) => {
    setRole(nextRole);
    setRoleMenuOpen(false);
    const landingPages = {
      consumer: "consumer.home",
      farmer: "farmer.dashboard",
      rider: "rider.dashboard",
    };
    navigate(landingPages[nextRole]);
  };

  const roleLabels = {
    consumer: { label: "Consumer", icon: ShoppingBasket },
    farmer: { label: "Farmer", icon: Sprout },
    rider: { label: "Rider", icon: Bike },
  };

  const demoSwitcher = role ? (
    <div className="fixed left-3 bottom-20 z-50">
      <button
        type="button"
        onClick={() => setRoleMenuOpen((open) => !open)}
        className="flex items-center gap-1.5 rounded-full border border-primary-muted bg-white/95 px-3 py-2 text-xs font-bold text-primary shadow-lg backdrop-blur hover:bg-primary hover:text-cream transition-colors"
        aria-label="Switch demo role"
      >
        Demo: {roleLabels[role]?.label || role} <ChevronDown size={14} />
      </button>
      <div className={`absolute bottom-full left-0 mb-2 w-44 rounded-2xl border border-earth bg-white p-1.5 shadow-xl transition-all ${roleMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"}`}>
        {Object.entries(roleLabels).map(([id, item]) => {
          const Icon = item.icon;
          return (
            <button
              type="button"
              key={id}
              onClick={() => switchRole(id)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${role === id ? "bg-primary-light font-bold text-primary" : "text-foreground hover:bg-cream-dark"}`}
            >
              <Icon size={16} /> {item.label} view
            </button>
          );
        })}
      </div>
    </div>
  ) : null;

  const renderCurrentView = () => {
    if (!role || page === "auth") {
      return <Auth onLogin={handleLogin} />;
    }

    if (role === "consumer") {
      return (
        <Consumer
          page={page}
          navigate={navigate}
          cart={cart}
          setCart={setCart}
          selectedFarmerId={selectedFarmerId}
          setSelectedFarmerId={setSelectedFarmerId}
          selectedVegetableId={selectedVegetableId}
          setSelectedVegetableId={setSelectedVegetableId}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
          onLogout={handleLogout}
        />
      );
    }

    if (role === "farmer") {
      return <Farmer page={page} navigate={navigate} onLogout={handleLogout} />;
    }

    return <Rider page={page} navigate={navigate} onLogout={handleLogout} />;
  };

  return (
    <>
      <CustomCursor />
      <PageTransitionWrapper pageKey={page}>
        {renderCurrentView()}
      </PageTransitionWrapper>
      {demoSwitcher}
    </>
  );
}
