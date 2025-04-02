import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Littie",
  description: "Do you have a graphic design wish? Welcome to Littie!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
