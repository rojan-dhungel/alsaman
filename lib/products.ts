import productsData from "../allsaman.json";

interface RawProductData {
  "S. No.": any;
  "LIST OF ITEMS"?: string;
  "Column3"?: string;
  "Column4"?: string;
  "CODE"?: string;
}

export interface Product {
  id: string;
  name: string;
  nepaliName: string;
  botanicalName: string;
  code: string;
  category: string;
  description?: string;
  hsCode?: string;
  barcode?: string;
  rate?: string;
}

export type CategoryKey = 
  | "vegetables" 
  | "medicinal-herbs" 
  | "flowers-leaves" 
  | "roots-rhizomes" 
  | "staples-commodities";

const categoryMap: Record<string, CategoryKey> = {
  "VEGETABLES (VG)": "vegetables",
  "MEDICINAL HERBS, FRUITS & NUTS (MH)": "medicinal-herbs",
  "FLOWERS & LEAVES (FL)": "flowers-leaves",
  "ROOTS & RHIZOMES (RR)": "roots-rhizomes",
  "STAPLES & COMMODITIES (SC)": "staples-commodities",
};

export function getProductById(id: string): Product | null {
  const data = (Array.isArray(productsData) ? productsData : (productsData as any).default || []) as RawProductData[];
  
  // Find the item first
  const item = data.find(it => it["CODE"] === id);
  if (!item) return null;

  // We also need to figure out its category by traversing or finding headers
  // For simplicity since we have SNs, we can find the header before it
  const index = data.indexOf(item);
  let category: CategoryKey = "vegetables"; // Fallback
  
  for (let i = index; i >= 0; i--) {
    const snValue = data[i]["S. No."];
    if (typeof snValue === "string" && categoryMap[snValue.trim()]) {
      category = categoryMap[snValue.trim()];
      break;
    }
  }

  return {
    id: item["CODE"] || "",
    name: item["LIST OF ITEMS"] || "",
    nepaliName: item["Column3"] || "",
    botanicalName: item["Column4"] || "",
    code: item["CODE"] || "",
    category: category,
    description: `Premium quality ${item["LIST OF ITEMS"]} sourced directly from high-altitude farms in Nepal. Carefully selected and processed to maintain natural freshness and nutritional value.`,
    hsCode: "0709.99.00", // Template HS Code
    barcode: "837492018475", // Template Barcode
    rate: "Contact for Pricing" // Template Rate
  };
}

export function getProductsByCategory(category: CategoryKey): Product[] {
  const products: Product[] = [];
  let currentCategory: CategoryKey | null = null;

  const data = (Array.isArray(productsData) ? productsData : (productsData as any).default || []) as RawProductData[];
  
  data.forEach((item, index) => {
    const snValue = item["S. No."];
    
    if (typeof snValue === "string") {
      const trimmedHeader = snValue.trim();
      if (categoryMap[trimmedHeader]) {
        currentCategory = categoryMap[trimmedHeader];
        return;
      }
    }

    if (currentCategory === category && snValue !== undefined && snValue !== null) {
      const isNumber = typeof snValue === "number";
      const isNumericString = typeof snValue === "string" && !isNaN(Number(snValue));
      
      if (isNumber || isNumericString) {
        products.push({
          id: item["CODE"] || `prod-${snValue}-${index}`,
          name: item["LIST OF ITEMS"] || "",
          nepaliName: item["Column3"] || "",
          botanicalName: item["Column4"] || "",
          code: item["CODE"] || "",
          category: currentCategory,
        });
      }
    }
  });

  return products;
}

export function getAllCategories(): CategoryKey[] {
  return Object.values(categoryMap);
}
