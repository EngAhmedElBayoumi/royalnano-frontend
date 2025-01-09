"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { sidebarLinks } from "@/data/dashboard/sidebarData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const currentPath = usePathname();
  console.log(`/dashboard/${sidebarLinks[0].path}`);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="items-center">
        <Image src="/assets/icons/logo.svg" alt="logo" width={50} height={80} />
      </SidebarHeader>
      <SidebarContent className="mt-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {sidebarLinks.map((link) => {
                const isActive = `/dashboard${link.path}` === currentPath + "/";

                return (
                  <SidebarMenuItem
                    key={link.path}
                    className="flex justify-center"
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="py-6 !rounded-10"
                    >
                      <Link href={`/dashboard${link.path}`}>
                        <Image
                          src={`/assets/icons/sidebar/${link.icon}`}
                          alt={link.name}
                          width={30}
                          height={30}
                        />
                        <span className="text-primary">{link.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuButton
              asChild
              isActive={"/dashboard/settings" === currentPath}
              className="py-6 !rounded-10"
            >
              <Link href="/dashboard/settings">
                <Image
                  src={`/assets/icons/sidebar/setting.svg`}
                  alt="settings"
                  width={30}
                  height={30}
                />
                <span className="text-primary">settings</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton className="py-6 !rounded-10 !bg-transparent">
              <Image
                src={`/assets/icons/sidebar/logout.svg`}
                alt="settings"
                width={30}
                height={30}
              />
              <span className="text-primary">logout</span>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
