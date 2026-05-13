import { InventoryItem, StockStatus } from "@/features/inventory/types";

// Helper to generate realistic SKUs
const generateSKU = (i: number) => `SKU-${1000 + i}`;

// Categories and corresponding item prefixes
const CATEGORY_MAP: Record<string, { prefixes: string[], suppliers: string[] }> = {
  "Mechanical Parts": {
    prefixes: ["Industrial Ball Bearing", "Roller Bearing", "Linear Guide", "V-Belt", "Drive Shaft", "Gear Assembly", "Coupling", "Pulley"],
    suppliers: ["NTN Bearings Ltd", "SKF Group", "TIMKEN", "NSK Ltd"]
  },
  "Seals & Gaskets": {
    prefixes: ["Hydraulic Seal Kit", "O-Ring Set", "Mechanical Seal", "Gasket Sheet", "Lip Seal", "V-Ring", "Oil Seal"],
    suppliers: ["Parker Hannifin", "Freudenberg", "Trelleborg", "James Walker"]
  },
  "Fasteners": {
    prefixes: ["Hex Bolt", "Socket Head Screw", "Lock Nut", "Flat Washer", "Threaded Rod", "Spring Washer", "Anchor Bolt"],
    suppliers: ["Bossard Group", "Wurth", "Fastenal", "Hilti"]
  },
  "Pneumatics": {
    prefixes: ["Pneumatic Cylinder", "Solenoid Valve", "Air Filter", "Pressure Regulator", "Fitting", "Pneumatic Tubing", "Manifold"],
    suppliers: ["SMC Corporation", "Festo", "Norgren", "Aventics"]
  },
  "Power Transmission": {
    prefixes: ["Timing Belt", "Chain Drive", "Conveyor Belt", "Gearbox", "Servo Motor", "Clutch Plate", "Torque Limiter"],
    suppliers: ["Gates Industrial", "Habasit AG", "Bonfiglioli", "SEW Eurodrive"]
  },
  "Electrical": {
    prefixes: ["Electric Motor", "Circuit Breaker", "Relay", "Terminal Block", "Power Supply", "Sensor", "PLC Module"],
    suppliers: ["Siemens AG", "Schneider Electric", "ABB", "Rockwell Automation"]
  },
  "Piping": {
    prefixes: ["Carbon Steel Pipe", "Stainless Tube", "Elbow Fitting", "Flange", "Ball Valve", "Check Valve", "Gate Valve"],
    suppliers: ["Atlas Steels", "Swagelok", "Victaulic", "Crane Co."]
  },
  "Fluid Handling": {
    prefixes: ["Centrifugal Pump", "Diaphragm Pump", "Flow Meter", "Control Valve", "Filter Housing", "Dosing Pump"],
    suppliers: ["Grundfos", "Flowserve", "Kirloskar", "Wilo"]
  },
  "Instrumentation": {
    prefixes: ["Pressure Gauge", "Temperature Transmitter", "Level Sensor", "Flow Controller", "Digital Indicator"],
    suppliers: ["Wika Instruments", "Endress+Hauser", "Emerson", "Yokogawa"]
  },
  "Material Handling": {
    prefixes: ["Conveyor Roller", "Castor Wheel", "Lifting Slings", "Forklift Forks", "Storage Rack", "Pallet Jack"],
    suppliers: ["Interroll", "Hyster-Yale", "Toyota Material Handling", "Jungheinrich"]
  }
};

const CATEGORIES = Object.keys(CATEGORY_MAP);
const WAREHOUSES = ["Warehouse A", "Warehouse B", "Warehouse C", "Central Hub", "External Storage"];
const SIZES = ["10mm", "12mm", "15mm", "20mm", "25mm", "32mm", "40mm", "50mm", "1/2 inch", "3/4 inch", "1 inch"];

const generateRandomData = (count: number): InventoryItem[] => {
  const items: InventoryItem[] = [];
  
  for (let i = 1; i <= count; i++) {
    const category = CATEGORIES[i % CATEGORIES.length];
    const config = CATEGORY_MAP[category];
    const prefix = config.prefixes[i % config.prefixes.length];
    const supplier = config.suppliers[i % config.suppliers.length];
    const size = SIZES[i % SIZES.length];
    const warehouse = WAREHOUSES[i % WAREHOUSES.length];
    
    const stock = Math.floor(Math.random() * 500);
    const reorderPoint = 10 + Math.floor(Math.random() * 50);
    const price = 5 + Math.random() * 1000;
    const cost = price * (0.5 + Math.random() * 0.3);
    
    let status: StockStatus = "in_stock";
    if (stock === 0) {
      status = Math.random() > 0.3 ? "out_of_stock" : "discontinued";
    } else if (stock <= reorderPoint) {
      status = "low_stock";
    }

    // Dates from last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const lastUpdated = date.toISOString().split("T")[0];

    items.push({
      id: i.toString(),
      sku: generateSKU(i),
      name: `${prefix} ${size}`,
      category,
      stock,
      reorderPoint,
      price,
      cost,
      status,
      supplier,
      warehouse,
      lastUpdated
    });
  }
  
  return items;
};

export const MOCK_INVENTORY: InventoryItem[] = generateRandomData(300);

export const INVENTORY_CATEGORIES = CATEGORIES;

