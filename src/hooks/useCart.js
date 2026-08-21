export function useCart(cart, setCart) {
  const getItem = (vId) => cart.find((c) => c.vegetable.id === vId);
  const add = (v, f) =>
    setCart((prev) => [...prev, { vegetable: v, farmer: f, quantity: 0.5 }]);
  const update = (v, qty) => {
    if (qty <= 0)
      setCart((prev) => prev.filter((c) => c.vegetable.id !== v.id));
    else
      setCart((prev) =>
        prev.map((c) =>
          c.vegetable.id === v.id ? { ...c, quantity: qty } : c,
        ),
      );
  };
  return { getItem, add, update };
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
