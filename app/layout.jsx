
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./ReactQueryProvider";
// Load the Inter font with 'latin' subset
const inter = Inter({ subsets: ["latin"] });

// Metadata for the application
export const metadata = {
  title: "Meta API",
  description: "Meta API Platform",
};

// Root layout component for the application
export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className="">
      <ReactQueryProvider>
          <SessionProvider>
            <Toaster position="top-right" reverseOrder={true} />
            {children}
          </SessionProvider>
      </ReactQueryProvider>
        </body>
    </html>
  );
}
