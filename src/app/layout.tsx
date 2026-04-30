// Root layout — passthrough only.
// next-intl requires the [locale]/layout.tsx to own <html> and <body>.
// This file must exist for Next.js App Router but must NOT render <html>/<body>
// to avoid nested html tags that break the LayoutRouterContext during static generation.
import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
