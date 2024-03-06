import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Kolkata FF | Admin",
  description: "Kolkata FF | Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
