import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GBZQR - QR Menu Platform",
  description: "QR Menu Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  );
}

