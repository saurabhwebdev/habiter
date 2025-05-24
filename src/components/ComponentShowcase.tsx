
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ComponentShowcase = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Component Showcase
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            Explore some of the beautiful shadcn UI components available in this template.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Component */}
          <Card>
            <CardHeader>
              <CardTitle>Card Component</CardTitle>
              <CardDescription>A versatile card component for displaying content.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cards can contain various elements like text, images, and actions.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>

          {/* Form Components */}
          <Card>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>Input fields, labels and buttons.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit</Button>
            </CardFooter>
          </Card>

          {/* Tabs Component */}
          <Card>
            <CardHeader>
              <CardTitle>Tabs Component</CardTitle>
              <CardDescription>Organize content into selectable tabs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tab1">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="p-4">
                  <p>Content for the first tab goes here.</p>
                </TabsContent>
                <TabsContent value="tab2" className="p-4">
                  <p>Content for the second tab goes here.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComponentShowcase;
