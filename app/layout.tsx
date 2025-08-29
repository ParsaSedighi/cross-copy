import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/themeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrossCopy",
  description: "Copy your texts from anywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>
            {children}
            <Toaster position="top-center" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
