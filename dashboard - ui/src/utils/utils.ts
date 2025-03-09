import { SidebarProps } from "../types/common/common";

export const UserDashMenubar: SidebarProps[] = [
  {
    id: "New",
    icon: "Dashboard",
    label: "Dashboards",
    children: [
      {
        id: "1",
        icon: "S",
        label: "User Dash",
        path: "/user-dashboard",
      },
      {
        id: "2",
        icon: "S",
        label: "User Setting",
        path: "/user-settings",
      },
    ],
  },
];

export const AdminDashMenubar: SidebarProps[] = [
  {
    id: "New",
    icon: "Dashboard",
    label: "Dashboards",
    children: [
      {
        id: "1",
        icon: "S",
        label: "Admin Dash",
        path: "/admin-dashboard",
      },
      {
        id: "2",
        icon: "S",
        label: "Admin Setting",
        path: "/admin-settings",
      },
    ],
  },
];
