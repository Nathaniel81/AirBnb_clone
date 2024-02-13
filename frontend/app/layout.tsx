// import type { Metadata } from "next";
import Navbar from "./components/navbar/Navbar";
// import Modals from "./components/modals/Modal";
import ToasterProvider from "./providers/ToasterProvider";
import RegisterModal from "./components/modals/RegisterModal";

import { Nunito } from 'next/font/google'

import "./globals.css";


export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}
        <ToasterProvider />
        <Navbar />
        <RegisterModal />
      </body>
    </html>
  );
}
