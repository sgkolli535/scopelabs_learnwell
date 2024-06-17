"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import {
  SearchIcon,
} from "@/components/icons";
import { CreateVideoButton, CreateVideoModal } from './createVideoModal';
import { useState } from "react";

// Navbar component
// This component renders the application's navigation bar
// It includes the site logo, navigation links, search input, and create video button
// The navigation links are based on the site configuration
// The search input allows the user to search for videos
export const Navbar: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Refresh the page if the search query is cleared
    if (value.trim() === "") {
      router.push(`/videos`);
    }
  };

  // handle search form submit
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/videos?query=${searchQuery}`);
    }
  };

  const searchInput = (
    <form onSubmit={handleSearchSubmit} className="flex gap-2">
    <Input
      aria-label="Search"
      value={searchQuery}
      onChange={handleSearchChange}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      type="search"
    />
    <button
            type="submit"
            className="p-2 bg-custom-green text-white rounded-lg"
          >
            <SearchIcon className="text-base pointer-events-none flex-shrink-0" />
          </button>
    </form>
  );

  return (
    <><NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <img src="/LOGO_ICON.png" alt="Learnwell" className="h-6 w-auto" />
            <p className="font-bold text-inherit">Learnwell</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
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

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <CreateVideoButton onOpen={() => setModalOpen(true)} />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={index === 2
                  ? "primary"
                  : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"}
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
    <CreateVideoModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
