"use client";

import { use, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { getProductsByCategory, CategoryKey, Product, getAllCategories } from "@/lib/products";
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

export default function ProductPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const categoryKey = category as CategoryKey;
  const products = useMemo(() => getProductsByCategory(categoryKey), [categoryKey]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Categories for the switcher
  const categories = getAllCategories();

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

  // Reset page on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeLetter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (!categoryTitles[categoryKey]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black text-primary-dark mb-4 tracking-tighter uppercase">Category Not Found</h1>
        <UniversalButton href="/products">View Global Catalog</UniversalButton>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg-soft py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 space-y-12 text-center">
          <Link 
            href="/#home" 
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] hover:text-secondary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </Link>
          
          <h1 className="text-6xl lg:text-8xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            {categoryTitles[categoryKey]}
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Search Bar */}
            <div className="relative group max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search in this category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-primary/10 rounded-[2.5rem] px-10 py-6 text-xl font-bold text-primary-dark placeholder:text-text-secondary/30 focus:outline-none focus:border-primary/40 transition-all shadow-soft"
              />
            </div>

            {/* Alphabet Filter */}
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
              <button
                onClick={() => setActiveLetter(null)}
                className={`min-w-[40px] h-10 rounded-xl text-xs font-black transition-all ${!activeLetter ? "bg-primary text-white shadow-lg" : "bg-white text-primary-dark/40"}`}
              >
                ALL
              </button>
              {alphabet.map(letter => (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter === activeLetter ? null : letter)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${activeLetter === letter ? "bg-primary text-white shadow-lg" : "bg-white text-primary-dark/40"}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-60">
          <span>{filteredProducts.length} Items Found</span>
          <span>Page {currentPage} of {totalPages || 1}</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <Link 
              href={`/products/${categoryKey}/${product.code}`}
              key={product.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-primary/5 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              <div className="relative aspect-video w-full bg-bg-section overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-1000 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <h3 className="text-xl font-heading font-black text-primary-dark tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-serif italic text-secondary font-bold text-base">
                    {product.nepaliName}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-dashed border-primary/10 flex justify-end">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                      </svg>
                   </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
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

        {/* Cross-Category Switcher (UX Emphasized) */}
        <div className="mt-32 pt-20 border-t border-primary/10">
           <div className="text-center space-y-12">
              <div className="space-y-4">
                 <h3 className="text-3xl font-heading font-black text-primary-dark tracking-tighter uppercase">Explore Other <span className="text-primary italic font-serif text-2xl lowercase">Categories</span></h3>
                 <p className="text-sm font-medium text-text-secondary opacity-60">Source premium products from different organic harvesting areas of Nepal.</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                {categories.map((cat) => (
                   <Link
                      key={cat}
                      href={`/products/${cat}`}
                      className={`group p-8 rounded-[2.5rem] bg-white border border-primary/5 hover:border-primary/20 transition-all duration-500 shadow-soft hover:shadow-2xl flex flex-col items-center gap-4 min-w-[220px] ${cat === categoryKey ? "hidden" : ""}`}
                   >
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-12">
                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                         </svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary-dark group-hover:text-primary transition-colors text-center px-4">
                         {categoryTitles[cat as CategoryKey]}
                      </span>
                   </Link>
                ))}
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
