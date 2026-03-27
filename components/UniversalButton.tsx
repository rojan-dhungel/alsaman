import Link from "next/link";

const ArtisticArrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

interface UniversalButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

export default function UniversalButton({ 
  href, 
  children, 
  className = "", 
  variant = "primary" 
}: UniversalButtonProps) {
  
  const variantStyles = {
    primary: "bg-primary-dark hover:bg-accent",
    secondary: "bg-secondary hover:bg-accent",
    accent: "bg-accent hover:bg-primary-dark",
  };

  return (
    <Link 
      href={href} 
      className={`group relative inline-flex items-center gap-6 px-10 py-4 ${variantStyles[variant]} text-white rounded-2xl font-black transition-all hover:pr-14 shadow-xl active:scale-95 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <ArtisticArrow className="w-6 h-6 absolute right-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
    </Link>
  );
}
