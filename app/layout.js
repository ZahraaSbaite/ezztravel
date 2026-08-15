import "./globals.css";

const description =
  "Tailored trips, VIP airport meet and assist, visas, and spiritual travel, planned end to end from Beirut and Abidjan.";

export const metadata = {
  metadataBase: new URL("https://www.ezztravel.agency"),
  title: "Ezz Travel — Where every journey feels first class",
  description,
  openGraph: {
    title: "Ezz Travel — Where every journey feels first class",
    description,
    url: "https://www.ezztravel.agency",
    siteName: "Ezz Travel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezz Travel — Where every journey feels first class",
    description,
  },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
