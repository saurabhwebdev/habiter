
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About This Project</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Next.js Starter</CardTitle>
              <CardDescription>A modern web application framework</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This starter template provides a solid foundation for building 
                web applications with Next.js and shadcn UI components.
              </p>
              <p>
                The project structure is clean and organized, making it easy to extend
                and customize according to your needs.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Modern, responsive UI components</li>
                <li>Built with TypeScript for type safety</li>
                <li>Customizable with Tailwind CSS</li>
                <li>Accessible and SEO friendly</li>
                <li>Fast development workflow</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
