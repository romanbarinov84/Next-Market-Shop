import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import BreadCrumbs from '../components/breadCrumbs/BreadCrumbs';
import { RegFormProvider } from './contexts/RegFormContext';

const rubik = Rubik({
    variable: '--font-rubik',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Балувана Галя',
    description: 'Интернет-магазин Балувана Галя',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${rubik.variable} font-sans`}>
                <RegFormProvider>
                    <Header />
                    <BreadCrumbs />
                    {children}

                    <Footer />
                </RegFormProvider>
            </body>
        </html>
    );
}
