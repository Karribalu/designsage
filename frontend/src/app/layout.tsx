"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Navbar } from "@/app-components/navbar/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
if (typeof window !== "undefined") {
  // Client-side-only code
  window.addEventListener("error", function (e) {
    if (
      e.message ===
      "ResizeObserver loop completed with undelivered notifications."
    ) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <Navbar />
          <main className="flex-1 px-[5%]">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
