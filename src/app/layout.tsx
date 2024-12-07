import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google"
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";


const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: "JDCommerce - JaummDev",
  description: "JDCommerce feito usando Next JS, Tailwind CSS & Fake Store API",
};

export const viewport: Viewport = {
  themeColor: "#008E5F",
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={poppins.className}>
      <body
        className={`${poppins.variable} ${poppins.variable} overflow-x-hidden text-night bg-white antialiased flex-grow h-full`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
