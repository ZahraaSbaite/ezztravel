import "./globals.css";

export const metadata = {
  title: "Ezz Travel — Where every journey feels first class",
  description:
    "Tailored trips, VIP airport meet and assist, visas, and spiritual travel, planned end to end from Beirut and Abidjan.",
};

const THEME_INIT_SCRIPT = `
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : true;
    document.documentElement.classList.toggle('dark', dark);
    if (!stored) localStorage.setItem('theme', 'dark');
  } catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
