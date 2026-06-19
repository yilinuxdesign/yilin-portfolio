// Spend Summary — prototype data
window.SPEND = {
  total: { pct: "100%", txns: "97 transactions", amount: "$19,617.22" },

  card: {
    name: "Citi®/AAdvantage® Platinum Select® World Elite Mastercard® - 1981",
    short: "Citi®/AAdvantage® Plati…1981",
  },

  cards: [
    { id: "strata", label: "Citi Strata℠ Card - 0748" },
    { id: "aadv", label: "Citi®/AAdvantage® Platinum Select® World Elite Mastercard® - 1981" },
  ],

  cardmembers: ["All", "Cardmember 1", "Cardmember 2", "Cardmember 3"],

  periods: ["Current month", "Last month", "Last 3 months", "Year to date", "2025 Annual account summary"],

  // Canonical category list for the landing
  categories: [
    { name: "Air Travel", pct: 6.3, txns: 1, amount: "$1,235.88", color: "#2f6fdb" },
    { name: "Auto Rental", pct: 4.7, txns: 4, amount: "$922.01", color: "#edb63c" },
    { name: "Entertainment", pct: 33.1, txns: 25, amount: "$6,493.30", color: "#e8786a" },
    { name: "Lodging", pct: 21.9, txns: 6, amount: "$4,296.17", color: "#45b3a8" },
    { name: "Merchandise", pct: 29.5, txns: 32, amount: "$5,787.08", color: "#9a7ad1" },
    { name: "Miscellaneous", pct: 1.5, txns: 11, amount: "$294.26", color: "#6cbf6a" },
    { name: "AT&T Services", pct: 4.6, txns: 5, amount: "$294.26", color: "#6aa3e8" },
    { name: "Cash Transactions", pct: 1.2, txns: 52, amount: "$4,296.17", color: "#234f96" },
    { name: "Health Care", pct: 19.6, txns: 1, amount: "$588.52", color: "#e98bb2" },
    { name: "Organizations", pct: 10.1, txns: 5, amount: "$1,235.88", color: "#f0953f" },
    { name: "Other Travel", pct: 3.2, txns: 9, amount: "$4,296.17", color: "#3bb6c9" },
    { name: "Restaurants", pct: 9.4, txns: 9, amount: "$588.52", color: "#c85aa0" },
    { name: "Vehicle Services", pct: 6.8, txns: 10, amount: "$6,493.30", color: "#a9744e" },
    { name: "Services", pct: 0.2, txns: 6, amount: "$4,296.17", color: "#9aa3ad" },
  ],

  // Spend categories for the multi-select sheet (with simple glyphs)
  catChips: [
    "All", "Air Travel", "AT&T Services", "Auto Rental", "Cash Transactions",
    "Entertainment", "Health Care", "Lodging", "Merchandise", "Miscellaneous",
    "Organizations", "Other Travel", "Restaurants", "Services", "Vehicle Services",
  ],

  statements: [
    "Since last statement",
    "Statement closed Apr 25, 2025",
    "Statement closed Mar 27, 2025",
    "Statement closed Feb 27, 2025",
    "Statement closed Jan 27, 2025",
    "Statement closed Dec 26, 2024",
    "Statement closed Nov 27, 2024",
  ],

  sorts: ["A - Z", "Z - A", "Amount: low to high", "Amount: high to low"],

  // Merchandise category — transaction list grouped by date
  merchandise: {
    name: "Merchandise",
    total: "$1,072.41",
    count: "14 transactions",
    groups: [
      { date: "Jul 14, 2025", items: [
        { merchant: "SEPHORA", amount: "$146.10" },
        { merchant: "TARGET", amount: "$6.41" },
      ]},
      { date: "Jul 13, 2025", items: [
        { merchant: "American Airlines", amount: "$1,249.99" },
        { merchant: "ShopRite", amount: "$15.99" },
        { merchant: "HYATT HOTELS AND RESORTS HYATT REGENCY GREENVILLE", amount: "$23,174.50" },
      ]},
      { date: "Jul 12, 2025", items: [
        { merchant: "REFUND - APPLE iTUNES", amount: "-$9.99", credit: true },
        { merchant: "Ginnie Springs Outdoors", amount: "$34.00" },
        { merchant: "McDonald's", amount: "$68.75" },
      ]},
      { date: "Jul 11, 2025", items: [
        { merchant: "COSTCO", amount: "$70.00" },
      ]},
    ],
  },

  // Enriched transaction detail
  detail: {
    cardHeader: "Citibank Premier…2453",
    merchant: "THE MANSION RESTAURANT",
    amount: "$265.00",
    rows: [
      ["Purchased On", "Aug 20, 2024 08:37 PM ET"],
      ["Posted On", "August 21, 2024"],
      ["Purchase Method", "In-store"],
      ["Cardmember Name", "John Smith"],
      ["Spend Category", "Restaurant"],
    ],
    address: "2021 Turtle Creek Blvd, Dallas, TX 75219",
    phone: "+1 (516) 488-8500",
    statementAs: "THE MANSION RESTAURANT",
    rewards: { category: "Citi Nights Purchase", multiplier: "6X", points: "1,590" },
  },
};
