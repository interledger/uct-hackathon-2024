import { type IconType } from "react-icons/lib";

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  callback(arg: any): void;
  class?: string;
}
