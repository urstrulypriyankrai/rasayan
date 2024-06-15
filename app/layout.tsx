import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import ModalProvider from "@/providers/modal-providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <SignedOut>
              <SignInButton />
              <RedirectToSignIn />
            </SignedOut>
          </header>
          <SignedIn>
            <ModalProvider />
            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}

export const metadata: Metadata = {
  title: "Rasayan - For Farmers",
  description:
    "Rasayan is an ecommerce platfrom for farmers provding agricultural products like fertilizers, herbisides, insectisides and pesticides etc, we also sells seeds of maize paddy and wheat",
};
