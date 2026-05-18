import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { contact } from "./data";

const GTM_ID = "GTM-5XTCL7HF";
const CLARITY_ID = "wt0h59j0ho";
const SITE_URL = "https://chamsconstruction.com";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const interBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "CHAMS Construction — Singapore Commercial, Interior & Renovation Works",
    template: "%s · CHAMS Construction Singapore",
  },
  description:
    "Singapore-based construction partner. Commercial blasting, painting, M&E, plumbing, interior fit-out, plastering, renovation and skilled manpower supply. BCA-registered, ISO 45001 certified.",
  keywords: [
    "Construction Singapore",
    "Commercial construction Singapore",
    "Interior renovation Singapore",
    "Blasting and painting Singapore",
    "Industrial painting Singapore",
    "Waterproofing Singapore",
    "Epoxy flooring Singapore",
    "Electrical services Singapore",
    "Plumbing services Singapore",
    "Manpower supply Singapore",
    "JTC contractor Singapore",
    "HDB contractor Singapore",
    "LTA contractor Singapore",
    "PUB contractor Singapore",
    "BCA registered contractor",
    "ISO 45001 Singapore",
  ],
  authors: [{ name: "CHAMS Construction Pte. Ltd." }],
  creator: "CHAMS Construction Pte. Ltd.",
  publisher: "CHAMS Construction Pte. Ltd.",
  alternates: { canonical: "/" },
  category: "construction",
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: SITE_URL,
    siteName: "CHAMS Construction",
    title:
      "CHAMS Construction — Singapore Commercial, Interior & Renovation Works",
    description:
      "Singapore-based construction partner. Commercial blasting, painting, M&E, plumbing, interior fit-out, plastering, renovation and skilled manpower supply. BCA-registered, ISO 45001 certified.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CHAMS Construction Pte. Ltd. — Singapore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "CHAMS Construction — Singapore Commercial, Interior & Renovation Works",
    description:
      "Singapore construction partner. Commercial, M&E, plumbing, interior fit-out and skilled manpower supply.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  applicationName: "CHAMS Construction",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a1f3c" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1f3c" },
  ],
};

// ─────────────────────────────────────────────────────────────
// Organization + LocalBusiness JSON-LD — emitted on every page
// ─────────────────────────────────────────────────────────────
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE_URL}/#organization`,
  name: "CHAMS Construction Pte. Ltd.",
  alternateName: "CHAMS Construction",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    "Singapore-based commercial and interior construction company. Blasting, painting, M&E, plumbing, plastering, fit-out and skilled manpower supply.",
  telephone: contact.phone,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "238 Westwood Avenue",
    addressLocality: "Singapore",
    postalCode: "648363",
    addressCountry: "SG",
  },
  areaServed: { "@type": "Country", name: "Singapore" },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "BCA Registered Contractor",
      recognizedBy: { "@type": "Organization", name: "Building and Construction Authority Singapore" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "ISO 45001:2018 — Occupational Health & Safety",
      recognizedBy: { "@type": "Organization", name: "TVE-CERT" },
    },
  ],
  knowsAbout: [
    "Commercial construction",
    "Industrial blasting and painting",
    "Waterproofing",
    "Epoxy flooring",
    "Electrical works",
    "Plumbing and sanitary works",
    "Interior fit-out",
    "Cement plastering",
    "Manpower supply",
  ],
  sameAs: [],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "CHAMS Construction",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-SG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-SG" className={`${inter.variable} ${interBody.variable} ${mono.variable}`}>
      <head>
        {/* Organization + WebSite JSON-LD */}
        <Script
          id="ld-organization"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        {/* Google Tag Manager */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
