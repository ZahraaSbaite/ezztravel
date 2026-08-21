import "./globals.css";

const description =
  "Ezz Travel is a travel agency based in Beirut, Lebanon and Abidjan, Ivory Coast, offering tailored trips, VIP airport meet and assist, visas, and spiritual travel planned end to end.";

export const metadata = {
  metadataBase: new URL("https://www.ezztravel.agency"),
  title: "Ezz Travel — Travel Agency in Beirut & Abidjan",
  description,
  keywords: [
    "Ezz Travel",
    "EzzTravel",
    "ezztravel",
    "travel agency",
    "travel agency Beirut",
    "travel agency Lebanon",
    "travel agency Abidjan",
    "travel agency Ivory Coast",
    "VIP airport meet and assist",
    "visa services",
    "spiritual travel",
  ],
  alternates: {
    canonical: "https://www.ezztravel.agency",
  },
  openGraph: {
    title: "Ezz Travel — Travel Agency in Beirut & Abidjan",
    description,
    url: "https://www.ezztravel.agency",
    siteName: "Ezz Travel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezz Travel — Travel Agency in Beirut & Abidjan",
    description,
  },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Ezz Travel",
  alternateName: ["EzzTravel", "ezztravel", "Ezz Travel Agency"],
  description,
  url: "https://www.ezztravel.agency",
  image: "https://www.ezztravel.agency/logo.png",
  sameAs: ["https://www.instagram.com/ezztravell"],
  areaServed: ["Beirut, Lebanon", "Abidjan, Ivory Coast"],
};

const THEME_INIT_SCRIPT = `
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : false;
    document.documentElement.classList.toggle('dark', dark);
    if (!stored) localStorage.setItem('theme', 'light');
  } catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
