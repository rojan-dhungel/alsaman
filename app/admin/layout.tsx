"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Package, LayoutDashboard, LogOut, ChevronDown, ChevronRight, FolderTree, List, Image as ImageIcon, Info } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isProductsOpen, setIsProductsOpen] = useState(
    pathname?.startsWith("/admin/products") || pathname?.startsWith("/admin/categories")
  );

  const handleLogout = () => {
    // Basic logout handling for now
    document.cookie = "adminAuth=; max-age=0; path=/";
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen bg-bg-soft font-body">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-primary/10 flex flex-col shadow-soft z-10 relative">
        <div className="h-24 flex items-center px-8 border-b border-primary/5 bg-bg-section/30">
          <h1 className="text-2xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            Admin <span className="text-primary italic font-serif text-xl">Panel.</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <div className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 mb-4 px-3">
            Core Management
          </div>
          
          <Link
            href="/admin"
            className={`flex items-center gap-4 px-4 py-3.5 font-bold rounded-2xl transition-all group ${
              pathname === "/admin" 
                ? "bg-primary/5 text-primary" 
                : "text-primary-dark hover:bg-primary/5 hover:text-primary"
            }`}
          >
            <div className={`p-2 rounded-xl shadow-sm border transition-transform group-hover:scale-110 ${
              pathname === "/admin" ? "bg-primary/10 border-primary/20" : "bg-white border-primary/5"
            }`}>
               <LayoutDashboard size={18} className="text-primary" />
            </div>
            Dashboard
          </Link>
          
          {/* Expandable Products Menu */}
          <div className="space-y-1">
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className={`w-full flex items-center justify-between px-4 py-3.5 font-bold rounded-2xl transition-all group ${
                isProductsOpen || pathname?.startsWith("/admin/products") || pathname?.startsWith("/admin/categories")
                  ? "bg-primary/5 text-primary" 
                  : "text-primary-dark hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl shadow-sm border transition-transform group-hover:scale-110 ${
                  isProductsOpen ? "bg-primary/10 border-primary/20" : "bg-white border-primary/5"
                }`}>
                   <Package size={18} className="text-primary" />
                </div>
                Products
              </div>
              {isProductsOpen ? <ChevronDown size={16} className="text-primary" /> : <ChevronRight size={16} className="text-secondary" />}
            </button>
            
            {/* Dropdown Items */}
            <div className={`pl-12 pr-4 py-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
              isProductsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 py-0"
            }`}>
              <Link
                href="/admin/categories"
                className={`flex items-center gap-3 py-2 text-sm font-bold transition-colors ${
                  pathname === "/admin/categories" ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                <FolderTree size={14} />
                Categories
              </Link>
              <Link
                href="/admin/products"
                className={`flex items-center gap-3 py-2 text-sm font-bold transition-colors ${
                  pathname === "/admin/products" ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                <List size={14} />
                All Products
              </Link>
            </div>
          </div>

          <Link
            href="/admin/gallery"
            className={`flex items-center gap-4 px-4 py-3.5 font-bold rounded-2xl transition-all group ${
              pathname === "/admin/gallery" 
                ? "bg-primary/5 text-primary" 
                : "text-primary-dark hover:bg-primary/5 hover:text-primary"
            }`}
          >
            <div className={`p-2 rounded-xl shadow-sm border transition-transform group-hover:scale-110 ${
              pathname === "/admin/gallery" ? "bg-primary/10 border-primary/20" : "bg-white border-primary/5"
            }`}>
               <ImageIcon size={18} className="text-primary" />
            </div>
            Gallery
          </Link>

          <Link
            href="/admin/about"
            className={`flex items-center gap-4 px-4 py-3.5 font-bold rounded-2xl transition-all group ${
              pathname === "/admin/about" 
                ? "bg-primary/5 text-primary" 
                : "text-primary-dark hover:bg-primary/5 hover:text-primary"
            }`}
          >
            <div className={`p-2 rounded-xl shadow-sm border transition-transform group-hover:scale-110 ${
              pathname === "/admin/about" ? "bg-primary/10 border-primary/20" : "bg-white border-primary/5"
            }`}>
               <Info size={18} className="text-primary" />
            </div>
            About Section
          </Link>

          <div className="mt-auto pt-8">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3.5 text-accent font-bold rounded-2xl hover:bg-accent/5 transition-all group"
            >
              <div className="p-2 bg-white rounded-xl shadow-sm border border-accent/10 group-hover:scale-110 transition-transform">
                <LogOut size={18} className="text-accent" />
              </div>
              Logout
            </button>
          </div>
        </nav>
        
        {/* Footer info in sidebar */}
        <div className="p-6 border-t border-primary/5 bg-bg-section/20">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-heading font-black text-sm shadow-md">
                 AD
              </div>
              <div>
                 <p className="text-sm font-bold text-primary-dark">Admin User</p>
                 <p className="text-xs text-secondary">Manage System</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-bg-main relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-bg-section to-transparent -z-10 opacity-50" />
        <div className="max-w-6xl mx-auto p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
