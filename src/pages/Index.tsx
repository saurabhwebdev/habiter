
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import ComponentShowcase from "@/components/ComponentShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <ComponentShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
