"use client";

import { use } from "react";
import Link from "next/link";
import { getProductById, CategoryKey } from "@/lib/products";
import UniversalButton from "@/components/UniversalButton";

const categoryTitles: Record<CategoryKey, string> = {
  "vegetables": "Vegetables",
  "medicinal-herbs": "Herbs, Fruits & Nuts",
  "flowers-leaves": "Flowers & Leaves",
  "roots-rhizomes": "Roots & Rhizomes",
  "staples-commodities": "Staples & Commodities",
};

export default function ProductDetailPage({ params }: { params: Promise<{ category: string, id: string }> }) {
  const { category, id } = use(params);
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black text-primary-dark mb-4 tracking-tighter uppercase">Product Not Found</h1>
        <UniversalButton href={`/products/${category}`}>Back to Category</UniversalButton>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg-soft pb-24 pt-32 lg:pt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="mb-12 flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-primary-dark/40">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="w-1 h-1 rounded-full bg-primary/20"></span>
          <Link href={`/products/${category}`} className="hover:text-primary transition-colors">{categoryTitles[category as CategoryKey]}</Link>
          <span className="w-1 h-1 rounded-full bg-primary/20"></span>
          <span className="text-primary">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Image / Gallery Template */}
          <div className="space-y-8">
            <div className="relative aspect-square w-full bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-primary/5 group">
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity p-20 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-sm font-black uppercase tracking-widest text-primary-dark">Product Gallery Template</div>
                <div className="text-[10px] mt-2 opacity-60 italic">Replace with high-resolution imagery</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/10 to-transparent"></div>
              <div className="absolute bottom-12 right-12">
                 <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-primary/5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Origin</div>
                    <div className="text-lg font-black text-primary-dark flex items-center gap-2">
                       <span className="text-2xl">🇳🇵</span> Nepal
                    </div>
                 </div>
              </div>
            </div>

            {/* Thumbnail Templates */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(idx => (
                <div key={idx} className="aspect-square bg-white rounded-2xl border border-primary/5 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="space-y-12 py-4">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-accent/10">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  Code: {product.code}
                </div>
                {product.hsCode && (
                  <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">
                    HS: {product.hsCode}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-heading font-black text-primary-dark tracking-tighter leading-none">
                  {product.name}
                </h1>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-3xl font-serif italic text-secondary font-bold">
                    {product.nepaliName}
                  </div>
                  {product.botanicalName && product.botanicalName !== "N/A" && (
                    <div className="px-5 py-2 bg-primary/5 rounded-2xl border border-primary/5 text-sm font-medium text-text-secondary opacity-60 uppercase tracking-widest italic">
                      {product.botanicalName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
               <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Overview</h3>
                  <p className="text-xl text-text-secondary leading-relaxed font-medium">
                    {product.description}
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="p-8 bg-white rounded-3xl border border-primary/5 shadow-soft hover:shadow-lg transition-shadow">
                     <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Barcode</div>
                     <div className="text-xl font-black text-primary-dark font-mono tracking-tighter">
                        {product.barcode || "UPC Template"}
                     </div>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-primary/5 shadow-soft hover:shadow-lg transition-shadow">
                     <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Estimated Rate</div>
                     <div className="text-xl font-black text-secondary">
                        {product.rate || "Request Quote"}
                     </div>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-primary/5 shadow-soft hover:shadow-lg transition-shadow">
                     <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Availability</div>
                     <div className="text-xl font-black text-primary-dark">In Stock / Bulk</div>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-primary/5 shadow-soft hover:shadow-lg transition-shadow">
                     <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Packaging</div>
                     <div className="text-xl font-black text-primary-dark">Custom Export</div>
                  </div>
               </div>
            </div>

            <div className="pt-8 space-y-6">
              <div className="p-10 bg-primary-dark rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                 </div>
                 <h3 className="text-2xl font-heading font-black text-white mb-4 relative z-10 uppercase tracking-tighter">Ready for Export?</h3>
                 <p className="text-white/60 font-medium mb-8 max-w-sm relative z-10">Get a personalized quote for bulk orders directly to your international location.</p>
                 <UniversalButton href="#contact" variant="accent" className="relative z-10 w-full py-6 text-center justify-center">
                    Request Inquiry
                 </UniversalButton>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
