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
import { ToastProvider } from "@/providers/toast-provider";
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import prismadb from "@/lib/prismadb";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <SignedIn>
            <ToastProvider />
            <ModalProvider />
            {children}
          </SignedIn>
        </ClerkProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Rasayan - For Farmers",
  description:
    "Rasayan is an ecommerce platfrom for farmers provding agricultural products like fertilizers, herbisides, insectisides and pesticides etc, we also sells seeds of maize paddy and wheat",
};
