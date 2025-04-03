import type { Metadata } from "next";
import "@/styles/globals.css";
import Providers from "@/components/providers";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
