import UniversalButton from "./UniversalButton";

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden text-center">
      {/* Subtle Background Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-section/30 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12">
          {/* Main Heading */}
          <div className="space-y-6">
             <h2 className="text-6xl lg:text-[8rem] font-heading font-black text-primary-dark leading-[0.85] tracking-tighter">
                Art of <br />
                <span className="text-secondary italic font-serif">Harvest</span>.
             </h2>
             <p className="text-2xl lg:text-3xl font-bold text-text-secondary leading-tight opacity-90 max-w-2xl mx-auto">
                Revolutionizing agriculture from the remote hills of Nepal to the global heart of Qatar.
             </p>
          </div>
          
          {/* Mission Text */}
          <div className="space-y-10">
             <p className="text-lg lg:text-xl text-text-secondary leading-relaxed opacity-80 max-w-3xl mx-auto font-medium">
                Our mission is to empower farmers to produce world-class organic goods. 
                Al Saman is more than a business; we are a dedicated movement 
                towards a sustainable, chemical-free future for families worldwide.
             </p>
             
             <div className="flex justify-center">
                <UniversalButton href="/about" className="px-12 py-5 text-lg">
                   Our Full Story
                </UniversalButton>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
