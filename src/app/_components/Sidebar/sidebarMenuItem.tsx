import { type SidebarItem } from "$/src/types/sidebarItem";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MenuItem } from "react-pro-sidebar";
import { IoMdMore } from "react-icons/io";
import { type IconType } from "react-icons/lib";

export default function NavItem({
  label,
  icon,
  menuItems,
}: {
  label: string;
  icon: React.ReactNode;
  menuItems: SidebarItem[];
}) {
  return (
    <MenuItem className="group">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          {icon}
          {label}
        </div>
        <Dropdown>
          <DropdownTrigger>
            <div>
              <IoMdMore className="hidden group-hover:block" />
            </div>
          </DropdownTrigger>
          <DropdownMenu className="rounded-none">
            {menuItems.map((menuItem) => (
              <DropdownItem key="new">
                <div className="flex flex-row items-center gap-2">
                  {menuItem.icon}
                  {menuItem.label}
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </MenuItem>
  );
}
