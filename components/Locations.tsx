import Image from "next/image";
import UniversalButton from "./UniversalButton";

export default function Locations() {
  const hubs = [
    {
      country: "Qatar",
      name: "Al Saman Global (QATAR)",
      flag: "/icons/qatar.svg",
      address: "Souq Al Kabeer Bur Dubai, UAE",
      phone: "+971567913239",
      email: "info.al.saman@gmail.com",
      color: "secondary",
      width: 50,
      height: 28
    },
    {
      country: "Nepal",
      name: "Al Saman Intl. (NEPAL)",
      flag: "/icons/nepal.svg",
      address: "Satdobato kathmandu, Nepal",
      phone: "+977 9851005869",
      email: "info@alsamanglobal.com",
      color: "primary",
      width: 25,
      height: 32
    }
  ];

  return (
    <section id="contact" className="py-32 bg-primary-dark text-white relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[250px] -mr-96 -mt-96 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[250px] -ml-96 -mb-96"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="text-secondary-light font-black uppercase tracking-[0.4em] text-xs opacity-60">Global Operations</div>
          <h2 className="text-5xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-tight">
             Our <span className="text-secondary italic font-serif">Footprints</span>.
          </h2>
        </div>
        
        {/* Compact Parallax Operations Bar */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl p-6 lg:p-8 backdrop-blur-md">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-6">
            
            {/* Hubs Content */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 w-full divide-y md:divide-y-0 md:divide-x divide-white/10">
              {hubs.map((hub, idx) => (
                <div key={hub.country} className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 group ${idx === 1 ? 'md:pl-10 xl:pl-16' : ''}`}>
                  <div className="flex-shrink-0 w-16 flex justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="rounded-lg overflow-hidden shadow-2xl">
                      <Image 
                        src={hub.flag} 
                        width={hub.country === "Qatar" ? 48 : 28} 
                        height={hub.country === "Qatar" ? 32 : 36} 
                        alt={`${hub.country} Flag`}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-black tracking-tight">{hub.name}</h3>
                    <div className="space-y-1 text-[13px] opacity-70 font-medium leading-tight">
                      <p className="flex items-start gap-2 max-w-[220px]">
                         <span className="text-secondary font-black uppercase text-[10px] mt-0.5">Addr:</span>
                         {hub.address}
                      </p>
                      <p className="flex items-center gap-2">
                         <span className="text-secondary font-black uppercase text-[10px]">Call:</span>
                         {hub.phone}
                      </p>
                      <p className="flex items-center gap-2 truncate max-w-[200px]">
                         <span className="text-secondary font-black uppercase text-[10px]">Mail:</span>
                         {hub.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Single Unified Action */}
            <div className="w-full xl:w-auto px-4">
              <UniversalButton href="#contact" className="w-full xl:w-auto py-4 px-10">
                Contact Now
              </UniversalButton>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
