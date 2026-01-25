import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SectionConfigProvider } from "@/context/section-config-context";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-charcoal`}
      >
        <NextIntlClientProvider messages={messages}>
          <SectionConfigProvider>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: "var(--steel)",
                  border: "1px solid var(--gunmetal)",
                  color: "var(--smoke)",
                },
              }}
            />
          </SectionConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
