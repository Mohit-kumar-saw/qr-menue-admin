import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { AdminProvider } from "@/context/AdminContext";
import "./globals.css";

export const metadata = {
  title: "TastyBytes | Admin Console",
  description: "Restaurant control panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-gray-50 flex flex-col text-zinc-900" suppressHydrationWarning>
        <AdminProvider>
          <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
              <Header />
              <div className="p-4 md:p-8 max-w-7xl mx-auto">
                {children}
              </div>
            </main>
            <MobileNav />
          </div>
        </AdminProvider>
      </body>
    </html>
  );
}
