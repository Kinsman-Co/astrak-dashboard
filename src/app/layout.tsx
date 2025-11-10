import "./globals.css";

export const metadata = {
  title: "Kinsman & Co Dashboard",
  description: "Client performance dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: 0, backgroundColor: "#f9fafb" }}>
        <header
          style={{
            backgroundColor: "#111827",
            color: "white",
            padding: "1rem 2rem",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          Kinsman & Co Dashboard
        </header>
        <nav
          style={{
            backgroundColor: "#1f2937",
            padding: "0.5rem 2rem",
            color: "white",
            display: "flex",
            gap: "1rem",
          }}
        >
          <a href="/" style={{ color: "white", textDecoration: "none" }}>Overview</a>
          <a href="/seo" style={{ color: "white", textDecoration: "none" }}>SEO</a>
          <a href="/ads" style={{ color: "white", textDecoration: "none" }}>Ads</a>
          <a href="/creative" style={{ color: "white", textDecoration: "none" }}>Creative</a>
        </nav>
        <main style={{ padding: "2rem" }}>{children}</main>
      </body>
    </html>
  );
}
