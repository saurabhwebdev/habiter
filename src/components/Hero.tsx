
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to Your Next.js App
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              A clean, modern starter template with shadcn UI components.
              Build beautiful interfaces with ease.
            </p>
          </div>
          <div className="space-x-4">
            <Button>Get Started</Button>
            <Button variant="outline">Documentation</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
