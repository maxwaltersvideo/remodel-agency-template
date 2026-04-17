import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_BUSINESS_NAME} | Camarillo's Premier Design-Build Remodeler`,
  description: "Award-winning architectural design-build remodeling in Camarillo, CA. Kitchens, bathrooms, ADUs, and whole-home transformations built to withstand Camarillo's coastal salt-air climate. Free design consultation.",
  keywords: "home remodeling Camarillo, kitchen remodel Camarillo CA, bathroom remodel Ventura County, ADU builder Camarillo, design-build contractor Camarillo, coastal home remodeling",
  openGraph: {
    title: "${process.env.NEXT_PUBLIC_BUSINESS_NAME} | Camarillo, CA",
    description: "Boutique architectural remodeling for Camarillo's most discerning homeowners.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": `${process.env.NEXT_PUBLIC_BUSINESS_NAME}`,
              "description": "Boutique architectural design-build remodeler in Camarillo, CA",
              "url": "https://freedomhomeremodeling.com",
              "telephone": "(805) 555-0192",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Camarillo",
                "addressRegion": "CA",
                "addressCountry": "US",
              },
              "areaServed": ["Camarillo", "Oxnard", "Thousand Oaks", "Ventura", "Moorpark"],
              "priceRange": "$$$$",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
