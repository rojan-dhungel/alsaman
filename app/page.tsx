import Hero from "@/components/Hero";
import About from "@/components/About";
import ProductCategories from "@/components/ProductCategories";
import Process from "@/components/Process";
import Locations from "@/components/Locations";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-main relative selection:bg-primary/20">
      <main className="flex-grow">
        <Hero />
        <About />
        <ProductCategories />
        <Process />
        <Locations />
      </main>
    </div>
  );
}
