"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

interface AboutContent {
  id: string;
  title: string;
  subtitle: string | null;
  content: string;
  imageUrl: string | null;
  order: number;
}

interface Heading {
  title: string;
  subtitle: string | null;
}

export default function AboutPage() {
  const [contents, setContents] = useState<AboutContent[]>([]);
  const [heading, setHeading] = useState<Heading>({
    title: "Our Journey",
    subtitle: "Al Saman Global is a business group established in 2018, connecting the organic riches of Nepal to the world."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [contentsRes, headingRes] = await Promise.all([
          fetch("/api/about"),
          fetch("/api/headings?key=about")
        ]);

        if (contentsRes.ok) {
          const data = await contentsRes.json();
          setContents(data.sort((a: AboutContent, b: AboutContent) => a.order - b.order));
        }

        if (headingRes.ok) {
          const data = await headingRes.json();
          if (data) setHeading({ title: data.title, subtitle: data.subtitle });
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-bg-main selection:bg-primary/20">
      <main className="pt-32 pb-24">
        {/* Dynamic Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
            <h1 className="text-6xl lg:text-9xl font-heading font-black text-primary-dark leading-tight tracking-tighter">
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
              <p className="text-2xl lg:text-4xl font-bold text-text-secondary leading-tight opacity-80">
                {heading.subtitle}
              </p>
            )}
          </div>
        </section>

        {/* Dynamic Content Sections */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-0">
            {contents.map((block, index) => (
              <section key={block.id} className={`py-24 lg:py-32 ${index % 2 === 1 ? 'bg-white border-y border-border/50' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-20 items-center`}>
                    <div className="flex-1 space-y-8">
                      <div className="space-y-4">
                        <p className="text-primary font-black uppercase tracking-widest text-sm">About Us</p>
                        <h2 className="text-4xl lg:text-6xl font-heading font-black text-primary-dark tracking-tight">{block.title}</h2>
                        {block.subtitle && <p className="text-primary italic font-serif text-2xl">{block.subtitle}</p>}
                      </div>
                      <p className="text-lg lg:text-xl text-text-secondary leading-relaxed font-medium whitespace-pre-wrap">
                        {block.content}
                      </p>
                    </div>
                    {block.imageUrl && (
                      <div className="flex-1 w-full">
                        <div className="aspect-[4/3] bg-bg-section rounded-[4rem] overflow-hidden shadow-2xl relative border border-primary/5">
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img 
                            src={block.imageUrl} 
                            alt={block.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                            onError={(e) => (e.currentTarget.src = "https://placehold.co/800x600?text=About+Image")}
                           />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Static Values Section (Keep for branding) */}
        <section className="py-24 lg:py-40">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20 space-y-6">
                 <h2 className="text-5xl lg:text-7xl font-heading font-black text-primary-dark tracking-tight">Gift of the Nature</h2>
                 <p className="text-xl text-text-secondary max-w-3xl mx-auto italic font-medium opacity-70">
                    "Food from higher altitudes of Nepal, naturally gifted and unmatched."
                 </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                 <div className="group space-y-6 p-10 bg-white rounded-[3rem] border border-primary/5 shadow-soft hover:shadow-2xl transition-all duration-500">
                    <div className="text-5xl transform group-hover:scale-125 transition-transform">🏔️</div>
                    <h4 className="text-2xl font-black text-primary-dark uppercase tracking-tight">High Altitude</h4>
                    <p className="text-text-secondary leading-relaxed font-medium">
                       Home to Mount Everest. 8 of the 10 highest peaks in the world are in Nepal.
                    </p>
                 </div>
                 <div className="group space-y-6 p-10 bg-white rounded-[3rem] border border-primary/5 shadow-soft hover:shadow-2xl transition-all duration-500">
                    <div className="text-5xl transform group-hover:scale-125 transition-transform">🌱</div>
                    <h4 className="text-2xl font-black text-primary-dark uppercase tracking-tight">Chemical Free</h4>
                    <p className="text-text-secondary leading-relaxed font-medium">
                       High altitude naturally negates the need for manual alteration with inorganic chemicals.
                    </p>
                 </div>
                 <div className="group space-y-6 p-10 bg-white rounded-[3rem] border border-primary/5 shadow-soft hover:shadow-2xl transition-all duration-500">
                    <div className="text-5xl transform group-hover:scale-125 transition-transform">🧔</div>
                    <h4 className="text-2xl font-black text-primary-dark uppercase tracking-tight">Farmer Power</h4>
                    <p className="text-text-secondary leading-relaxed font-medium">
                       Agriculture is the mainstay. We empower remote farmers to reach global markets.
                    </p>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
