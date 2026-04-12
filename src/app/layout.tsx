import { Toaster } from "react-hot-toast";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Directory",
  description: "Manage your employees information easily",
  icons: {
    icon: "/folder.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="children">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
