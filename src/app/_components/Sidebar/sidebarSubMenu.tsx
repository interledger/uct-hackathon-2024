import { type SidebarItem } from "$/src/types/sidebarItem";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { SubMenu } from "react-pro-sidebar";
import { IoMdMore } from "react-icons/io";

export default function NavItem({
  children,
  label,
  icon,
  menuItems,
}: {
  children: React.ReactNode;
  label: string;
  icon: React.ReactNode;
  menuItems: SidebarItem[];
}) {
  return (
    <SubMenu
      label={label}
      className="group"
      prefix={<div className="mr-3">{icon}</div>}
      suffix={
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
      }
    >
      {children}
    </SubMenu>
  );
}
