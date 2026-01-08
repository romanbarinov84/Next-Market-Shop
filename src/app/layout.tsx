import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";


const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Балувана Галя",
  description: "Интернет-магазин Балувана Галя",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} font-sans`}
      >
        <Header/>
        {children}
        
        <Footer/>
      </body>
    </html>
  );
}
