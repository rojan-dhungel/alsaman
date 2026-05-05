"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value: string | null | undefined;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (jpg, png, etc.)");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 ml-2">
        {label}
      </label>
      
      <div 
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative aspect-video rounded-3xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-3 ${
          value 
            ? "border-primary/20 bg-primary/5 hover:border-primary/40" 
            : "border-secondary/20 bg-bg-soft hover:border-primary/20 hover:bg-primary/5"
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={value} 
              alt="Uploaded" 
              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-primary-dark/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
               <Upload className="text-white w-8 h-8" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl text-accent shadow-lg hover:bg-accent hover:text-white transition-all"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <div className="p-4 bg-white rounded-2xl shadow-sm">
              {uploading ? (
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              ) : (
                <ImageIcon className="w-8 h-8 text-primary/40" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-primary-dark uppercase tracking-tight">
                {uploading ? "Converting to WebP..." : "Click to Upload"}
              </p>
              <p className="text-[10px] text-secondary font-medium mt-1">PNG, JPG, WEBP allowed</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
