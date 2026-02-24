import {
  Compass,
  Map as MapIcon,
  Shell,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { id: "thingstodo", label: "Things to Do", icon: Compass },
  { id: "folly", label: "Explore Folly", icon: MapIcon },
  { id: "kids", label: "Kids & Teens", icon: Shell },
];
