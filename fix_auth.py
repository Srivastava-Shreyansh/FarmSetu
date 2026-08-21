import re

with open('src/pages/auth/Auth.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the roles array completely
roles_str = """const roles = [
  {
    id: "consumer",
    label: "Consumer",
    desc: "Browse fresh vegetables from local farmers",
    icon: ShoppingCart,
    color: "bg-primary-light border-primary-muted text-primary",
  },
  {
    id: "farmer",
    label: "Farmer / Vendor",
    desc: "List your produce and manage orders",
    icon: Sprout,
    color: "bg-amber-50 border-amber-200 text-amber-700",
  },
  {
    id: "rider",
    label: "Delivery Rider",
    desc: "Pick up and deliver fresh orders",
    icon: Truck,
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
];"""

content = re.sub(r'const roles = \[[\s\S]*?\];', roles_str, content)

with open('src/pages/auth/Auth.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
