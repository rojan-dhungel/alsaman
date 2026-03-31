"use client";

import Link from "next/link";
import Image from "next/image";
import UniversalButton from "@/components/UniversalButton";

const blogPosts = [
  {
    slug: "organic-farming-nepal",
    title: "The Rise of Organic Farming in Nepal",
    excerpt: "Discover how traditional farming methods are being revitalized for the global market.",
    date: "March 15, 2026",
    category: "Insights",
  },
  {
    slug: "exporting-high-altitude",
    title: "Challenges of High-Altitude Export",
    excerpt: "Logistics, freshness, and quality control: how we bridge the gap from peaks to ports.",
    date: "March 10, 2026",
    category: "Logistics",
  },
  {
    slug: "sustainable-packaging",
    title: "Moving Towards 100% Sustainable Packaging",
    excerpt: "Our commitment to the environment starts with how we pack our premium products.",
    date: "March 05, 2026",
    category: "Environment",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-bg-soft pb-24 pt-32 lg:pt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 space-y-6">
          <h1 className="text-5xl lg:text-7xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            The <span className="text-secondary italic font-serif">Al Saman</span> Journal
          </h1>
          <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto">
            Updates, stories, and insights from the heart of Nepalese agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <article 
              key={post.slug}
              className="group bg-white rounded-[3rem] overflow-hidden border border-primary/5 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Image Template */}
              <div className="aspect-video bg-bg-section relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                   </svg>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-primary rounded-full border border-primary/5">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-10 flex-grow flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                    {post.date}
                  </div>
                  <h2 className="text-2xl font-heading font-black text-primary-dark leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary font-medium leading-relaxed italic">
                    "{post.excerpt}"
                  </p>
                </div>
                
                <div className="pt-8 border-t border-dashed border-primary/10 flex justify-between items-center">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-[11px] font-black uppercase tracking-[0.2em] text-primary group-hover:text-accent flex items-center gap-2"
                  >
                    Read Story
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-32 p-12 lg:p-24 bg-primary-dark rounded-[4rem] text-center relative overflow-hidden group">
           <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
             {/* Abstract pattern */}
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0,0 Q50,100 100,0" fill="none" stroke="white" strokeWidth="0.5" />
               <path d="M0,100 Q50,0 100,100" fill="none" stroke="white" strokeWidth="0.5" />
             </svg>
           </div>
           
           <div className="relative z-10 space-y-8">
             <h3 className="text-4xl lg:text-6xl font-heading font-black text-white tracking-tighter uppercase">Stay <span className="text-accent">Updated</span></h3>
             <p className="text-white/60 text-xl font-medium max-w-xl mx-auto italic">Receive our latest crop updates and export insights directly to your inbox.</p>
             <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/20 transition-all"
                />
                <button className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-primary-dark transition-all">
                  Join
                </button>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
