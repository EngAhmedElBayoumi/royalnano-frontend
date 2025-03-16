import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar/AppSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar/DashboardNavbar";

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
    <SidebarProvider>
      <AppSidebar />
      <main className="main w-full">
        <DashboardNavbar />
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
