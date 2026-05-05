"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, FolderTree, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  _count?: {
    products: number;
  };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string, count: number = 0) => {
    if (count > 0) {
      alert(`Cannot delete this category. It contains ${count} products. Please reassign or delete the products first.`);
      return;
    }
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const method = currentCategory.id ? "PUT" : "POST";
      const url = currentCategory.id ? `/api/categories/${currentCategory.id}` : "/api/categories";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentCategory),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchCategories();
      } else {
        const data = await res.json();
        alert(`Failed to save: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  // Helper to auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (!currentCategory.id) { // Only auto-fill if it's a new category
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setCurrentCategory({ ...currentCategory, name, slug });
    } else {
      setCurrentCategory({ ...currentCategory, name });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-heading font-black text-primary-dark tracking-tighter uppercase">
            Product <span className="text-primary italic font-serif text-3xl">Categories.</span>
          </h1>
          <p className="text-secondary font-medium text-sm mt-2 opacity-80">Organize your premium inventory into collections.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setCurrentCategory({});
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-2xl hover:bg-primary-dark shadow-lg font-black text-sm tracking-widest uppercase transition-all"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] shadow-soft border border-primary/5 overflow-hidden">
          {categories.length === 0 ? (
            <div className="text-center py-32">
              <FolderTree className="mx-auto h-16 w-16 text-primary/20 mb-6" />
              <h3 className="text-2xl font-heading font-black text-primary-dark uppercase tracking-tight">No Categories</h3>
              <p className="mt-2 text-secondary font-medium">Create categories to organize your products.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-bg-section/40 border-b border-primary/10 text-[10px] uppercase font-black tracking-widest text-secondary">
                  <tr>
                    <th className="p-6">Name & Description</th>
                    <th className="p-6 w-48">Slug</th>
                    <th className="p-6 w-32 text-center">Products</th>
                    <th className="p-6 w-32 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5 text-sm">
                  {categories.map((c) => (
                    <tr key={c.id} className="hover:bg-bg-section/20 transition-colors group">
                      <td className="p-6 align-middle">
                        <div className="flex items-center gap-4">
                           {c.imageUrl ? (
                             // eslint-disable-next-line @next/next/no-img-element
                             <img src={c.imageUrl} alt={c.name} className="w-12 h-12 object-cover rounded-xl shadow-sm border border-primary/5" />
                           ) : (
                             <div className="w-12 h-12 bg-bg-soft rounded-xl flex items-center justify-center text-primary/30 border border-primary/5">
                               <ImageIcon size={16} />
                             </div>
                           )}
                           <div>
                              <div className="font-heading font-black text-lg text-primary-dark tracking-tight">{c.name}</div>
                              {c.description && (
                                <div className="text-secondary font-medium mt-1 text-xs max-w-xs truncate">
                                  {c.description}
                                </div>
                              )}
                           </div>
                        </div>
                      </td>
                      <td className="p-6 align-middle">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest bg-white border border-primary/10 shadow-sm text-primary-dark font-mono lowercase">
                          {c.slug}
                        </span>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-full text-[10px] font-black bg-primary/10 text-primary border border-primary/20">
                          {c._count?.products || 0}
                        </span>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setCurrentCategory(c);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-secondary hover:text-primary hover:bg-bg-section rounded-xl transition-colors border border-transparent hover:border-primary/10"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => deleteCategory(c.id, c._count?.products)}
                            className={`p-2 rounded-xl transition-colors border border-transparent ${
                              (c._count?.products || 0) > 0 
                                ? "text-gray-300 cursor-not-allowed" 
                                : "text-secondary hover:text-accent hover:bg-accent/5 hover:border-accent/10"
                            }`}
                            title={(c._count?.products || 0) > 0 ? "Cannot delete category with products" : "Delete"}
                            disabled={(c._count?.products || 0) > 0}
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
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl p-8 lg:p-10 max-h-[90vh] overflow-y-auto border border-primary/10">
            <h2 className="text-3xl font-heading font-black text-primary-dark tracking-tight uppercase mb-8 border-b border-primary/10 pb-6">
              {currentCategory.id ? "Edit Category." : "New Category."}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Name <span className="text-accent">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fresh Fruits"
                    value={currentCategory.name || ""}
                    onChange={handleNameChange}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">URL Slug <span className="text-accent">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. fresh-fruits"
                    value={currentCategory.slug || ""}
                    onChange={(e) => setCurrentCategory({ ...currentCategory, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '') })}
                    className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-mono focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-secondary/30 text-sm lowercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the category..."
                  value={currentCategory.description || ""}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                  className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none placeholder:text-secondary/30 text-sm"
                />
              </div>

              <ImageUpload 
                value={currentCategory.imageUrl}
                onChange={(url) => setCurrentCategory({ ...currentCategory, imageUrl: url })}
                label="Category Card Image"
              />

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
                  {saving ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
