import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import QueryClientProviderWrapper from "@/components/react-query-provider"
import { ToastProvider } from "@/components/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Partner Management Admin",
  description: "Admin panel for partner management",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <QueryClientProviderWrapper>
            <ToastProvider />
            {children}
          </QueryClientProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

