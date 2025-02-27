import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar/AppSidebar";

export const metadata = {
  title: "Royal Nano Dashboard",
  description: "Royal Nano Erp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="main w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
