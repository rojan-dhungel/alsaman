"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon, Star, Search, Filter, Check, X, Loader2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  altText: string | null;
  category: string | null;
  featured: boolean;
}

const ALPHABET = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<GalleryItem>>({});
  const [saving, setSaving] = useState(false);

  // Page Heading state
  const [pageHeading, setPageHeading] = useState({ title: "", subtitle: "" });
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [savingHeading, setSavingHeading] = useState(false);

  // Inline title editing
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [editingTitleValue, setEditingTitleValue] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    fetchGallery();
    fetchHeading();
  }, []);

  const fetchHeading = async () => {
    try {
      const res = await fetch("/api/headings?key=gallery");
      if (res.ok) {
        const data = await res.json();
        if (data) setPageHeading({ title: data.title, subtitle: data.subtitle || "" });
      }
    } catch (error) {
      console.error("Error fetching gallery heading:", error);
    }
  };

  const handleSaveHeading = async () => {
    try {
      setSavingHeading(true);
      const res = await fetch("/api/headings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "gallery", ...pageHeading }),
      });
      if (res.ok) {
        setIsEditingHeading(false);
      }
    } catch (error) {
      console.error("Error saving gallery heading:", error);
    } finally {
      setSavingHeading(false);
    }
  };

  useEffect(() => {
    if (editingTitleId && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [editingTitleId]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image from the gallery?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) fetchGallery();
      else alert("Failed to delete gallery item");
    } catch (error) {
      console.error("Error deleting gallery item:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const method = currentItem.id ? "PUT" : "POST";
      const url = currentItem.id ? `/api/gallery/${currentItem.id}` : "/api/gallery";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentItem),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchGallery();
      } else {
        const data = await res.json();
        alert(`Failed to save: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving gallery item:", error);
      alert("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  // Inline title save
  const saveInlineTitle = async (id: string) => {
    if (!editingTitleValue.trim()) {
      cancelInlineTitle();
      return;
    }
    try {
      const item = items.find((i) => i.id === id);
      if (!item) return;
      const res = await fetch(`/api/gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, title: editingTitleValue }),
      });
      if (res.ok) {
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, title: editingTitleValue } : i)));
      }
    } catch (error) {
      console.error("Error updating title:", error);
    } finally {
      setEditingTitleId(null);
    }
  };

  const cancelInlineTitle = () => {
    setEditingTitleId(null);
    setEditingTitleValue("");
  };

  // Derived unique categories from gallery items
  const galleryCategories = useMemo(() => {
    const cats = new Set<string>();
    items.forEach((i) => { if (i.category) cats.add(i.category); });
    return Array.from(cats).sort();
  }, [items]);

  // Active first letters
  const activeLetters = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      const ch = i.title.charAt(0).toUpperCase();
      if (/[A-Z]/.test(ch)) set.add(ch);
      else set.add("#");
    });
    return set;
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((i) => {
      const matchesSearch =
        !searchQuery ||
        i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (i.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (i.category?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesCategory =
        selectedCategory === "all" || i.category === selectedCategory;
      const firstChar = i.title.charAt(0).toUpperCase();
      const matchesLetter =
        selectedLetter === "all" ||
        (selectedLetter === "#" ? /^[^A-Z]/.test(firstChar) : firstChar === selectedLetter);
      const matchesFeatured = !showFeaturedOnly || i.featured;
      return matchesSearch && matchesCategory && matchesLetter && matchesFeatured;
    });
  }, [items, searchQuery, selectedCategory, selectedLetter, showFeaturedOnly]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            Gallery <span className="text-primary italic font-serif text-3xl">Media.</span>
          </h1>
          <p className="text-secondary font-medium text-sm mt-2 opacity-80">
            {filteredItems.length} of {items.length} images shown
          </p>
        </div>
        <div className="flex gap-4">
           <button
            onClick={() => setIsEditingHeading(!isEditingHeading)}
            className="flex items-center gap-2 bg-white text-primary-dark border border-primary/10 px-5 py-2.5 rounded-2xl hover:bg-primary/5 hover:text-primary font-bold text-sm tracking-wide uppercase transition-all shadow-sm"
          >
            <Edit size={16} />
            Edit Page Header
          </button>
          <button
            onClick={() => {
              setCurrentItem({ featured: false });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-2xl hover:bg-primary-dark shadow-lg font-black text-sm tracking-widest uppercase transition-all"
          >
            <Plus size={18} />
            Add Image
          </button>
        </div>
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
                   {savingHeading && <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>}
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
                  placeholder="e.g. Explore the story behind every product..."
                  className="w-full bg-white border border-primary/10 rounded-2xl p-4 text-primary-dark font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                 />
              </div>
           </div>
           <p className="mt-4 text-[10px] text-primary/60 font-bold italic">* These changes will reflect immediately on the public gallery page.</p>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white rounded-[2rem] border border-primary/5 shadow-soft p-6 mb-6 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary opacity-50" />
          <input
            type="text"
            placeholder="Search by title, description or category…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-soft border border-primary/10 rounded-2xl pl-10 pr-4 py-3.5 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-secondary/40"
          />
        </div>

        {/* Category + Featured */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 mr-1">
            <Filter size={13} className="text-secondary opacity-60" />
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Category:</span>
          </div>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all border ${
              selectedCategory === "all"
                ? "bg-primary text-white border-primary shadow-md"
                : "bg-bg-soft text-primary-dark border-primary/10 hover:border-primary/30"
            }`}
          >
            All
          </button>
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all border ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-bg-soft text-primary-dark border-primary/10 hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Featured toggle */}
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all border ${
              showFeaturedOnly
                ? "bg-accent text-white border-accent shadow-md"
                : "bg-bg-soft text-primary-dark border-primary/10 hover:border-accent/30"
            }`}
          >
            <Star size={11} fill={showFeaturedOnly ? "currentColor" : "none"} />
            Featured Only
          </button>
        </div>

        {/* Alphabet filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Filter by Letter</span>
          </div>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedLetter("all")}
              className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all border ${
                selectedLetter === "all"
                  ? "bg-primary text-white border-primary"
                  : "bg-bg-soft text-secondary border-primary/10 hover:border-primary/30"
              }`}
            >
              All
            </button>
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter === selectedLetter ? "all" : letter)}
                disabled={!activeLetters.has(letter)}
                className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all border ${
                  selectedLetter === letter
                    ? "bg-primary text-white border-primary"
                    : activeLetters.has(letter)
                    ? "bg-bg-soft text-primary-dark border-primary/10 hover:border-primary/30"
                    : "bg-bg-soft text-secondary/20 border-primary/5 cursor-not-allowed"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[2rem] border border-primary/5 shadow-soft">
          <ImageIcon className="mx-auto h-16 w-16 text-primary/20 mb-6" />
          <h3 className="text-2xl font-heading font-black text-primary-dark uppercase tracking-tight">No Results</h3>
          <p className="mt-2 text-secondary font-medium">Try a different filter or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-primary/5 shadow-soft overflow-hidden group">
              {/* Image */}
              <div className="relative aspect-[4/3] bg-bg-soft border-b border-primary/5 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+URL"; }}
                />
                {item.featured && (
                  <div className="absolute top-4 right-4 bg-accent text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <Star size={12} fill="currentColor" /> Featured
                  </div>
                )}
                {/* Hover overlay — only Edit modal + Delete */}
                <div className="absolute inset-0 bg-primary-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                  <button
                    onClick={() => { setCurrentItem(item); setIsModalOpen(true); }}
                    className="p-3 bg-white text-primary rounded-2xl hover:bg-bg-section transition-transform hover:scale-110 shadow-xl text-xs font-black uppercase tracking-widest px-4"
                    title="Edit"
                  >
                    Edit All Fields
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-3 bg-white text-accent rounded-2xl hover:bg-accent/10 transition-transform hover:scale-110 shadow-xl"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Inline-editable title */}
                {editingTitleId === item.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      ref={titleInputRef}
                      value={editingTitleValue}
                      onChange={(e) => setEditingTitleValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveInlineTitle(item.id);
                        if (e.key === "Escape") cancelInlineTitle();
                      }}
                      className="flex-1 text-base font-heading font-black text-primary-dark bg-bg-soft border border-primary/20 rounded-xl px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/20 min-w-0"
                    />
                    <button onClick={() => saveInlineTitle(item.id)} className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex-shrink-0" title="Save">
                      <Check size={14} />
                    </button>
                    <button onClick={cancelInlineTitle} className="p-1.5 bg-bg-section text-secondary rounded-lg hover:bg-primary/10 transition-colors flex-shrink-0" title="Cancel">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-full text-left group/title"
                    onClick={() => {
                      setEditingTitleId(item.id);
                      setEditingTitleValue(item.title);
                    }}
                    title="Click to edit title"
                  >
                    <h3 className="font-heading font-black text-lg text-primary-dark truncate group-hover/title:text-primary transition-colors border-b border-dashed border-transparent group-hover/title:border-primary/20 pb-0.5">
                      {item.title}
                    </h3>
                    <span className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest group-hover/title:text-primary/50 transition-colors">click to edit title</span>
                  </button>
                )}

                {/* Category badge */}
                <div className="mt-3">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase bg-bg-section text-primary border border-primary/10">
                    {item.category || "Uncategorized"}
                  </span>
                </div>

                {item.description && (
                  <p className="text-xs font-medium text-secondary mt-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary-dark/40 flex items-center justify-center p-4 z-[100] backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl p-8 lg:p-10 max-h-[90vh] overflow-y-auto border border-primary/10">
            <h2 className="text-3xl font-heading font-black text-primary-dark tracking-tight uppercase mb-8 border-b border-primary/10 pb-6">
              {currentItem.id ? "Edit Media." : "New Media."}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Title <span className="text-accent">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Fresh Organic Tomatoes"
                  value={currentItem.title || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                  className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm"
                />
              </div>

              <ImageUpload 
                value={currentItem.imageUrl}
                onChange={(url) => setCurrentItem({ ...currentItem, imageUrl: url })}
                label="Gallery Image"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Category</label>
                  <input
                    type="text"
                    placeholder="E.g., farm, products, events"
                    value={currentItem.category || ""}
                    onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Alt Text</label>
                  <input
                    type="text"
                    placeholder="Describe image for SEO"
                    value={currentItem.altText || ""}
                    onChange={(e) => setCurrentItem({ ...currentItem, altText: e.target.value })}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the image"
                  value={currentItem.description || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                  className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none text-sm leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-4 bg-bg-section/30 p-5 rounded-[2rem] border border-primary/5">
                <div className="relative flex items-center justify-center w-6 h-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={currentItem.featured || false}
                    onChange={(e) => setCurrentItem({ ...currentItem, featured: e.target.checked })}
                    className="peer appearance-none w-6 h-6 border-2 border-accent/30 rounded-lg checked:bg-accent checked:border-accent transition-all cursor-pointer"
                  />
                  <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <label htmlFor="featured" className="text-[10px] font-black uppercase tracking-widest text-primary-dark cursor-pointer hover:text-accent transition-colors">
                  Mark as Featured Selection
                </label>
              </div>

              <div className="flex justify-end gap-4 pt-8 border-t border-primary/10 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="px-6 py-3 text-secondary font-bold hover:bg-bg-section rounded-2xl transition-all border border-transparent hover:border-primary/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-primary text-white font-black tracking-widest uppercase text-sm rounded-2xl hover:bg-primary-dark shadow-lg transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>}
                  {saving ? "Saving..." : "Save Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
