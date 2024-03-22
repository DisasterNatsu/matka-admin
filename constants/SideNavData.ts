import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineLibraryBooks,
  MdAccountBalance,
  MdOutlineBugReport,
  MdSearch,
  MdOutlineSettings,
} from "react-icons/md";

export const SideNavData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    title: "Smart Matka",
    link: "/smart-matka",
    icon: MdOutlineLibraryBooks,
  },
  {
    title: "Tips",
    link: "/tips",
    icon: MdAccountBalance,
    gap: true,
  },
  {
    title: "Generated Tips",
    link: "/generated-tips",
    icon: MdOutlineBugReport,
  },
  {
    title: "Search",
    link: "/search",
    icon: MdSearch,
  },
  {
    title: "Settings",
    link: "/settings",
    icon: MdOutlineSettings,
    gap: true,
  },
];
