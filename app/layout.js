/*
 * Licensed under the MIT License. See LICENSE file in the project root for full license text.
 */

import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const mozillaText = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mozilla-text",
});

const mozillaHeadline = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "500"],
  variable: "--font-mozilla-headline",
});

const sensation = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-sensation",
});

export const metadata = {
  title: "Portfolio - Mohamed Zakaria",
  description: "",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className={`${mozillaText.variable} ${mozillaHeadline.variable} ${sensation.variable} antialiased leading-8 overflow-x-hidden bg-white dark:bg-darkTheme dark:text-white`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme') || 'dark';
                  var enable = stored === 'dark' ? 'dark' : 'light';
                  document.documentElement.classList.add(enable);
                } catch (e) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
