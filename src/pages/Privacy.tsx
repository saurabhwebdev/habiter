import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PublicLayout } from '@/components/PublicLayout';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  UserCheck, 
  Cookie,
  Clock,
  AlertTriangle,
  Globe,
  Mail
} from 'lucide-react';

const Privacy = () => {
  return (
    <PublicLayout title="Privacy Policy">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Privacy Policy</h2>
            </div>
            <Card className="border-black/10 overflow-hidden">
              <div className="bg-black/5 p-6 flex items-center justify-center">
                <Lock className="h-12 w-12 text-black" />
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70">
                  At Habiter, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you use our application.
                </p>
                <p className="text-black/70 mt-4">
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                  please do not access the application.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Information We Collect</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="personal" className="border border-black/10 rounded-lg mb-3 overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-black/70" />
                    <span>Personal Information</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">We may collect personal information that you voluntarily provide when using Habiter, including:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Mail className="h-4 w-4" /></div>
                      <span>Email address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><UserCheck className="h-4 w-4" /></div>
                      <span>Name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Database className="h-4 w-4" /></div>
                      <span>Habit tracking data</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="usage" className="border border-black/10 rounded-lg mb-3 overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-black/70" />
                    <span>Usage Data</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">We may also collect information on how the application is accessed and used. This usage data may include:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Clock className="h-4 w-4" /></div>
                      <span>Time and date of your visit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Globe className="h-4 w-4" /></div>
                      <span>Pages visited</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Database className="h-4 w-4" /></div>
                      <span>Features used</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cookies" className="border border-black/10 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <Cookie className="h-5 w-5 text-black/70" />
                    <span>Cookies and Tracking</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">We use cookies and similar tracking technologies to track activity on our application and hold certain information.</p>
                  <p>Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-6 bg-black/10" />

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Use of Your Information</h2>
            </div>
            
            <Card className="border-black/10 mb-6 overflow-hidden">
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  We may use the information we collect from you for various purposes, including:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><UserCheck className="h-4 w-4" /></div>
                    <span>To provide and maintain our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><AlertTriangle className="h-4 w-4" /></div>
                    <span>To notify you about changes to our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Shield className="h-4 w-4" /></div>
                    <span>To provide customer support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Database className="h-4 w-4" /></div>
                    <span>To gather analysis or valuable information to improve our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Eye className="h-4 w-4" /></div>
                    <span>To monitor the usage of our service</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Disclosure of Your Information</h2>
            </div>
            
            <Card className="border-black/10 mb-6 overflow-hidden">
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  We may share your information in the following situations:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Shield className="h-4 w-4" /></div>
                    <span><strong>With Service Providers:</strong> We may share your information with service providers to monitor and analyze the use of our service.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><AlertTriangle className="h-4 w-4" /></div>
                    <span><strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Globe className="h-4 w-4" /></div>
                    <span><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-6 bg-black/10" />

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Security of Your Information</h2>
            </div>
            <Card className="border-black/10 overflow-hidden">
              <CardContent className="pt-6">
                <p className="text-black/70">
                  The security of your information is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Your Data Rights</h2>
            </div>
            <Card className="border-black/10 overflow-hidden">
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Eye className="h-4 w-4" /></div>
                    <span>The right to access information we have about you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Database className="h-4 w-4" /></div>
                    <span>The right to request that we correct any information you believe is inaccurate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><AlertTriangle className="h-4 w-4" /></div>
                    <span>The right to request that we erase your personal information</span>
                  </li>
                </ul>
                <p className="text-black/70 mt-4">
                  To exercise any of these rights, please contact us at privacy@habiter.app
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Contact Us</h2>
            </div>
            <Card className="border-black/10 overflow-hidden">
              <CardContent className="pt-6">
                <p className="text-black/70">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-black/70 mt-4 font-medium">
                  privacy@habiter.app
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Privacy; 