"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllProducts, CategoryKey, Product } from "@/lib/products";
import UniversalButton from "@/components/UniversalButton";

const categoryTitles: Record<CategoryKey, string> = {
  "vegetables": "Vegetables",
  "medicinal-herbs": "Herbs, Fruits & Nuts",
  "flowers-leaves": "Flowers & Leaves",
  "roots-rhizomes": "Roots & Rhizomes",
  "staples-commodities": "Staples & Commodities",
};

const ITEMS_PER_PAGE = 12;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AllProductsPage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nepaliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeLetter) {
      result = result.filter(p => p.name.toUpperCase().startsWith(activeLetter));
    }

    if (activeCategory !== "all") {
      result = result.filter(p => p.category === activeCategory);
    }

    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [allProducts, searchQuery, activeLetter, activeCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-bg-soft py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 space-y-12 text-center">
          <h1 className="text-6xl lg:text-8xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            Global <span className="text-primary italic font-serif text-5xl lg:text-7xl">Catalog.</span>
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Main Search */}
            <div className="relative group max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search across all 228+ items..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border-2 border-primary/10 rounded-[2.5rem] px-10 py-6 text-xl font-bold text-primary-dark placeholder:text-text-secondary/30 focus:outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all shadow-soft"
              />
            </div>

            {/* Global Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => { setActiveCategory("all"); setCurrentPage(1); }}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === "all" ? "bg-primary text-white shadow-lg" : "bg-white text-primary-dark opacity-50 hover:opacity-100 border border-primary/5"}`}
              >
                All Categories
              </button>
              {Object.entries(categoryTitles).map(([key, title]) => (
                <button 
                  key={key}
                  onClick={() => { setActiveCategory(key); setCurrentPage(1); }}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === key ? "bg-primary text-white shadow-lg" : "bg-white text-primary-dark opacity-50 hover:opacity-100 border border-primary/5"}`}
                >
                  {title}
                </button>
              ))}
            </div>

            {/* Alphabet Filter */}
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 pt-4">
              <button
                onClick={() => { setActiveLetter(null); setCurrentPage(1); }}
                className={`min-w-[40px] h-10 rounded-xl text-xs font-black transition-all ${!activeLetter ? "bg-primary-dark text-white shadow-lg" : "bg-white text-primary-dark/40 hover:bg-primary/5"}`}
              >
                #
              </button>
              {alphabet.map(letter => (
                <button
                  key={letter}
                  onClick={() => { setActiveLetter(letter === activeLetter ? null : letter); setCurrentPage(1); }}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${activeLetter === letter ? "bg-primary-dark text-white shadow-lg" : "bg-white text-primary-dark/40 hover:bg-primary/5"}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-12 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary">
          <span>{filteredProducts.length} Items Matching</span>
          <span>Page {currentPage} of {totalPages || 1}</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <Link 
              href={`/products/${product.category}/${product.id}`}
              key={product.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-primary/5 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              <div className="relative aspect-square w-full bg-bg-section overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute top-6 left-6">
                   <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-primary text-[8px] font-black rounded-full uppercase tracking-widest border border-primary/10">
                      {product.code}
                   </span>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="text-[8px] font-black uppercase tracking-widest text-secondary opacity-60">
                    {categoryTitles[product.category as CategoryKey]}
                  </div>
                  <h3 className="text-xl font-heading font-black text-primary-dark tracking-tight leading-tight transition-colors group-hover:text-primary">
                    {product.name}
                  </h3>
                  <p className="font-serif italic text-secondary font-bold text-base opacity-70">
                    {product.nepaliName}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-dashed border-primary/10 flex justify-end">
                   <span className="text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-1 group/btn">
                      View details
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                      </svg>
                   </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-14 h-14 rounded-2xl bg-white border border-primary/5 flex items-center justify-center text-primary-dark disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-soft"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-14 h-14 rounded-2xl text-xs font-black transition-all ${currentPage === i + 1 ? "bg-primary text-white shadow-xl scale-110" : "bg-white text-primary-dark opacity-40 hover:opacity-100"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-14 h-14 rounded-2xl bg-white border border-primary/5 flex items-center justify-center text-primary-dark disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-soft"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-40">
             <h2 className="text-3xl font-heading font-black text-primary-dark opacity-20 uppercase tracking-tighter">No Catalog Matches</h2>
             <button onClick={() => { setSearchQuery(""); setActiveLetter(null); setActiveCategory("all"); }} className="mt-4 text-primary font-bold underline underline-offset-8">Clear all filters</button>
          </div>
        )}
      </div>
    </main>
  );
}
