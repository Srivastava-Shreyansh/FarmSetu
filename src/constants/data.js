export const vegetables = [
  {
    id: 'v1', name: 'Tomato', image: 'photo-1518977822534-7049a61ee0c2',
    pricePerKg: 42, available: true, farmerId: 'f1',
    description: 'Sun-ripened desi tomatoes, hand-picked at peak sweetness. Grown without synthetic pesticides.',
  },
  {
    id: 'v2', name: 'Potato', image: 'photo-1518977676601-b53f82aba655',
    pricePerKg: 28, available: true, farmerId: 'f1',
    description: "Firm Jyoti variety potatoes from Gujarat's rich black-soil farms. Perfect for sabzi or frying.",
  },
  {
    id: 'v3', name: 'Onion', image: 'photo-1618512496248-a07fe83aa8cb',
    pricePerKg: 35, available: true, farmerId: 'f1',
    description: 'Red onions with a sharp-sweet flavour. Freshly harvested and storage-cured for longer shelf life.',
  },
  {
    id: 'v4', name: 'Cauliflower', image: 'photo-1568584711075-3d021a7c3ca3',
    pricePerKg: 55, available: false, farmerId: 'f1',
    description: 'White curd cauliflower from winter harvest. Currently out of season — check back soon.',
  },
  {
    id: 'v5', name: 'Spinach', image: 'photo-1576045057995-568f588f82fb',
    pricePerKg: 30, available: true, farmerId: 'f1',
    description: 'Tender baby spinach leaves, cut fresh each morning. Rich in iron and vitamins A & C.',
  },
  {
    id: 'v6', name: 'Carrot', image: 'photo-1598170845058-32b9d6a5da37',
    pricePerKg: 38, available: true, farmerId: 'f2',
    description: "Sweet Nantes-type carrots from Punjab's loamy fields. Ideal for halwa, juice, or curries.",
  },
  {
    id: 'v7', name: 'Brinjal', image: 'photo-1683543122945-513029986574',
    pricePerKg: 32, available: true, farmerId: 'f2',
    description: 'Glossy purple brinjal, medium-sized. Perfect for baingan bharta and stuffed bharwa baingan.',
  },
  {
    id: 'v8', name: 'Okra', image: 'photo-1632742315671-d77e6feed874',
    pricePerKg: 45, available: true, farmerId: 'f2',
    description: 'Tender young bhindi, harvested when 3–4 inches long for the best crunch and minimal sliminess.',
  },
  {
    id: 'v9', name: 'Cucumber', image: 'photo-1566486189376-d5f21e25aae4',
    pricePerKg: 22, available: true, farmerId: 'f2',
    description: 'Cool, crisp cucumbers. Excellent for raita, salads, or simply sliced with chaat masala.',
  },
  {
    id: 'v10', name: 'Green Peas', image: 'photo-1592394533824-9440e5d68530',
    pricePerKg: 68, available: true, farmerId: 'f2',
    description: 'Fresh matar, shelled on-farm for maximum sweetness. Great for pulao, curries, and tikki.',
  },
  {
    id: 'v11', name: 'Tomato', image: 'photo-1518977822534-7049a61ee0c2',
    pricePerKg: 38, available: true, farmerId: 'f3',
    description: 'Vine-ripened cherry and salad tomatoes sourced daily from Yelahanka vegetable belt.',
  },
  {
    id: 'v12', name: 'Potato', image: 'photo-1518977676601-b53f82aba655',
    pricePerKg: 24, available: true, farmerId: 'f3',
    description: 'Agra Kufri Jyoti variety — floury texture, excellent for boiling and mashing.',
  },
  {
    id: 'v13', name: 'Onion', image: 'photo-1618512496248-a07fe83aa8cb',
    pricePerKg: 32, available: true, farmerId: 'f3',
    description: 'Medium-sized Nashik red onions, a kitchen staple at a fair price.',
  },
  {
    id: 'v14', name: 'Carrot', image: 'photo-1598170845058-32b9d6a5da37',
    pricePerKg: 36, available: false, farmerId: 'f3',
    description: 'Heirloom red Desi carrots — currently not in stock. Available from December.',
  },
  {
    id: 'v15', name: 'Cauliflower', image: 'photo-1568584711075-3d021a7c3ca3',
    pricePerKg: 50, available: true, farmerId: 'f3',
    description: 'Large, tight-curd cauliflower heads. Sourced from Ooty during the hill-farm season.',
  },
  {
    id: 'v16', name: 'Brinjal', image: 'photo-1683543122945-513029986574',
    pricePerKg: 28, available: true, farmerId: 'f4',
    description: 'Small Goan brinjal variety, intensely flavoured for authentic curries.',
  },
  {
    id: 'v17', name: 'Okra', image: 'photo-1632742315671-d77e6feed874',
    pricePerKg: 42, available: true, farmerId: 'f4',
    description: 'Market-fresh bhindi, sorted and packed same morning. No yellowing, no woodiness.',
  },
  {
    id: 'v18', name: 'Spinach', image: 'photo-1576045057995-568f588f82fb',
    pricePerKg: 26, available: true, farmerId: 'f4',
    description: "Palak bunches harvested from Navi Mumbai's peri-urban farms, same-day delivery.",
  },
  {
    id: 'v19', name: 'Green Peas', image: 'photo-1592394533824-9440e5d68530',
    pricePerKg: 72, available: false, farmerId: 'f4',
    description: 'Fresh peas out of season right now — pre-order for the winter crop.',
  },
  {
    id: 'v20', name: 'Cucumber', image: 'photo-1566486189376-d5f21e25aae4',
    pricePerKg: 20, available: true, farmerId: 'f4',
    description: 'Long English cucumbers — thin-skinned, mild, and hydrating. Great for detox drinks.',
  },
];

