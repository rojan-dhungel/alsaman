import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-main selection:bg-primary/20">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
            <h1 className="text-6xl lg:text-9xl font-heading font-black text-primary-dark leading-tight tracking-tighter">
              Our <span className="text-primary italic font-serif">Journey</span>.
            </h1>
            <p className="text-2xl lg:text-4xl font-bold text-text-secondary leading-tight opacity-80">
              Al Saman Global is a business group established in 2018, 
              connecting the organic riches of Nepal to the world.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="bg-white py-24 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               <div className="space-y-12">
                  <div className="space-y-4">
                     <p className="text-primary font-black uppercase tracking-widest text-sm">Mission & Vision</p>
                     <p className="text-lg text-text-secondary leading-loose font-medium">
                        Export Vegetables, Fruits, Flowers, and other agricultural products from our homeland Nepal 
                        to Europe, the Middle East, and the USA. In the future, we aim to spread our service globally. 
                        We encourage our farmers to produce high-quality organic products that command high demand 
                        internationally.
                     </p>
                  </div>
                  <div className="space-y-4">
                     <p className="text-primary font-black uppercase tracking-widest text-sm">Our Aim</p>
                     <p className="text-lg text-text-secondary leading-loose font-medium">
                        To contribute foreign currency revenue by selling agricultural products to third countries. 
                        As an agricultural country importing billions in produce, we aim to revolutionize this cycle 
                        and make Nepal economically sustainable through modernized, organic farming.
                     </p>
                  </div>
               </div>
               <div className="relative">
                  <div className="aspect-square bg-bg-section rounded-[4rem] overflow-hidden shadow-2xl relative">
                     <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
                     <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-primary/30 to-transparent">
                        <p className="text-white font-black text-4xl">100+<br />Agro-Ecological Zones</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Gift of Nature Section */}
        <section className="py-24 lg:py-40">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20 space-y-6">
                 <h2 className="text-5xl lg:text-7xl font-heading font-black text-primary-dark">Gift of the Nature</h2>
                 <p className="text-xl text-text-secondary max-w-3xl mx-auto italic font-medium opacity-70">
                    "Food from higher altitudes of Nepal, naturally gifted and unmatched."
                 </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                 <div className="space-y-6">
                    <div className="text-5xl">🏔️</div>
                    <h4 className="text-2xl font-black text-primary-dark">High Altitude</h4>
                    <p className="text-text-secondary leading-relaxed">
                       Home to Mount Everest. 8 of the 10 highest peaks in the world are in Nepal.
                    </p>
                 </div>
                 <div className="space-y-6">
                    <div className="text-5xl">🌱</div>
                    <h4 className="text-2xl font-black text-primary-dark">Chemical Free</h4>
                    <p className="text-text-secondary leading-relaxed">
                       High altitude naturally negates the need for manual alteration with inorganic chemicals.
                    </p>
                 </div>
                 <div className="space-y-6">
                    <div className="text-5xl">🧔</div>
                    <h4 className="text-2xl font-black text-primary-dark">2/3 Farmer Pop.</h4>
                    <p className="text-text-secondary leading-relaxed">
                       Agriculture is the mainstay. We empower remote farmers to reach global markets.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* Partnership side: Qatar & Opportunities */}
        <section className="bg-primary-dark text-white py-24 lg:py-40 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/10 skew-x-12 -mr-32"></div>
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col lg:flex-row gap-20 items-center">
                 <div className="flex-1 space-y-12">
                    <div className="space-y-6">
                       <h2 className="text-5xl lg:text-7xl font-heading font-black leading-tight">Partnership with Qatar</h2>
                       <p className="text-2xl font-bold opacity-80 decoration-secondary decoration-4 underline underline-offset-8">What are the opportunities?</p>
                    </div>
                    <div className="space-y-8 opacity-70 text-lg leading-loose">
                       <p>
                          Qatar is a potential marketplace for Nepal. Currently, food sources are often unidentified 
                          and opened to health hazards from excessive pesticide and fertilizer use.
                       </p>
                       <p>
                          We offer chemical-free, high-altitude produce directly from Nepal's uphill remote farms. 
                          We manage scattered yields using ICT-based solutions developed over 5 years.
                       </p>
                    </div>
                 </div>
                 <div className="flex-1 w-full">
                    <div className="p-12 border-2 border-white/20 rounded-[3rem] backdrop-blur-md bg-white/5 space-y-10">
                       <div className="space-y-4">
                          <h4 className="text-3xl font-black">Health Hazard Cleanup</h4>
                          <p className="text-lg opacity-60">
                             Ending the use of unidentified sources and unethical cultivation practices.
                          </p>
                       </div>
                       <div className="w-full h-px bg-white/10"></div>
                       <div className="space-y-4">
                          <h4 className="text-3xl font-black">ICT Solutions</h4>
                          <p className="text-lg opacity-60">
                             Effectively collecting scattered yields from remote hills for 5+ years.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
