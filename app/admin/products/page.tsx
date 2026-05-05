"use client";

import { useEffect, useState, useMemo } from "react";
import { Plus, Edit, Trash2, RefreshCw, PackageOpen, Search, Filter, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  code: string;
  name: string;
  nepaliName: string | null;
  botanicalName: string | null;
  categoryId: string;
  category?: Category;
  imageUrl: string | null;
  description: string | null;
  hsCode: string | null;
  barcode: string | null;
  rate: string | null;
}

const ALPHABET = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Page Heading state
  const [pageHeading, setPageHeading] = useState({ title: "", subtitle: "" });
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [savingHeading, setSavingHeading] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState("all");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchHeading();
  }, []);

  const fetchHeading = async () => {
    try {
      const res = await fetch("/api/headings?key=products");
      if (res.ok) {
        const data = await res.json();
        if (data) setPageHeading({ title: data.title, subtitle: data.subtitle || "" });
      }
    } catch (error) {
      console.error("Error fetching products heading:", error);
    }
  };

  const handleSaveHeading = async () => {
    try {
      setSavingHeading(true);
      const res = await fetch("/api/headings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "products", ...pageHeading }),
      });
      if (res.ok) {
        setIsEditingHeading(false);
      }
    } catch (error) {
      console.error("Error saving products heading:", error);
    } finally {
      setSavingHeading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const syncProducts = async () => {
    if (!confirm("Are you sure you want to sync products from allsaman.json? This will add new products and update existing ones.")) return;
    try {
      setSyncing(true);
      const res = await fetch("/api/products/sync", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        alert(`Sync successful! Created: ${data.created}, Updated: ${data.updated}`);
        fetchProducts();
      } else {
        alert("Sync failed. Check the server console.");
      }
    } catch (error) {
      console.error("Error syncing products:", error);
      alert("Error syncing products");
    } finally {
      setSyncing(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const method = currentProduct.id ? "PUT" : "POST";
      const url = currentProduct.id ? `/api/products/${currentProduct.id}` : "/api/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProduct),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      } else {
        const data = await res.json();
        alert(`Failed to save: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  // Derived filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.categoryId === selectedCategory;
      const firstChar = p.name.charAt(0).toUpperCase();
      const matchesLetter =
        selectedLetter === "all" ||
        (selectedLetter === "#" ? /^[^A-Z]/.test(firstChar) : firstChar === selectedLetter);
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.nepaliName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesCategory && matchesLetter && matchesSearch;
    });
  }, [products, selectedCategory, selectedLetter, searchQuery]);

  // Letters that actually have products
  const activeLetters = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      const ch = p.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(ch)) set.add(ch);
      else set.add("#");
    });
    return set;
  }, [products]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            Catalog <span className="text-primary italic font-serif text-3xl">Management.</span>
          </h1>
          <p className="text-secondary font-medium text-sm mt-2 opacity-80">
            {filteredProducts.length} of {products.length} products shown
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
            onClick={syncProducts}
            disabled={syncing}
            className="flex items-center gap-2 bg-white text-primary-dark border border-primary/10 px-5 py-2.5 rounded-2xl hover:bg-primary/5 hover:text-primary font-bold text-sm tracking-wide uppercase transition-all disabled:opacity-60 shadow-sm"
          >
            <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
            Sync Json
          </button>
          <button
            onClick={() => {
              setCurrentProduct({});
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-2xl hover:bg-primary-dark shadow-lg font-black text-sm tracking-widest uppercase transition-all"
          >
            <Plus size={18} />
            Add Item
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
                  placeholder="e.g. Pure Essentials"
                  className="w-full bg-white border border-primary/10 rounded-2xl p-4 text-primary-dark font-black focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                 />
              </div>
              <div className="space-y-3">
                 <label className="block text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 ml-2">Public Page Subtitle / Description</label>
                 <input 
                  type="text"
                  value={pageHeading.subtitle}
                  onChange={(e) => setPageHeading({ ...pageHeading, subtitle: e.target.value })}
                  placeholder="e.g. Handpicked from High-Altitude Nepal..."
                  className="w-full bg-white border border-primary/10 rounded-2xl p-4 text-primary-dark font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                 />
              </div>
           </div>
           <p className="mt-4 text-[10px] text-primary/60 font-bold italic">* These changes will reflect immediately on the public products pages.</p>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white rounded-[2rem] border border-primary/5 shadow-soft p-6 mb-6 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary opacity-50" />
          <input
            type="text"
            placeholder="Search by name, code or Nepali name…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-soft border border-primary/10 rounded-2xl pl-10 pr-4 py-3.5 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm placeholder:text-secondary/40"
          />
        </div>

        {/* Category Pills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter size={13} className="text-secondary opacity-60" />
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
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
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all border ${
                  selectedCategory === c.id
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-bg-soft text-primary-dark border-primary/10 hover:border-primary/30"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Alphabet Filter */}
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

      {/* Products Table */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] shadow-soft border border-primary/5 overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-32">
              <PackageOpen className="mx-auto h-16 w-16 text-primary/20 mb-6" />
              <h3 className="text-2xl font-heading font-black text-primary-dark uppercase tracking-tight">No Results</h3>
              <p className="mt-2 text-secondary font-medium">Try a different filter or search term.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-bg-section/40 border-b border-primary/10 text-[10px] uppercase font-black tracking-widest text-secondary">
                  <tr>
                    <th className="p-6 w-32">Code</th>
                    <th className="p-6">Product Information</th>
                    <th className="p-6 w-48">Category</th>
                    <th className="p-6 w-32 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5 text-sm">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-bg-section/20 transition-colors group">
                      <td className="p-6 align-middle">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white border border-primary/10 shadow-sm text-primary-dark font-mono">
                          {p.code}
                        </span>
                      </td>
                      <td className="p-6 align-middle">
                        <div className="font-heading font-black text-lg text-primary-dark tracking-tight">{p.name}</div>
                        {(p.nepaliName || p.botanicalName) && (
                          <div className="text-secondary font-medium mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                            {p.nepaliName && <span><span className="opacity-50">NP:</span> <span className="font-bold text-primary-dark">{p.nepaliName}</span></span>}
                            {p.botanicalName && <span><span className="opacity-50">Bot:</span> <span className="italic">{p.botanicalName}</span></span>}
                          </div>
                        )}
                      </td>
                      <td className="p-6 align-middle">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase bg-primary/5 text-primary border border-primary/10">
                          {p.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setCurrentProduct(p);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-secondary hover:text-primary hover:bg-bg-section rounded-xl transition-colors border border-transparent hover:border-primary/10"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 text-secondary hover:text-accent hover:bg-accent/5 rounded-xl transition-colors border border-transparent hover:border-accent/10"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary-dark/40 flex items-center justify-center p-4 z-[100] backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-3xl p-8 lg:p-10 max-h-[90vh] overflow-y-auto border border-primary/10">
            <h2 className="text-3xl font-heading font-black text-primary-dark tracking-tight uppercase mb-8 border-b border-primary/10 pb-6">
              {currentProduct.id ? "Edit Item." : "New Item."}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Code <span className="text-accent">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VG-0001"
                    value={currentProduct.code || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, code: e.target.value })}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-mono placeholder:text-secondary/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Category <span className="text-accent">*</span></label>
                  <select
                    required
                    value={currentProduct.categoryId || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, categoryId: e.target.value })}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm appearance-none"
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Name (English) <span className="text-accent">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Green Beans"
                  value={currentProduct.name || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-secondary/30 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Nepali Name</label>
                  <input
                    type="text"
                    placeholder="e.g. घ्यू सिमी"
                    value={currentProduct.nepaliName || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, nepaliName: e.target.value })}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-secondary/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Botanical Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Phaseolus vulgaris"
                    value={currentProduct.botanicalName || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, botanicalName: e.target.value })}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark italic focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-secondary/30 text-sm"
                  />
                </div>
              </div>

              <ImageUpload 
                value={currentProduct.imageUrl}
                onChange={(url) => setCurrentProduct({ ...currentProduct, imageUrl: url })}
                label="Product Photograph"
              />

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of the product..."
                  value={currentProduct.description || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none placeholder:text-secondary/30 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">HS Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 0709.99.00"
                    value={currentProduct.hsCode || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, hsCode: e.target.value })}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-secondary/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Barcode</label>
                  <input
                    type="text"
                    placeholder="e.g. 837492018475"
                    value={currentProduct.barcode || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, barcode: e.target.value })}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-secondary/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Rate / Price</label>
                  <input
                    type="text"
                    placeholder="e.g. Contact for Pricing"
                    value={currentProduct.rate || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, rate: e.target.value })}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-secondary/30 text-sm"
                  />
                </div>
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
                  {saving ? "Saving..." : "Save Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
