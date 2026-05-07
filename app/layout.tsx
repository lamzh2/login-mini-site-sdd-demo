import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login Mini Site",
  description: "A tiny authenticated site built with the SDD workflow."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
