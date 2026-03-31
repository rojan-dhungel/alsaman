"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { getProductsByCategory, CategoryKey, Product } from "@/lib/products";
import UniversalButton from "@/components/UniversalButton";

const categoryTitles: Record<CategoryKey, string> = {
  "vegetables": "Vegetables",
  "medicinal-herbs": "Herbs, Fruits & Nuts",
  "flowers-leaves": "Flowers & Leaves",
  "roots-rhizomes": "Roots & Rhizomes",
  "staples-commodities": "Staples & Commodities",
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function ProductPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const categoryKey = category as CategoryKey;
  const products = useMemo(() => getProductsByCategory(categoryKey), [categoryKey]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nepaliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeLetter) {
      result = result.filter(p => p.name.toUpperCase().startsWith(activeLetter));
    }

    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [products, searchQuery, activeLetter]);

  if (!categoryTitles[categoryKey]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black text-primary-dark mb-4">Category Not Found</h1>
        <UniversalButton href="/">Back to Home</UniversalButton>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg-soft py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 space-y-8 text-center">
          <Link 
            href="/#products" 
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:text-secondary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </Link>
          
          <h1 className="text-5xl lg:text-7xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            {categoryTitles[categoryKey]}
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Search Bar */}
            <div className="relative group max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search by name, nepali name, or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-primary/10 rounded-2xl px-8 py-5 text-lg font-bold text-primary-dark placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all shadow-sm group-hover:shadow-md text-center"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-primary/5 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Alphabet Filter */}
            <div className="flex flex-col items-center gap-4">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-dark/40">Filter by Alphabet</div>
              <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                <button
                  onClick={() => setActiveLetter(null)}
                  className={`min-w-[40px] h-10 rounded-xl text-xs font-black transition-all ${
                    !activeLetter 
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110 z-10" 
                      : "bg-white text-primary-dark/60 hover:bg-primary/5 border border-primary/5"
                  }`}
                >
                  ALL
                </button>
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => setActiveLetter(letter === activeLetter ? null : letter)}
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                      activeLetter === letter 
                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110 z-10" 
                        : "bg-white text-primary-dark/60 hover:bg-primary/5 border border-primary/5"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex justify-between items-center text-sm font-black uppercase tracking-widest text-text-secondary opacity-60">
          <span>{filteredProducts.length} Products Found</span>
          {activeLetter && (
            <button 
              onClick={() => setActiveLetter(null)}
              className="text-primary hover:text-accent flex items-center gap-2"
            >
              Clear Letter Filter <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-[8px]">✕</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {filteredProducts.map((product) => (
            <Link 
              href={`/products/${categoryKey}/${product.code}`}
              key={product.id}
              className="group bg-white rounded-[3rem] overflow-hidden border border-primary/5 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Slot Template */}
              <div className="relative aspect-[4/3] w-full bg-bg-section overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent"></div>
                {/* Code Badge */}
                <div className="absolute top-8 left-8">
                  <span className="px-5 py-2 bg-white/90 backdrop-blur-md text-primary text-[10px] font-black rounded-full uppercase tracking-[0.2em] border border-primary/10 shadow-sm">
                    {product.code}
                  </span>
                </div>
              </div>

              <div className="p-10 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-heading font-black text-primary-dark tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    <p className="font-serif italic text-secondary font-bold text-xl">
                      {product.nepaliName}
                    </p>
                    {product.botanicalName && product.botanicalName !== "N/A" && (
                      <p className="font-medium text-text-secondary opacity-50 uppercase tracking-widest text-[10px]">
                        {product.botanicalName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-8 border-t border-dashed border-primary/10 flex justify-between items-center">
                   <div className="flex gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors duration-500"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors duration-500 delay-75"></div>
                   </div>
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                      View details
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                      </svg>
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-44 space-y-6">
            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <h2 className="text-4xl font-heading font-black text-primary-dark tracking-tight">No Matches <span className="text-secondary">Found</span></h2>
            <p className="text-text-secondary font-medium text-lg">Try a different letter or clear your search query.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveLetter(null); }}
              className="text-primary font-bold underline underline-offset-8 hover:text-accent transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
