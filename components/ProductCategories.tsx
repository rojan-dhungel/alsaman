"use client";

import { useState } from "react";
import Image from "next/image";
import UniversalButton from "./UniversalButton";

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

export default function ProductCategories() {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const categories = [
    {
      id: "vegetables",
      title: "Vegetables",
      image: "/vegetables.png",
      color: "primary",
      icon: <ArtisticVegetable className="w-12 h-12 text-primary" />,
      description: "Organic vegetables harvested from high-altitude farms, 100% pesticide-free and packed with nutrients."
    },
    {
      id: "fruits",
      title: "Fruits",
      image: "/fruits.png",
      color: "secondary",
      icon: <ArtisticFruit className="w-12 h-12 text-secondary" />,
      description: "Naturally ripened, hand-picked fruits from the Himalayan foothills, delivered fresh to your table."
    },
    {
      id: "flowers",
      title: "Flowers",
      image: "/flowers.png",
      color: "accent",
      icon: <ArtisticFlower className="w-12 h-12 text-accent" />,
      description: "Vibrant and long-lasting exotic flowers, carefully packed for international export and special occasions."
    }
  ];

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
          <p className="text-xl text-text-secondary font-medium max-w-sm lg:text-right opacity-70">
             Handpicked from High-Altitude Nepal. Click a card to explore details.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              id={cat.id} 
              className="group relative cursor-pointer perspective-1000"
              onClick={() => setFlippedId(flippedId === cat.id ? null : cat.id)}
            >
               {/* 3D Flipper Container */}
               <div className={`relative aspect-[4/5] w-full transition-all duration-700 preserve-3d rounded-[3.5rem] ${flippedId === cat.id ? "rotate-y-180" : ""}`}>
                  
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 backface-hidden rounded-[3.5rem] overflow-hidden bg-white border border-white/50 shadow-soft">
                     {/* Image with zoom effect */}
                     <div className="absolute inset-0">
                        {cat.image && (cat.id === 'vegetables') ? (
                          <Image 
                            src={cat.image} 
                            alt={cat.title} 
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
                     <div className="absolute inset-x-0 bottom-0 p-10">
                        <h3 className="text-5xl font-heading font-black text-white drop-shadow-2xl">
                           {cat.title}
                        </h3>
                     </div>

                     <div className={`absolute top-10 left-10 w-16 h-16 text-white opacity-20 transition-all duration-700`}>
                        <svg viewBox="0 0 100 100" fill="currentColor">
                           <path d="M50,10 Q70,40 50,90 Q30,40 50,10" />
                        </svg>
                     </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[3.5rem] overflow-hidden bg-white border-4 border-primary/5 shadow-2xl p-12 flex flex-col justify-between items-center text-center">
                     <div className="w-20 h-20 bg-bg-section rounded-full flex items-center justify-center shadow-inner">
                        {cat.icon}
                     </div>
                     
                     <div className="space-y-4">
                        <p className="text-primary font-black uppercase tracking-widest text-xs">Quick Brief</p>
                        <h4 className="text-3xl font-heading font-black text-primary-dark uppercase tracking-tighter">{cat.title}</h4>
                        <p className="text-text-secondary text-base font-medium leading-relaxed">
                           {cat.description}
                        </p>
                     </div>

                     <div className="w-full">
                        <UniversalButton href={`#${cat.id}`} className="w-full">
                           Explore {cat.title}
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
