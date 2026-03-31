"use client";

import { use } from "react";
import Link from "next/link";
import UniversalButton from "@/components/UniversalButton";

const blogPosts = [
  {
    slug: "organic-farming-nepal",
    title: "The Rise of Organic Farming in Nepal",
    content: `
      Organic farming in Nepal is more than just a trend; it's a return to our roots. For generations, farmers in the high-altitude regions of the Himalayas have practiced natural agriculture, free from synthetic pesticides and fertilizers. 
      Today, Al Saman Global is working to bring these traditional methods to the forefront of the international market. By combining ancestral wisdom with modern quality control standards, we ensure that every product—from our medicinal herbs to our mountain vegetables—is of the highest purity.
    `,
    date: "March 15, 2026",
    category: "Insights",
    author: "Agro Team"
  },
  {
    slug: "exporting-high-altitude",
    title: "Challenges of High-Altitude Export",
    content: `
      Exporting premium products from the remote villages of Nepal presents unique logistical challenges. The journey from a high-altitude farm to an international port involves careful temperature management, specialized packaging, and rigorous quality checks. 
      Our workflow is designed to bridge this gap, ensuring that the freshness and nutritional value of the products are preserved throughout the journey. We take pride in our ability to navigate these complexities, delivering the essence of Nepal's peaks to our global partners.
    `,
    date: "March 10, 2026",
    category: "Logistics",
    author: "Supply Chain Dept"
  },
  {
    slug: "sustainable-packaging",
    title: "Moving Towards 100% Sustainable Packaging",
    content: `
      At Al Saman Global, our commitment to the environment extends beyond the farm. Packaging plays a crucial role in our sustainability mission. We are actively transitioning to biodegradable and recyclable materials for all our export items.
      By reducing our plastic footprint and utilizing locally sourced fibers for packaging, we are not only protecting the environment but also supporting local artisans. This holistic approach ensures that our business growth contributes positively to the planet.
    `,
    date: "March 05, 2026",
    category: "Environment",
    author: "Sustainability Team"
  },
];

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black text-primary-dark mb-4 tracking-tighter uppercase">Story Not Found</h1>
        <UniversalButton href="/blog">Back to Journal</UniversalButton>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-24 pt-32 lg:pt-48">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <nav className="mb-12 flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-primary-dark/40">
          <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Journal
          </Link>
        </nav>

        <article className="space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/5 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">
               {post.category}
            </div>
            <h1 className="text-5xl lg:text-7xl font-heading font-black text-primary-dark tracking-tighter leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm font-bold text-text-secondary opacity-60">
               <span>{post.date}</span>
               <span className="w-1.5 h-1.5 rounded-full bg-primary/20"></span>
               <span>By {post.author}</span>
            </div>
          </header>

          {/* Featured Image Template */}
          <div className="aspect-video w-full bg-bg-soft rounded-[3rem] overflow-hidden relative group">
             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity p-20 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-xs font-black uppercase tracking-widest text-primary-dark">Journal Hero Image Template</div>
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
          </div>

          <div className="prose prose-xl prose-primary-dark max-w-none">
             <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed font-medium first-letter:text-7xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left whitespace-pre-line">
               {post.content}
             </p>
          </div>

          {/* Footer Navigation */}
          <footer className="pt-16 border-t border-dashed border-primary/10">
             <div className="p-12 bg-bg-soft rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-widest text-primary">Explore More</div>
                   <div className="text-xl font-heading font-black text-primary-dark tracking-tight">Enjoyed this story?</div>
                </div>
                <UniversalButton href="/blog" variant="primary">
                   Browse More Articles
                </UniversalButton>
             </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
