"use client";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { clearProfile } from "@/redux/slices/profileSlice";
import { sidebarLinks } from "@/data/dashboard/sidebarData";
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

export function AppSidebar() {
  const currentPath = usePathname();
  const locale = useLocale();
  const t = useTranslations("Sidebar");
  const dispatch = useDispatch();
  const router = useRouter();

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );

  const handleLogout = () => {
    try {
      dispatch(logout());
      dispatch(clearProfile());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <Sidebar collapsible="icon" side={locale === "ar" ? "right" : "left"}>
      <SidebarHeader className="items-center">
        <Link href="/" passHref target="blank">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={50}
            height={80}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {sidebarLinks.map((link) => {
                const isActive =
                  link.path === "/"
                    ? currentPath === "/dashboard"
                    : currentPath.includes(link.path);

                const hasPermission =
                  permissions[link.permission]?.view || link.name === "home";

                return (
                  hasPermission && (
                    <SidebarMenuItem
                      key={link.path}
                      className="flex justify-center"
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="py-6 !rounded-10"
                      >
                        <Link href={`/dashboard${link.path}`} passHref>
                          <Image
                            src={`/assets/icons/sidebar/${link.icon}`}
                            alt={t(link.name)}
                            width={30}
                            height={30}
                          />
                          <span className="text-primary capitalize">
                            {t(link.name)}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
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
              isActive={currentPath.includes("settings")}
              className="py-6 !rounded-10"
            >
              <Link href="/dashboard/settings" passHref>
                <Image
                  src={`/assets/icons/sidebar/setting.svg`}
                  alt={t("settings")}
                  width={30}
                  height={30}
                />
                <span className="text-primary">{t("settings")}</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton
              className="py-6 !rounded-10 !bg-transparent"
              onClick={handleLogout}
            >
              <Image
                src={`/assets/icons/sidebar/logout.svg`}
                alt={t("logout")}
                width={30}
                height={30}
              />
              <span className="text-primary">{t("logout")}</span>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
