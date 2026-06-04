import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwiftLane Logistics — Fast. Reliable. Delivered.",
  description: "Professional courier and logistics services worldwide. Track your shipment, book deliveries, and get real-time updates with SwiftLane Logistics.",
  keywords: "logistics, courier, shipping, tracking, delivery, international freight",
  openGraph: {
    title: "SwiftLane Logistics — Fast. Reliable. Delivered.",
    description: "Professional courier and logistics services worldwide.",
    url: "https://swiftlanelogs.com",
    siteName: "SwiftLane Logistics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { font-family: var(--font-geist-sans), system-ui, sans-serif; }
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-track { background: #0a0f0d; }
          ::-webkit-scrollbar-thumb { background: #16a34a; border-radius: 3px; }
          .dark section[style*="background: white"],
          .dark section[style*="background:white"],
          .dark section[style*="background: #f8fafc"],
          .dark section[style*="background:#f8fafc"] { background: #0a0f0d !important; }
          .dark div[style*="background: white"],
          .dark div[style*="background:white"] { background: #111a14 !important; border-color: #1a2e1e !important; }
          .dark h1, .dark h2, .dark h3, .dark h4 { color: #f1f5f9 !important; }
          .dark div[style*="background: #f0fdf4"],
          .dark div[style*="background:#f0fdf4"] { background: #0d1f13 !important; border-color: #1a3d22 !important; }
          .dark div[style*="background: #f8fafc"],
          .dark div[style*="background:#f8fafc"] { background: #111a14 !important; border-color: #1a2e1e !important; }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        <Script
          id="tawkto"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6a216839b8952c1c325ba3b5/1jq97u8tq';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}