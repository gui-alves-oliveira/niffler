import type { Metadata } from "next";
import "@/styles/globals.css";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Niffler",
  description: "Gerenciador de financas pessoais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
