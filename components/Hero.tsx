import Image from "next/image";
import { Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative transition-all duration-700">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 lg:pt-36 lg:pb-40 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Content area */}
          <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in-up">
            
            <h1 className="text-6xl lg:text-[7.5rem] font-heading font-black text-primary-dark leading-[0.95] tracking-tighter">
              Freshness <br />
              <span className="text-secondary italic font-serif">Simplified</span>.
            </h1>
            
            <p className="max-w-xl mx-auto lg:mx-0 text-xl text-text-secondary leading-relaxed font-medium opacity-90">
              Straight from the pristine villages of Nepal to your table. 
              We bridge the gap with the world's most nutrient-rich organic produce.
            </p>

            <div className="pt-8 space-y-4">
               <p className="text-primary font-black uppercase tracking-[0.3em] text-sm">Gift of the nature</p>
               <p className="text-text-secondary text-lg max-w-md mx-auto lg:mx-0 italic font-medium">
                 "Food from the higher altitudes of Nepal, where nature dictates the quality, 
                 not chemicals."
               </p>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-12 grid grid-cols-2 lg:grid-cols-3 gap-8 border-t border-primary/10 opacity-70">
               <div>
                  <div className="text-3xl font-black text-primary-dark">2018</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Established</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-primary-dark">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Organic</div>
               </div>
               <div className="hidden lg:block">
                  <div className="text-3xl font-black text-primary-dark">50+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Farmers</div>
               </div>
            </div>
          </div>

          {/* Large imagery area - Asymmetrical and layered like reference */}
          <div className="flex-1 relative lg:max-w-2xl transform lg:rotate-2 transition-all hover:rotate-0 duration-1000">
            {/* Artistic Leaf SVG 1 */}
            <div className="absolute -top-16 -left-16 w-32 h-32 text-primary/10 -rotate-12 animate-float">
               <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50,10 Q70,40 50,90 Q30,40 50,10 M50,30 L50,90 M50,40 L35,30 M50,60 L65,50" />
               </svg>
            </div>

            <div className="relative z-20 rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white/50 backdrop-blur-sm">
              <Image 
                src="/hero.png" 
                alt="Nepalese Produce" 
                width={800} 
                height={800} 
                className="w-full h-auto object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                priority
              />
            </div>
            
            {/* Decorative organic elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 z-30 border border-border/50 translate-y-6 lg:translate-y-0">

<div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
  <Leaf className="w-7 h-7 text-white" />
</div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Export Quality</p>
                  <p className="text-lg font-black text-primary-dark leading-tight">Handpicked Batch</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
