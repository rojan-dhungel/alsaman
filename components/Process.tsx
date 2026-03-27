export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Collection",
      desc: "Gathering fresh, high-altitude produce directly from local village farms across Nepal.",
      color: "primary"
    },
    {
      num: "02",
      title: "Processing",
      desc: "Rigorous quality checks, cleaning, and eco-packaging at our central Kathmandu hub.",
      color: "secondary"
    },
    {
      num: "03",
      title: "Distribution",
      desc: "Swift air-dispatch to international hubs like Dubai for delivery to premium supermarkets.",
      color: "primary-light"
    }
  ];

  return (
    <section id="workflow" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <div className="text-primary font-bold uppercase tracking-widest text-sm">Our Operations</div>
              <h2 className="text-6xl lg:text-7xl font-heading font-black text-primary-dark leading-tight tracking-tighter">
                How We <br />
                <span className="text-secondary italic font-serif">Deliver</span>.
              </h2>
            </div>
            
            <div className="space-y-10">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-8 group">
                  <div className={`flex-shrink-0 w-20 h-20 bg-${step.color}/10 rounded-[2rem] flex items-center justify-center text-${step.color} font-black text-2xl group-hover:bg-${step.color} group-hover:text-white group-hover:rotate-6 transition-all duration-500`}>
                    {step.num}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-2xl font-black text-primary-dark mb-2 tracking-tight">{step.title}</h4>
                    <p className="text-text-secondary leading-relaxed text-lg">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="bg-bg-main rounded-[4rem] p-12 lg:p-20 relative overflow-hidden group border border-primary/5 shadow-inner">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="relative space-y-8">
                <blockquote className="space-y-6">
                  <svg className="w-12 h-12 text-primary/20" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.333 4.667C5.654 4.667 2.667 7.654 2.667 11.333v11.334C2.667 26.346 5.654 29.333 9.333 29.333h11.334c3.679 0 6.666-2.987 6.666-6.666V11.333c0-3.679-2.987-6.666-6.666-6.666H9.333zm0 2h11.334c2.578 0 4.666 2.088 4.666 4.666v11.334c0 2.578-2.088 4.666-4.666 4.666H9.333c-2.578 0-4.666-2.088-4.666-4.666V11.333c0-2.578 2.088-4.666 4.666-4.666z" />
                  </svg>
                  <p className="text-2xl font-bold text-primary-dark italic leading-relaxed">
                    "By connecting Nepalese farmers with global markets, we ensure sustainable growth for our villages and provide the world with untainted organic goodness."
                  </p>
                </blockquote>
                <div className="flex items-center gap-6 pt-8 border-t border-primary/10">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary font-black text-xl">AS</div>
                  <div>
                    <div className="text-xl font-black text-primary-dark tracking-tight">Management Team</div>
                    <div className="font-bold text-primary opacity-60 uppercase tracking-widest text-xs">Al Saman Global</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
