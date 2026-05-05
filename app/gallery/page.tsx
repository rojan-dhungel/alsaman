"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  category: string | null;
  title: string;
  imageUrl: string;
  description: string | null;
}

interface Heading {
  title: string;
  subtitle: string | null;
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [heading, setHeading] = useState<Heading>({
    title: "Our Journey",
    subtitle: "Explore the story behind every product—from the fertile soils of Nepal to your international doorstep."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [itemsRes, headingRes] = await Promise.all([
          fetch("/api/gallery"),
          fetch("/api/headings?key=gallery")
        ]);

        if (itemsRes.ok) {
          const data = await itemsRes.json();
          setItems(data);
        }

        if (headingRes.ok) {
          const data = await headingRes.json();
          if (data) setHeading({ title: data.title, subtitle: data.subtitle });
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique categories from items
  const categories = ["All", ...Array.from(new Set(items.map(item => item.category).filter(Boolean))) as string[]];

  const filteredItems = items.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );

  return (
    <main className="min-h-screen bg-white pb-24 pt-32 lg:pt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl lg:text-7xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            {heading.title.split(" ").map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? (
                  <span className="text-primary italic font-serif ml-2">{word}</span>
                ) : (
                  <span>{word} </span>
                )}
              </span>
            ))}
          </h1>
          {heading.subtitle && (
            <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto">
              {heading.subtitle}
            </p>
          )}
        </div>

        {/* Filter Tabs */}
        {categories.length > 1 && (
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
        )}

        {/* Masonry-style Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 opacity-40 italic font-medium">No images found in the gallery.</div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded-[2.5rem] bg-bg-soft break-inside-avoid border border-primary/5 shadow-soft hover:shadow-2xl transition-all duration-700 cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[4/5] relative w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/600x800?text=Image+Not+Found")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <div className="text-white">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">
                      {item.category || "General"}
                    </div>
                    <div className="text-xl font-heading font-black tracking-tight">
                      {item.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
