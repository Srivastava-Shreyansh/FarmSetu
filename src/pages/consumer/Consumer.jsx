import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";
import { bottomNavItems } from "../../components/consumer/bottomNavItems";
import BottomNav from "../../components/consumer/BottomNav";
import ConsumerHeader from "../../components/consumer/ConsumerHeader";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import FarmersPage from "./FarmersPage";
import ProductDetailPage from "./ProductDetailPage";
import FarmerDetailPage from "./FarmerDetailPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import ConfirmationPage from "./ConfirmationPage";
import TrackingPage from "./TrackingPage";
import HistoryPage from "./HistoryPage";
import ProfilePage, { showBottomNav } from "./ProfilePage";


const pageTitleMap = {
  "consumer.home": "Home",
  "consumer.search": "Search",
  "consumer.history": "My Orders",
  "consumer.profile": "Profile",
};
export default function Consumer({
  page,
  navigate,
  cart,
  setCart,
  selectedFarmerId,
  setSelectedFarmerId,
  selectedVegetableId,
  setSelectedVegetableId,
  selectedOrderId,
  setSelectedOrderId,
  onLogout,
}) {
  const cartCount = cart.length;
  const showBack =
    !showBottomNav.includes(page) &&
    page !== "consumer.farmers" &&
    page !== "consumer.search";

  const handleBack = () => {
    if (page === "consumer.product-detail") navigate("consumer.farmer-detail");
    else if (page === "consumer.farmer-detail") navigate("consumer.farmers");
    else if (page === "consumer.cart") navigate("consumer.farmer-detail");
    else if (page === "consumer.checkout") navigate("consumer.cart");
    else if (page === "consumer.confirmation") navigate("consumer.home");
    else if (page === "consumer.tracking") navigate("consumer.history");
    else navigate("consumer.home");
  };

  const showHeader =
    page !== "consumer.product-detail" && page !== "consumer.farmer-detail";
  // Pages that also need the back button (but not the full-bleed overlay style)
  const needsBack = showBack && showHeader;

  return (
    <div className="min-h-screen bg-cream">
      {showHeader && (
        <ConsumerHeader
          title={pageTitleMap[page]}  
          back={needsBack}
          onBack={handleBack}
          navigate={navigate}
          cartCount={cartCount}
        />
      )}

      {/* Back button overlaid for full-bleed pages */}
      {(page === "consumer.product-detail" ||
        page === "consumer.farmer-detail") && (
        <div className="fixed top-4 left-4 z-40">
          <button
            onClick={handleBack}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white transition-colors"
          >
            <ArrowLeft size={17} className="text-foreground" />
          </button>
        </div>
      )}
      {(page === "consumer.product-detail" ||
        page === "consumer.farmer-detail") && (
        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={() => navigate("consumer.cart")}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white transition-colors relative"
          >
            <ShoppingCart size={16} className="text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-cream text-xs rounded-full flex items-center justify-center font-bold leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      )}

      {page === "consumer.home" && (
        <HomePage
          navigate={navigate}
          cart={cart}
          setCart={setCart}
          setSelectedFarmerId={setSelectedFarmerId}
          setSelectedVegetableId={setSelectedVegetableId}
        />
      )}
      {page === "consumer.search" && (
        <SearchPage
          navigate={navigate}
          cart={cart}
          setCart={setCart}
          setSelectedFarmerId={setSelectedFarmerId}
          setSelectedVegetableId={setSelectedVegetableId}
        />
      )}
      {page === "consumer.farmers" && (
        <FarmersPage
          navigate={navigate}
          setSelectedFarmerId={setSelectedFarmerId}
        />
      )}
      {page === "consumer.farmer-detail" && selectedFarmerId && (
        <FarmerDetailPage
          farmerId={selectedFarmerId}
          navigate={navigate}
          cart={cart}
          setCart={setCart}
          setSelectedVegetableId={setSelectedVegetableId}
        />
      )}
      {page === "consumer.product-detail" && selectedVegetableId && (
        <ProductDetailPage
          vegetableId={selectedVegetableId}
          navigate={navigate}
          cart={cart}
          setCart={setCart}
        />
      )}
      {page === "consumer.cart" && (
        <CartPage cart={cart} setCart={setCart} navigate={navigate} />
      )}
      {page === "consumer.checkout" && (
        <CheckoutPage
          cart={cart}
          navigate={navigate}
          setSelectedOrderId={setSelectedOrderId}
          setCart={setCart}
        />
      )}
      {page === "consumer.confirmation" && (
        <ConfirmationPage navigate={navigate} />
      )}
      {page === "consumer.tracking" && <TrackingPage navigate={navigate} />}
      {page === "consumer.history" && (
        <HistoryPage
          navigate={navigate}
          setSelectedOrderId={setSelectedOrderId}
        />
      )}
      {page === "consumer.profile" && <ProfilePage onLogout={onLogout} />}

      {(showBottomNav.includes(page) || page === "consumer.farmers") && (
        <BottomNav page={page} navigate={navigate} cartCount={cartCount} />
      )}
    </div>
  );
}
