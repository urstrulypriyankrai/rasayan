import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rasayan - For Farmers",
  description:
    "Rasayan is an ecommerce platfrom for farmers provding agricultural products like fertilizers, herbisides, insectisides and pesticides etc, we also sells seeds of maize paddy and wheat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
