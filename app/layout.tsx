import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedOut } from "@clerk/nextjs";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})


export const metadata: Metadata = {
  title: "BookMyEvent",
  description: "Book any event you want to go from here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <ClerkProvider>
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  </ClerkProvider>
    
  );
}
