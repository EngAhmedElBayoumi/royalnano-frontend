import { permissionRoutes } from "@/lib/config/permissions";

export const sidebarLinks = [
  { path: "/", name: "home", icon: "home.svg", permissions: ["home"] },
  {
    path: "/branches",
    name: "branches",
    icon: "branches.svg",
    permissions: permissionRoutes["/dashboard/branches"],
  },
  {
    path: "/hr",
    name: "hr",
    icon: "hr.svg",
    permissions: permissionRoutes["/dashboard/hr"],
  },
  {
    path: "/inventory",
    name: "inventory",
    icon: "inventory.svg",
    permissions: permissionRoutes["/dashboard/inventory"],
  },
  {
    path: "/website",
    name: "website",
    icon: "website.svg",
    permissions: permissionRoutes["/dashboard/website"],
  },
  {
    path: "/sales",
    name: "sales",
    icon: "sales.svg",
    permissions: permissionRoutes["/dashboard/sales"],
  },
  {
    path: "/purchase",
    name: "purchase",
    icon: "sales.svg",
    permissions: permissionRoutes["/dashboard/purchase"],
  },
  {
    path: "/finance",
    name: "finance",
    icon: "sales.svg",
    permissions: permissionRoutes["/dashboard/sales"],
  },
  {
    path: "/analytics",
    name: "analytics",
    icon: "analytics.svg",
    permissions: permissionRoutes["/dashboard/analytics"],
  },
  {
    path: "/reports",
    name: "reports",
    icon: "reports.svg",
    permissions: permissionRoutes["/dashboard/reports"],
  },
];