// Demo-day inventory: every listed crop was harvested this morning in the Anand
// cluster, making freshness and traceability visible throughout the experience.
const harvestDetails = [
  ["06:20 AM", "38 kg"], ["05:50 AM", "62 kg"], ["06:10 AM", "42 kg"],
  ["06:45 AM", "14 kg"], ["06:35 AM", "18 kg"], ["06:05 AM", "31 kg"],
  ["06:25 AM", "22 kg"], ["06:40 AM", "16 kg"], ["06:15 AM", "27 kg"],
  ["05:55 AM", "12 kg"], ["06:30 AM", "24 kg"], ["05:45 AM", "48 kg"],
  ["06:00 AM", "35 kg"], ["06:50 AM", "10 kg"], ["06:28 AM", "19 kg"],
  ["06:12 AM", "20 kg"], ["06:32 AM", "15 kg"], ["06:18 AM", "17 kg"],
  ["05:58 AM", "11 kg"], ["06:08 AM", "29 kg"],
];

vegetables.forEach((vegetable, index) => {
  const [time, quantity] = harvestDetails[index];
  vegetable.harvestedAt = `Today, ${time}`;
  vegetable.availableQuantity = quantity;
});

export const farmers = [
  {
    id: 'f1',
    name: 'Ramesh Patel',
    type: 'Producer',
    location: 'Anand, Gujarat',
    rating: 4.8,
    reviewCount: 214,
    deliveryTime: '2–3 hrs',
    image: 'photo-1507003211169-0a1dd7228f2d',
    farmImage: 'photo-1500382017468-9049fed747ef',
    mobile: '9876543210',
    address: 'Survey No. 42, Near Water Tank, Anand, Gujarat 388001',
    walletBalance: 4820,
    totalDeductions: 312,
    farmFreshPayout: 12640,
    traditionalMandiPayout: 9480,
    tagline: "Three generations of organic farming in Gujarat's heartland.",
  },
  {
    id: 'f2',
    name: 'Sita Devi',
    type: 'Producer',
    location: 'Ludhiana, Punjab',
    rating: 4.6,
    reviewCount: 178,
    deliveryTime: '3–4 hrs',
    image: 'photo-1531746020798-e6953c6e8e04',
    farmImage: 'photo-1464226184884-fa280b87c399',
    mobile: '9812345678',
    address: 'Village Raikot, Ludhiana, Punjab 141109',
    walletBalance: 2350,
    totalDeductions: 188,
    tagline: "Farm-fresh produce from Punjab's most fertile belts.",
  },
  {
    id: 'f3',
    name: 'Mohan Kumar',
    type: 'Local Vendor',
    location: 'Yelahanka, Bengaluru',
    rating: 4.5,
    reviewCount: 302,
    deliveryTime: '1–2 hrs',
    image: 'photo-1566753323558-f4e0952af115',
    farmImage: 'photo-1560806887-1e4cd0b6cbd6',
    mobile: '9845678901',
    address: 'Shop 12, Yelahanka Vegetable Market, Bengaluru 560064',
    walletBalance: 7640,
    totalDeductions: 495,
    tagline: 'Trusted local vendor sourcing from Yelahanka farmers daily.',
  },
  {
    id: 'f4',
    name: 'Priya Singh',
    type: 'Local Vendor',
    location: 'Vashi, Navi Mumbai',
    rating: 4.7,
    reviewCount: 189,
    deliveryTime: '2–3 hrs',
    image: 'photo-1494790108377-be9c29b29330',
    farmImage: 'photo-1574943320219-553eb213f72d',
    mobile: '9022334455',
    address: 'Stall 7, Vashi Market Complex, Navi Mumbai 400703',
    walletBalance: 5120,
    totalDeductions: 276,
    tagline: 'Quality vegetables at fair prices — since 2011.',
  },
];

