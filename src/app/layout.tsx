import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_BUSINESS_NAME} | ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s Premier Design-Build Remodeler`,
  description: `Award-winning architectural design-build remodeling. Kitchens, bathrooms, ADUs, and whole-home transformations built to withstand ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s climate. Free design consultation.`,
  keywords: `home remodeling ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}, kitchen remodel ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}, bathroom remodel, ADU builder, design-build contractor`,
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_BUSINESS_NAME} | ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}`,
    description: `Boutique architectural remodeling for ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s most discerning homeowners.`,
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
              "description": `Boutique architectural design-build remodeler in ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}`,
              "url": "https://freedomhomeremodeling.com",
              "telephone": "(805) 555-0192",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": `${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}`,
                "addressRegion": "CA",
                "addressCountry": "US",
              },
              "areaServed": [`${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}`],
              "priceRange": "$$$$",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
