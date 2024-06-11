"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Link,
  link as linkStyles,
  Button,
} from "@nextui-org/react";

import { FaPaintBrush } from "react-icons/fa";

import { siteConfig } from "$/src/config/site";
import NextLink from "next/link";
import { clsx } from "clsx";

import { ThemeSwitch } from "$/src/app/_components/Switch/theme-switch";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <ul className="ml-2 hidden justify-start gap-4 lg:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:font-medium data-[active=true]:text-primary",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <p className="font-bold text-foreground">Tippy</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <Button
          as={Link}
          className="rounded-full"
          href="/creators"
          color="primary"
          endContent={<FaPaintBrush />}
        >
          Creators
        </Button>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            userProfileUrl="/profile"
            userProfileMode="navigation"
          />
        </SignedIn>
        <SignedOut>
          <NavbarItem>
            <Button as={Link} href="/sign-in" size="md" color="primary">
              Sign In
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="/sign-up"
              size="md"
              color="primary"
              variant="bordered"
            >
              SIGN UP
            </Button>
          </NavbarItem>
        </SignedOut>
        <NavbarItem className="hidden gap-2 sm:flex">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <Button
          as={Link}
          className="rounded-full"
          href="/creators"
          color="primary"
          endContent={<FaPaintBrush />}
        >
          Creators
        </Button>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            userProfileUrl="/profile"
            userProfileMode="navigation"
          />
        </SignedIn>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link color="foreground" href="#" size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
