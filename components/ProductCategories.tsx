"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import UniversalButton from "./UniversalButton";
import { Loader2 } from "lucide-react";

// Custom Artistic SVGs for a more "Agro-Handmade" feel
const ArtisticVegetable = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50,20 C35,20 25,35 25,50 C25,75 50,85 50,85 C50,85 75,75 75,50 C75,35 65,20 50,20 M50,20 C50,15 55,10 60,10 M50,20 C50,15 45,10 40,10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M45,40 Q50,45 55,40" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M40,55 Q50,60 60,55" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ArtisticFruit = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50,30 C30,30 20,45 20,60 C20,80 40,90 50,90 C60,90 80,80 80,60 C80,45 70,30 50,30 M50,30 Q55,20 70,15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="40" cy="50" r="2" />
    <circle cx="60" cy="55" r="2" />
  </svg>
);

const ArtisticFlower = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M50,50 L50,20 M50,50 L80,35 M50,50 L80,65 M50,50 L50,80 M50,50 L20,65 M50,50 L20,35" />
      <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.1" />
      <path d="M45,15 Q50,5 55,15" />
      <path d="M85,30 Q95,35 85,40" />
      <path d="M85,60 Q95,65 85,70" />
      <path d="M55,85 Q50,95 45,85" />
      <path d="M15,70 Q5,65 15,60" />
      <path d="M15,40 Q5,35 15,30" />
    </g>
  </svg>
);

const ArtisticRoot = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M40,30 C30,50 35,70 50,85 C65,70 70,50 60,30 C55,20 45,20 40,30 Z" />
      <path d="M50,85 Q45,95 40,95 M50,85 Q55,95 60,95 M42,60 Q30,65 25,75 M58,60 Q70,65 75,75 M46,45 Q35,45 30,50 M54,45 Q65,45 70,50" strokeWidth="1.5" />
      <path d="M45,30 Q50,20 50,15 M55,30 Q50,20 50,15" />
    </g>
  </svg>
);

const ArtisticStaples = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50,90 L50,15" />
      <path d="M50,75 Q35,65 30,50 M50,65 Q65,55 70,40 M50,50 Q35,40 30,25 M50,40 Q65,30 70,15" strokeWidth="2" />
      <path d="M30,50 Q40,55 50,70 M70,40 Q60,45 50,60 M30,25 Q40,30 50,45 M70,15 Q60,20 50,35" strokeWidth="2" />
      <circle cx="50" cy="10" r="3" fill="currentColor" />
    </g>
  </svg>
);

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

export default function ProductCategories() {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getIconForSlug = (slug: string) => {
    if (slug.includes("vegetable")) return <ArtisticVegetable className="w-12 h-12 text-primary" />;
    if (slug.includes("fruit") || slug.includes("herb") || slug.includes("nut")) return <ArtisticFruit className="w-12 h-12 text-secondary" />;
    if (slug.includes("flower") || slug.includes("leaf")) return <ArtisticFlower className="w-12 h-12 text-accent" />;
    if (slug.includes("root") || slug.includes("rhizome")) return <ArtisticRoot className="w-12 h-12 text-primary" />;
    return <ArtisticStaples className="w-12 h-12 text-secondary" />;
  };

  if (loading) {
     return (
        <div className="flex justify-center py-24">
           <Loader2 className="animate-spin h-10 w-10 text-primary" />
        </div>
     );
  }

  return (
    <section id="products" className="py-24 lg:py-40 bg-bg-soft relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="text-primary font-black uppercase tracking-[0.3em] text-xs">The Harvest</div>
            <h2 className="text-6xl lg:text-8xl font-heading font-black text-primary-dark tracking-tighter leading-none">
               Pure <br />
               <span className="text-secondary italic font-serif">Essentials</span>.
            </h2>
          </div>
          <div className="flex flex-col lg:items-end gap-3 max-w-sm mt-4 lg:mt-0">
            <p className="text-xl text-text-secondary font-medium lg:text-right opacity-70">
               Handpicked from High-Altitude Nepal.
            </p>
            <div className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full shadow-lg shadow-primary/30 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 2.15l-1.037 2.812m8.056 4.965l-2.812-1.036"/>
              </svg>
              <span className="text-sm font-bold uppercase tracking-wider">Click a card to explore details</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 justify-center">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              id={cat.slug} 
              className="group relative cursor-pointer perspective-1000 w-full max-w-lg mx-auto"
              onClick={() => setFlippedId(flippedId === cat.id ? null : cat.id)}
            >
               {/* 3D Flipper Container */}
               <div className={`relative aspect-[4/5] w-full transition-all duration-[800ms] preserve-3d rounded-[4rem] group-hover:scale-[1.02] ${flippedId === cat.id ? "rotate-y-180" : ""}`}>
                  
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 backface-hidden rounded-[4rem] overflow-hidden bg-white border border-white/50 shadow-2xl group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] transition-shadow duration-[800ms]">
                      {/* Image with zoom effect */}
                     <div className="absolute inset-0">
                        {cat.imageUrl ? (
                          <Image 
                            src={cat.imageUrl} 
                            alt={cat.name} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                        ) : (
                          <div className={`w-full h-full bg-bg-section flex items-center justify-center`}>
                            <div className={`w-40 h-40 rounded-full border-2 border-dashed border-primary/10 animate-spin-slow`}></div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
                     </div>

                     {/* Title & Agro SVG */}
                     <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                        <h3 className="text-3xl lg:text-4xl font-heading font-black text-white drop-shadow-2xl">
                           {cat.name}
                        </h3>
                     </div>

                     <div className={`absolute top-10 left-10 w-16 h-16 text-white opacity-20 transition-all duration-700`}>
                        <svg viewBox="0 0 100 100" fill="currentColor">
                           <path d="M50,10 Q70,40 50,90 Q30,40 50,10" />
                        </svg>
                     </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[4rem] overflow-hidden bg-white border-4 border-primary/5 shadow-2xl group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] transition-shadow duration-[800ms] p-12 flex flex-col justify-between items-center text-center">
                     <div className="w-20 h-20 bg-bg-section rounded-full flex items-center justify-center shadow-inner">
                        {getIconForSlug(cat.slug)}
                     </div>
                     
                     <div className="space-y-4">
                        <p className="text-primary font-black uppercase tracking-widest text-xs">Quick Brief</p>
                        <h4 className="text-3xl font-heading font-black text-primary-dark uppercase tracking-tighter">{cat.name}</h4>
                        <p className="text-text-secondary text-base font-medium leading-relaxed">
                           {cat.description || "Premium quality Nepalese organic products sourced naturally from high altitude farms."}
                        </p>
                     </div>

                     <div className="w-full">
                        <UniversalButton href={`/products?category=${cat.slug}`} className="w-full">
                           Explore
                        </UniversalButton>
                     </div>
                  </div>

               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
