import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-24 border-t border-border/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <span className="text-white font-black text-2xl">AS</span>
              </div>
              <span className="text-2xl font-heading font-black tracking-tight text-primary-dark">
                Al Saman <span className="text-primary">Global</span>
              </span>
            </Link>
            <p className="text-text-secondary text-lg leading-relaxed max-w-sm">
              Promoting and exporting high-quality, high-altitude organic products from the village farms of Nepal to the international markets.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-10 h-10 bg-bg-main rounded-full flex items-center justify-center text-primary-dark hover:bg-primary hover:text-white transition-all cursor-pointer">FB</div>
               <div className="w-10 h-10 bg-bg-main rounded-full flex items-center justify-center text-primary-dark hover:bg-primary hover:text-white transition-all cursor-pointer">IG</div>
               <div className="w-10 h-10 bg-bg-main rounded-full flex items-center justify-center text-primary-dark hover:bg-primary hover:text-white transition-all cursor-pointer">LN</div>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-8">
             <h4 className="text-primary-dark font-black tracking-widest uppercase text-xs">Quick Links</h4>
             <ul className="space-y-4 font-bold text-text-secondary">
               <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
               <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
               <li><a href="#workflow" className="hover:text-primary transition-colors">How We Work</a></li>
               <li><a href="#products" className="hover:text-primary transition-colors">Products</a></li>
             </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-8">
             <h4 className="text-primary-dark font-black tracking-widest uppercase text-xs">Resources</h4>
             <ul className="space-y-4 font-bold text-text-secondary">
               <li><a href="#gallery" className="hover:text-primary transition-colors">Gallery</a></li>
               <li><a href="#blog" className="hover:text-primary transition-colors">Latest Blog</a></li>
               <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
             </ul>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-text-secondary opacity-60 italic">
             Bringing Nepal's Organic Essence to the World since 2018.
          </p>
          <p className="text-sm font-bold text-text-secondary">
            © {new Date().getFullYear()} Al Saman Global. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
