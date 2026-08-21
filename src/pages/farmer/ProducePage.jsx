import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Sprout,
  Wallet,
  LogOut,
  Menu,
  Plus,
  Edit2,
  Trash2,
  Bell,
  TrendingUp,
  Package,
  CheckCircle,
  Leaf,
  ChevronRight,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { gsap } from "gsap";
import { farmers, farmerOrders, walletTransactions, getVegetablesByFarmer } from "../../constants/data";
import { Button, Card, Badge, StatusBadge, StatCard, Modal, EmptyState, ImageUpload } from "../../components/ui";

export default function ProducePage() {
  const containerRef = useRef(null);
  const [vegs, setVegs] = useState(getVegetablesByFarmer("f1"));
  const [editTarget, setEditTarget] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [newVeg, setNewVeg] = useState({ name: "", pricePerKg: "", quantity: "", harvestedAt: "Today, 07:10 AM" });

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll("[data-animate-produce]");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all",
          }
        );
      }
    }
  }, [vegs.length]);

  const handleToggle = (id) =>
    setVegs((prev) =>
      prev.map((v) => (v.id === id ? { ...v, available: !v.available } : v)),
    );

  const handleDelete = (id) => {
    setVegs((prev) => prev.filter((v) => v.id !== id));
    setDeleteId(null);
  };

  const handleSaveEdit = () => {
    if (!editTarget) return;
    setVegs((prev) =>
      prev.map((v) =>
        v.id === editTarget.id
          ? {
              ...v,
              name: editTarget.name,
              pricePerKg: editTarget.pricePerKg,
              available: editTarget.available,
            }
          : v,
      ),
    );
    setEditTarget(null);
  };

  const handleAdd = () => {
    const price = Number(newVeg.pricePerKg);
    if (!newVeg.name || !price) return;
    setVegs((prev) => [
      ...prev,
      {
        id: `v${Date.now()}`,
        name: newVeg.name,
        image: "photo-1576045057995-568f588f82fb",
        pricePerKg: price,
        availableQuantity: `${newVeg.quantity || 10} kg`,
        harvestedAt: newVeg.harvestedAt,
        available: true,
        farmerId: "f1",
      },
    ]);
    setNewVeg({ name: "", pricePerKg: "", quantity: "", harvestedAt: "Today, 07:10 AM" });
    setShowAdd(false);
  };

  const available = vegs.filter((v) => v.available).length;

  return (
    <div ref={containerRef} className="p-5 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-earth shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Produce Inventory</h2>
          <p className="text-xs text-muted mt-1">
            {available} of {vegs.length} crop items currently active for direct consumer sales
          </p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)} className="bg-primary hover:bg-primary-hover font-bold py-2.5">
          <Plus size={15} /> Add New Crop Listing
        </Button>
      </div>

      {vegs.length === 0 ? (
        <EmptyState
          icon={<Sprout size={28} />}
          title="No produce listed"
          description="Add your first vegetable to start receiving orders from consumers."
          action={
            <Button size="sm" onClick={() => setShowAdd(true)}>
              <Plus size={14} /> Add Vegetable
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {vegs.map((v) => (
            <div data-animate-produce key={v.id}>
              <Card className="overflow-hidden border-earth hover:border-primary-muted transition-all shadow-sm">
                <div className="relative h-44">
                  <img
                    src={`https://images.unsplash.com/${v.image}?w=500&h=350&fit=crop&auto=format`}
                    alt={v.name}
                    className="w-full h-full object-cover bg-cream-dark"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-cream shadow-sm">
                    Harvested {v.harvestedAt || "today"}
                  </div>

                  {!v.available && (
                    <div className="absolute inset-0 bg-foreground/60 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="text-cream text-xs font-bold bg-foreground/90 px-3.5 py-1.5 rounded-full">
                        Hidden from Market
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <button
                      onClick={() =>
                        setEditTarget({
                          id: v.id,
                          name: v.name,
                          pricePerKg: v.pricePerKg,
                          available: v.available,
                        })
                      }
                      className="w-8 h-8 bg-white/95 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
                    >
                      <Edit2 size={14} className="text-foreground" />
                    </button>
                    <button
                      onClick={() => setDeleteId(v.id)}
                      className="w-8 h-8 bg-white/95 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-base text-foreground">{v.name}</p>
                    <p className="text-primary font-extrabold text-base">
                      ₹{v.pricePerKg}/kg
                    </p>
                    <p className="text-xs text-muted mt-0.5">{v.availableQuantity || "Fresh stock"} available</p>
                  </div>
                  <button
                    onClick={() => handleToggle(v.id)}
                    className={`flex-shrink-0 text-xs px-3.5 py-1.5 rounded-full font-bold border transition-colors cursor-pointer ${
                      v.available
                        ? "bg-primary-light text-primary border-primary-muted hover:bg-primary-muted"
                        : "bg-cream-dark text-muted border-earth hover:bg-earth"
                    }`}
                  >
                    {v.available ? "Listed" : "Hidden"}
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Edit Vegetable Listing"
      >
        {editTarget && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-foreground tracking-wider mb-1.5 block">
                Vegetable Name
              </label>
              <input
                value={editTarget.name}
                onChange={(e) =>
                  setEditTarget({ ...editTarget, name: e.target.value })
                }
                className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-foreground tracking-wider mb-1.5 block">
                Price per kg (₹)
              </label>
              <input
                type="number"
                value={editTarget.pricePerKg}
                onChange={(e) =>
                  setEditTarget({
                    ...editTarget,
                    pricePerKg: Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-foreground tracking-wider mb-1.5 block">
                Listing Availability
              </label>
              <div className="flex gap-2">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    onClick={() =>
                      setEditTarget({ ...editTarget, available: val })
                    }
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      editTarget.available === val
                        ? "bg-primary text-cream border-primary"
                        : "bg-cream-dark text-muted border-earth hover:border-primary-muted"
                    }`}
                  >
                    {val ? "✓ Listed on Market" : "✗ Hidden from Consumers"}
                  </button>
                ))}
              </div>
            </div>
            <ImageUpload label="Change vegetable photo" onSelect={() => {}} />
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1 font-bold"
                onClick={() => setEditTarget(null)}
              >
                Cancel
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary-hover font-bold" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add modal */}
      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add New Crop Listing"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-foreground tracking-wider mb-1.5 block">
              Vegetable / Produce Name
            </label>
            <input
              placeholder="e.g., Desi Tomato, Spinach, Brinjal"
              value={newVeg.name}
              onChange={(e) => setNewVeg({ ...newVeg, name: e.target.value })}
              className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-foreground tracking-wider mb-1.5 block">
              Direct Farmer Price per kg (₹)
            </label>
            <input
              type="number"
              placeholder="e.g., 42"
              value={newVeg.pricePerKg}
              onChange={(e) =>
                setNewVeg({ ...newVeg, pricePerKg: e.target.value })
              }
              className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase text-foreground tracking-wider mb-1.5 block">Quantity (kg)</label>
              <input type="number" placeholder="e.g., 25" value={newVeg.quantity} onChange={(e) => setNewVeg({ ...newVeg, quantity: e.target.value })} className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-foreground tracking-wider mb-1.5 block">Harvest Timestamp</label>
              <input value={newVeg.harvestedAt} onChange={(e) => setNewVeg({ ...newVeg, harvestedAt: e.target.value })} className="w-full rounded-xl border border-earth px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
          </div>
          <ImageUpload label="Upload produce photo" onSelect={() => {}} />
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 font-bold"
              onClick={() => setShowAdd(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary-hover font-bold"
              onClick={handleAdd}
              disabled={!newVeg.name || !newVeg.pricePerKg}
            >
              Publish Crop Listing
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Listing?"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted leading-relaxed">
            This will permanently remove the vegetable from your public listing.
            Consumers won't be able to order it until you add it again.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 font-bold"
              onClick={() => setDeleteId(null)}
            >
              Keep Listing
            </Button>
            <Button
              variant="danger"
              className="flex-1 font-bold"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              <Trash2 size={14} /> Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
