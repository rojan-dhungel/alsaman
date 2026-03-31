"use client";

import UniversalButton from "@/components/UniversalButton";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-32 lg:pt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Info */}
          <div className="space-y-12">
            <div className="space-y-6">
               <div className="text-secondary font-black uppercase tracking-[0.3em] text-xs">Get in Touch</div>
               <h1 className="text-6xl lg:text-8xl font-heading font-black text-primary-dark tracking-tighter leading-none">
                 Let's <br />
                 <span className="text-primary italic font-serif text-5xl lg:text-7xl">Connect.</span>
               </h1>
               <p className="text-xl text-text-secondary font-medium max-w-md leading-relaxed">
                 Whether you're looking for a bulk export partner or have questions about our organic farming, we're here to help.
               </p>
            </div>

            <div className="space-y-8">
               <ContactInfoItem 
                 label="Headquarters"
                 value="Kathmandu, Nepal"
                 icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />}
               />
               <ContactInfoItem 
                 label="Email"
                 value="info@alsamanglobal.com"
                 icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
               />
               <ContactInfoItem 
                 label="Phone"
                 value="+977 1 4XXXXXX"
                 icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
               />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
             <div className="absolute -inset-4 bg-bg-soft rounded-[3.5rem] -rotate-1 pointer-events-none opacity-50"></div>
             <div className="relative bg-white rounded-[3rem] p-10 lg:p-14 shadow-2xl border border-primary/5 space-y-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" placeholder="John Doe" />
                    <InputField label="Email Address" placeholder="john@example.com" type="email" />
                  </div>
                  <InputField label="Subject" placeholder="Bulk Inquiry for Medicinal Herbs" />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-dark opacity-40 ml-1">Message</label>
                    <textarea 
                      rows={5}
                      placeholder="Tell us about your requirements..."
                      className="w-full bg-bg-soft border-2 border-transparent rounded-2xl px-6 py-4 text-primary-dark font-medium placeholder:opacity-30 focus:outline-none focus:border-primary/20 focus:bg-white transition-all resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button className="w-full bg-primary-dark hover:bg-accent text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest transition-all shadow-xl shadow-primary-dark/20 flex items-center justify-center gap-3 active:scale-95 group">
                      Send Message
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </form>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function ContactInfoItem({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-6 group">
       <div className="w-14 h-14 rounded-2xl bg-bg-soft flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
       </div>
       <div>
         <div className="text-[10px] font-black uppercase tracking-widest text-primary-dark opacity-40 mb-1">{label}</div>
         <div className="text-xl font-bold text-primary-dark">{value}</div>
       </div>
    </div>
  );
}

function InputField({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-primary-dark opacity-40 ml-1">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full bg-bg-soft border-2 border-transparent rounded-2xl px-6 py-4 text-primary-dark font-medium placeholder:opacity-30 focus:outline-none focus:border-primary/20 focus:bg-white transition-all"
      />
    </div>
  );
}
