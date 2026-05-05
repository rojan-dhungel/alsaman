import { prisma } from "@/lib/prisma";
import { Package, FolderTree, Image as ImageIcon, MessageSquare } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, galleryCount, contactCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.gallery.count(),
    prisma.contactMessage.count(),
  ]);

  const stats = [
    {
      label: "Total Products",
      value: productCount,
      icon: Package,
      href: "/admin/products",
      linkText: "Manage Catalog",
    },
    {
      label: "Categories",
      value: categoryCount,
      icon: FolderTree,
      href: "/admin/categories",
      linkText: "View Categories",
    },
    {
      label: "Gallery Images",
      value: galleryCount,
      icon: ImageIcon,
      href: "/admin/gallery",
      linkText: "Edit Gallery",
    },
    {
      label: "Messages",
      value: contactCount,
      icon: MessageSquare,
      href: "/admin/contact",
      linkText: "Read Messages",
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-black text-primary-dark tracking-tighter uppercase">
          System <span className="text-primary italic font-serif text-3xl">Dashboard.</span>
        </h1>
        <p className="text-secondary font-medium text-sm mt-2 opacity-80">
          Welcome back! Here is an overview of your platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon, href, linkText }) => (
          <div
            key={label}
            className="bg-white rounded-3xl p-6 shadow-soft border border-primary/5 flex flex-col group relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 text-primary/5 group-hover:scale-110 transition-transform duration-500">
              <Icon size={100} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">
                {label}
              </h3>
              <p className="text-5xl font-heading font-black text-primary-dark tracking-tighter">
                {value}
              </p>
              <Link
                href={href}
                className="inline-flex items-center gap-1 mt-4 text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
              >
                {linkText} &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-[2rem] border border-primary/5 shadow-soft p-8">
        <h2 className="text-lg font-heading font-black text-primary-dark uppercase tracking-tight mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/categories"
            className="flex items-center gap-4 p-4 rounded-2xl border border-primary/10 hover:bg-primary/5 hover:border-primary/20 transition-all group"
          >
            <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
              <FolderTree size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-black text-sm text-primary-dark">New Category</p>
              <p className="text-xs text-secondary font-medium">Organize your catalog</p>
            </div>
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-4 p-4 rounded-2xl border border-primary/10 hover:bg-primary/5 hover:border-primary/20 transition-all group"
          >
            <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
              <Package size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-black text-sm text-primary-dark">Add Product</p>
              <p className="text-xs text-secondary font-medium">Expand your inventory</p>
            </div>
          </Link>
          <Link
            href="/admin/gallery"
            className="flex items-center gap-4 p-4 rounded-2xl border border-primary/10 hover:bg-primary/5 hover:border-primary/20 transition-all group"
          >
            <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
              <ImageIcon size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-black text-sm text-primary-dark">Upload Photo</p>
              <p className="text-xs text-secondary font-medium">Update the gallery</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