export const farmerOrders = [
  {
    id: 'ORD1024',
    consumerName: 'Anjali Sharma',
    consumerAddress: '14B, Shastri Nagar, Anand, Gujarat 388001',
    consumerMobile: '9898765432',
    items: [
      { vegetableId: 'v1', name: 'Tomato', quantity: 2, pricePerKg: 42, image: 'photo-1582284540020-8862d7ef43a3' },
      { vegetableId: 'v3', name: 'Onion', quantity: 1.5, pricePerKg: 35, image: 'photo-1618512496248-a07fe83aa8cb' },
    ],
    total: 136.5,
    status: 'confirmed',
    placedAt: '2026-08-20T09:15:00',
    farmerId: 'f1',
  },
  {
    id: 'ORD1025',
    consumerName: 'Vikram Rao',
    consumerAddress: '7, Civil Lines, Anand, Gujarat 388001',
    consumerMobile: '9988776655',
    items: [
      { vegetableId: 'v2', name: 'Potato', quantity: 3, pricePerKg: 28, image: 'photo-1518977676601-b53f82aba655' },
      { vegetableId: 'v5', name: 'Spinach', quantity: 0.5, pricePerKg: 30, image: 'photo-1576045057995-568f588f82fb' },
    ],
    total: 99,
    status: 'placed',
    placedAt: '2026-08-20T10:30:00',
    farmerId: 'f1',
  },
  {
    id: 'ORD1022',
    consumerName: 'Suresh Nair',
    consumerAddress: '5, Ram Nagar, Anand',
    consumerMobile: '9911002200',
    items: [
      { vegetableId: 'v5', name: 'Spinach', quantity: 1, pricePerKg: 30, image: 'photo-1576045057995-568f588f82fb' },
    ],
    total: 30,
    status: 'preparing',
    placedAt: '2026-08-20T08:45:00',
    farmerId: 'f1',
  },
  {
    id: 'ORD1021',
    consumerName: 'Rekha Mehta',
    consumerAddress: '22, Green Park, Anand, Gujarat',
    consumerMobile: '9011223344',
    items: [
      { vegetableId: 'v1', name: 'Tomato', quantity: 1, pricePerKg: 42, image: 'photo-1582284540020-8862d7ef43a3' },
      { vegetableId: 'v3', name: 'Onion', quantity: 2, pricePerKg: 35, image: 'photo-1618512496248-a07fe83aa8cb' },
      { vegetableId: 'v2', name: 'Potato', quantity: 2, pricePerKg: 28, image: 'photo-1518977676601-b53f82aba655' },
    ],
    total: 148,
    status: 'delivered',
    placedAt: '2026-08-19T14:20:00',
    farmerId: 'f1',
  },
];

export const walletTransactions = [
  {
    id: 'TXN004', type: 'recharge', description: 'Wallet Recharge',
    amount: 5000, date: '2026-08-15T09:00:00', balance: 4845,
  },
  {
    id: 'TXN003', type: 'deduction', description: 'Platform Fee — Order #ORD1018',
    orderId: 'ORD1018', orderValue: 1250, platformFee: 25,
    amount: -25, date: '2026-08-17T18:30:00', balance: 4820,
  },
  {
    id: 'TXN001', type: 'recharge', description: 'Wallet Recharge',
    amount: 2000, date: '2026-08-18T10:00:00', balance: 6820,
  },
  {
    id: 'TXN002', type: 'deduction', description: 'Platform Fee — Order #ORD1021',
    orderId: 'ORD1021', orderValue: 148, platformFee: 2.96,
    amount: -2.96, date: '2026-08-19T14:55:00', balance: 6817,
  },
];

export const getVegetablesByFarmer = (farmerId) =>
  vegetables.filter((v) => v.farmerId === farmerId);

export const getFarmerById = (id) => farmers.find((f) => f.id === id);

export const getVegetableById = (id) => vegetables.find((v) => v.id === id);

export const searchVegetables = (q) =>
  vegetables.filter((v) => v.available && v.name.toLowerCase().includes(q.toLowerCase()));

export const searchFarmers = (q) =>
  farmers.filter(
    (f) =>
      f.name.toLowerCase().includes(q.toLowerCase()) ||
      f.location.toLowerCase().includes(q.toLowerCase())
  );
