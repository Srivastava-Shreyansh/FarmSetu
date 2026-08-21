import { useState } from "react";
import { Leaf, Navigation, Phone, CheckCircle, Package, TrendingUp, Clock, MapPin, LogOut, ChevronRight, Bell, Star } from "lucide-react";
import { Button, Card, Badge, StatCard, EmptyState } from "../../components/ui";


export const pickupRequests = [
  {
    id: "ORD1024",
    farmerName: "Ramesh Patel",
    farmerLocation: "Survey No. 42, Anand, Gujarat",
    farmerMobile: "9876543210",
    consumerName: "Anjali Sharma",
    consumerAddress: "14B, Shastri Nagar, Anand, Gujarat 388001",
    consumerMobile: "9898765432",
    items: "Tomato (2 kg) · Onion (1.5 kg)",
    batchSummary: "Batch A · 2 nearby orders · 4.5 kg total",
    total: 136.5,
    distance: "3.2 km",
    estimatedTime: "25 min",
    status: "ready",
    earnings: 35,
  },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────
