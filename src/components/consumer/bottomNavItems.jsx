import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export const bottomNavItems = [
  { icon: Home, label: "Home", page: "consumer.home" },
  { icon: Search, label: "Search", page: "consumer.search" },
  { icon: ClipboardList, label: "Orders", page: "consumer.history" },
  { icon: User, label: "Profile", page: "consumer.profile" },
];
