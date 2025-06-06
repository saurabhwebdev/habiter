import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PublicLayout } from '@/components/PublicLayout';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  Check, 
  Scale,
  BookOpen
} from 'lucide-react';

const Terms = () => {
  return (
    <PublicLayout title="Terms of Service">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Terms of Service</h2>
            </div>
            <Card className="border-black/10 overflow-hidden">
              <div className="bg-black/5 p-6 flex items-center justify-center">
                <Scale className="h-12 w-12 text-black" />
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70">
                  Welcome to Habiter. By using our application, you agree to these Terms of Service.
                  Please read them carefully before using the platform.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Agreement Terms</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="acceptance" className="border border-black/10 rounded-lg mb-3 overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-black/70" />
                    <span>Acceptance of Terms</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">By accessing or using Habiter, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="use" className="border border-black/10 rounded-lg mb-3 overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-black/70" />
                    <span>Use License</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">Permission is granted to temporarily use Habiter for personal, non-commercial purposes. This is the grant of a license, not a transfer of title.</p>
                  <p>Under this license, you may not:</p>
                  <ul className="space-y-3 mt-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><AlertTriangle className="h-4 w-4" /></div>
                      <span>Modify or copy the materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><AlertTriangle className="h-4 w-4" /></div>
                      <span>Use the materials for any commercial purpose</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><AlertTriangle className="h-4 w-4" /></div>
                      <span>Attempt to decompile or reverse engineer any software contained in Habiter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><AlertTriangle className="h-4 w-4" /></div>
                      <span>Remove any copyright or other proprietary notations from the materials</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="content" className="border border-black/10 rounded-lg mb-3 overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-black/70" />
                    <span>User Content</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">By submitting content to Habiter, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, and distribute your content in connection with the service.</p>
                  <p>You represent and warrant that:</p>
                  <ul className="space-y-3 mt-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Check className="h-4 w-4" /></div>
                      <span>You own the content or have the right to use it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Check className="h-4 w-4" /></div>
                      <span>The content does not violate the rights of any third party</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="termination" className="border border-black/10 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-black/70" />
                    <span>Termination</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">We may terminate your access to Habiter at any time, without notice, for any reason, including if you violate these Terms of Service.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-6 bg-black/10" />

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Liability & Warranties</h2>
            </div>
            
            <Card className="border-black/10 mb-6 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Disclaimer</CardTitle>
                  <CardDescription>Limitation of Liability</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  The materials on Habiter are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p className="text-black/70">
                  In no event shall Habiter or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Habiter, even if we have been notified orally or in writing of the possibility of such damage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-black/10 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <Scale className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Governing Law</CardTitle>
                  <CardDescription>Legal jurisdiction</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70">
                  These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which we operate, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-6 bg-black/10" />

          <section>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Changes to Terms</h2>
            </div>
            <Card className="border-black/10 overflow-hidden">
              <CardContent className="pt-6">
                <p className="text-black/70">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="text-black/70 mt-4">
                  By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.
                </p>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Contact Us</h2>
            </div>
            <Card className="border-black/10 overflow-hidden">
              <CardContent className="pt-6">
                <p className="text-black/70">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-black/70 mt-4 font-medium">
                  support@habiter.app
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Terms; 