import { useState } from "react";
import { Leaf, Navigation, Phone, CheckCircle, Package, TrendingUp, Clock, MapPin, LogOut, ChevronRight, Bell, Star } from "lucide-react";
import { Button, Card, Badge, StatCard, EmptyState } from "../../components/ui";


export const deliverySteps = [
  {
    key: "going_to_farmer",
    label: "Navigate to Farmer",
    sub: "Head to pickup location",
    action: "Confirm Pickup",
  },
  {
    key: "picked_up",
    label: "Order Picked Up",
    sub: "Items collected",
    action: "Start Delivery",
  },
  {
    key: "going_to_consumer",
    label: "En Route to Consumer",
    sub: "Heading to drop-off",
    action: "Confirm Delivery",
  },
  {
    key: "delivered",
    label: "Delivered! 🎉",
    sub: "Order completed",
    action: null,
  },
];
