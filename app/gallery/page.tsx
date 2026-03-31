"use client";

import { useState } from "react";
import Image from "next/image";

const categories = ["All", "Farming", "Processing", "Packaging", "Community"];

const galleryItems = [
  { id: 1, category: "Farming", title: "High Altitude Fields" },
  { id: 2, category: "Processing", title: "Natural Drying" },
  { id: 3, category: "Packaging", title: "Eco-friendly Packaging" },
  { id: 4, category: "Community", title: "Local Farmers" },
  { id: 5, category: "Farming", title: "Organic Harvest" },
  { id: 6, category: "Processing", title: "Quality Control" },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = galleryItems.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );

  return (
    <main className="min-h-screen bg-white pb-24 pt-32 lg:pt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl lg:text-7xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            Our <span className="text-primary italic font-serif">Journey</span>
          </h1>
          <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto">
            Explore the story behind every product—from the fertile soils of Nepal to your international doorstep.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === cat
                  ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                  : "bg-bg-soft text-primary-dark/60 hover:bg-primary/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-[2.5rem] bg-bg-soft break-inside-avoid border border-primary/5 shadow-soft hover:shadow-2xl transition-all duration-700 cursor-pointer"
            >
              {/* Image Template */}
              <div className="aspect-[4/5] relative w-full overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                <div className="text-white">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">
                    {item.category}
                  </div>
                  <div className="text-xl font-heading font-black tracking-tight">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
