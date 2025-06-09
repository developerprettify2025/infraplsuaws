import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.sass";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`} cz-shortcut-listen="true">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
