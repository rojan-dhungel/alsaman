"use client";

import { useEffect, useState } from "react";
import { Edit, Save, Loader2, Info } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface AboutContent {
  id: string;
  title: string;
  subtitle: string | null;
  content: string;
  imageUrl: string | null;
}

export default function AdminAboutPage() {
  const [content, setContent] = useState<Partial<AboutContent>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Page Heading state
  const [pageHeading, setPageHeading] = useState({ title: "", subtitle: "" });
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [savingHeading, setSavingHeading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [res, headingRes] = await Promise.all([
        fetch("/api/about"),
        fetch("/api/headings?key=about")
      ]);

      if (res.ok) {
        const data = await res.json();
        // Take the first one if it exists, or start fresh
        if (data && data.length > 0) {
          setContent(data[0]);
        }
      }

      if (headingRes.ok) {
        const data = await headingRes.json();
        if (data) setPageHeading({ title: data.title, subtitle: data.subtitle || "" });
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHeading = async () => {
    try {
      setSavingHeading(true);
      const res = await fetch("/api/headings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "about", ...pageHeading }),
      });
      if (res.ok) {
        setIsEditingHeading(false);
      }
    } catch (error) {
      console.error("Error saving about heading:", error);
    } finally {
      setSavingHeading(false);
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const method = content.id ? "PUT" : "POST";
      const url = content.id ? `/api/about/${content.id}` : "/api/about";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...content, order: 0, isActive: true }),
      });

      if (res.ok) {
        const data = await res.json();
        setContent(data);
        alert("About content saved successfully!");
      } else {
        const data = await res.json();
        alert(`Failed to save: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            About <span className="text-primary italic font-serif text-3xl">Section.</span>
          </h1>
          <p className="text-secondary font-medium text-sm mt-2 opacity-80">Edit the main content section of your public About page.</p>
        </div>
        <button
          onClick={() => setIsEditingHeading(!isEditingHeading)}
          className="flex items-center gap-2 bg-white text-primary-dark border border-primary/10 px-5 py-2.5 rounded-2xl hover:bg-primary/5 hover:text-primary font-bold text-sm tracking-wide uppercase transition-all shadow-sm"
        >
          <Edit size={16} />
          Edit Page Header
        </button>
      </div>

      {/* Page Heading Editor */}
      {isEditingHeading && (
        <div className="bg-primary/5 rounded-[2rem] border border-primary/10 p-8 mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-black text-primary-dark uppercase tracking-tight">Public Page Header</h2>
              <div className="flex gap-3">
                 <button 
                  onClick={() => setIsEditingHeading(false)}
                  className="px-4 py-2 text-xs font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                  onClick={handleSaveHeading}
                  disabled={savingHeading}
                  className="bg-primary text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:bg-primary-dark transition-all flex items-center gap-2"
                 >
                   {savingHeading && <Loader2 className="animate-spin h-3 w-3" />}
                   Save Header
                 </button>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="block text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 ml-2">Public Page Title</label>
                 <input 
                  type="text"
                  value={pageHeading.title}
                  onChange={(e) => setPageHeading({ ...pageHeading, title: e.target.value })}
                  placeholder="e.g. Our Journey"
                  className="w-full bg-white border border-primary/10 rounded-2xl p-4 text-primary-dark font-black focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                 />
              </div>
              <div className="space-y-3">
                 <label className="block text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 ml-2">Public Page Subtitle / Description</label>
                 <input 
                  type="text"
                  value={pageHeading.subtitle}
                  onChange={(e) => setPageHeading({ ...pageHeading, subtitle: e.target.value })}
                  placeholder="e.g. Al Saman Global is a business group established in 2018..."
                  className="w-full bg-white border border-primary/10 rounded-2xl p-4 text-primary-dark font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                 />
              </div>
           </div>
        </div>
      )}

      {/* Main Content Form */}
      <form onSubmit={handleSaveContent} className="bg-white rounded-[2.5rem] border border-primary/5 shadow-soft p-10 space-y-10">
        <div className="flex items-center gap-4 text-primary/40 pb-6 border-b border-primary/5">
           <Info size={24} />
           <p className="text-sm font-medium italic">This section appears directly below the header on your public About page.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 ml-2">Section Title</label>
              <input
                type="text"
                required
                value={content.title || ""}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                placeholder="e.g. About Our Mission"
                className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-5 text-primary-dark font-black focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-lg"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 ml-2">Section Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ""}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                placeholder="e.g. From Nepal to the World"
                className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-5 text-primary-dark italic font-serif focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-lg"
              />
            </div>
          </div>

          <ImageUpload 
            value={content.imageUrl} 
            onChange={(url) => setContent({ ...content, imageUrl: url })}
            label="Section Image"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 ml-2">Detailed Content</label>
          <textarea
            required
            rows={10}
            value={content.content || ""}
            onChange={(e) => setContent({ ...content, content: e.target.value })}
            placeholder="Describe your journey, values, and impact..."
            className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-6 text-primary-dark font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none text-base leading-relaxed"
          />
        </div>

        <div className="flex justify-end pt-10 border-t border-primary/5">
          <button
            type="submit"
            disabled={saving}
            className="px-12 py-4 bg-primary text-white font-black tracking-widest uppercase text-sm rounded-2xl hover:bg-primary-dark shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 disabled:opacity-70"
          >
            {saving ? <Loader2 className="animate-spin h-5 w-5" /> : <Save size={20} />}
            {saving ? "SAVING..." : "SAVE ABOUT SECTION"}
          </button>
        </div>
      </form>
    </div>
  );
}
