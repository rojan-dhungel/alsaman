"use client";

import { useState } from "react";
import Link from "next/link";
import UniversalButton from "./UniversalButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-soft rounded-[2rem] px-6 py-3 transition-all duration-300">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
              <span className="text-white font-bold text-xl">AS</span>
            </div>
            <span className="text-xl font-heading font-extrabold tracking-tight text-primary-dark">
              Al Saman <span className="text-primary">Global</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1 font-black text-[13px] uppercase tracking-wider">
            <NavLink href="/#home">Home</NavLink>
            <NavLink href="/#about">About Us</NavLink>
            <NavLink href="/#workflow">How we work</NavLink>
            
            <div className="relative group px-4 py-2 cursor-pointer flex items-center gap-1 group/nav">
              <span className="relative z-10 text-primary-dark/70 group-hover/nav:text-accent transition-colors duration-300">Products</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50 group-hover/nav:rotate-180 transition-transform group-hover/nav:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="absolute bottom-1 left-4 right-6 h-0.5 bg-accent origin-left scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300"></span>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300">
                <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden min-w-[280px]">
                  <DropdownLink href="/products/vegetables">VEGETABLES</DropdownLink>
                  <DropdownLink href="/products/medicinal-herbs">HERBS, FRUITS & NUTS</DropdownLink>
                  <DropdownLink href="/products/flowers-leaves">FLOWERS & LEAVES</DropdownLink>
                  <DropdownLink href="/products/roots-rhizomes">ROOTS & RHIZOMES</DropdownLink>
                  <DropdownLink href="/products/staples-commodities">STAPLES & COMMODITIES</DropdownLink>
                </div>
              </div>
            </div>

            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-1 font-black text-[13px] uppercase tracking-wider gap-4">
            <UniversalButton href="/contact" className="py-2.5 px-6 rounded-full text-sm">
              Contact Us
            </UniversalButton>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-primary hover:bg-primary/5 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-[550px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col space-y-2 pb-4">
            <MobileNavLink href="/#home" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/#about" onClick={() => setIsMobileMenuOpen(false)}>About Us</MobileNavLink>
            <MobileNavLink href="/#workflow" onClick={() => setIsMobileMenuOpen(false)}>How we work</MobileNavLink>
            <div className="px-4 py-2 font-bold text-primary-dark border-b border-border/50 uppercase text-[10px] tracking-widest opacity-40">Products</div>
            <MobileNavLink href="/products/vegetables" className="pl-8 text-sm opacity-80">VEGETABLES</MobileNavLink>
            <MobileNavLink href="/products/medicinal-herbs" className="pl-8 text-sm opacity-80">HERBS, FRUITS & NUTS</MobileNavLink>
            <MobileNavLink href="/products/flowers-leaves" className="pl-8 text-sm opacity-80">FLOWERS & LEAVES</MobileNavLink>
            <MobileNavLink href="/products/roots-rhizomes" className="pl-8 text-sm opacity-80">ROOTS & RHIZOMES</MobileNavLink>
            <MobileNavLink href="/products/staples-commodities" className="pl-8 text-sm opacity-80">STAPLES & COMMODITIES</MobileNavLink>
            <MobileNavLink href="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</MobileNavLink>
            <MobileNavLink href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileNavLink>
            <Link 
              href="/contact" 
              className="mt-4 w-full py-3 bg-primary text-white rounded-2xl font-bold text-center shadow-lg uppercase text-xs tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="relative px-4 py-2 group transition-all duration-300 text-primary-dark/70 hover:text-accent"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </Link>
  );
}

function DropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="block px-6 py-3 text-sm text-text-secondary hover:bg-bg-main hover:text-primary transition-colors border-b last:border-0 border-border/50"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, className = "", onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`block px-4 py-3 rounded-2xl hover:bg-primary/5 text-text-primary font-medium transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
