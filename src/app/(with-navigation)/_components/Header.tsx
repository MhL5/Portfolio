"use client";

import LinkButton from "@/components/blocks/buttons/LinkButton";
import { ThemeToggle } from "@/components/blocks/buttons/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Snippets",
    href: "/snippets",
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
  },
];

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  return (
    <>
      <header
        className={cn(
          "bg-background/50 fixed top-0 z-50 h-14 w-dvw backdrop-blur-md",
          isHome ? "animate-fade-in" : "",
        )}
      >
        <nav className="mx-auto flex h-full w-full items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <LinkButton
              buttonProps={{ variant: "link" }}
              href="/"
              className="font-nunito px-0 text-xl font-bold md:px-4"
            >
              MhL
            </LinkButton>

            {links.map(({ href, label }) => {
              return (
                <LinkButton
                  key={href}
                  buttonProps={{ variant: "link" }}
                  className="hidden font-medium lg:inline-block"
                  href={href}
                >
                  {label}
                </LinkButton>
              );
            })}
          </div>

          <div className="flex items-center gap-2 px-2">
            <ThemeToggle />

            <Sheet>
              <SheetTrigger className="lg:hidden">
                <span className="sr-only">Menu</span>
                <MenuIcon className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent className="max-w-xs sm:max-w-xs">
                <SheetHeader>
                  <SheetTitle>
                    <LinkButton
                      buttonProps={{ variant: "link" }}
                      href="/"
                      className="font-nunito px-0 text-xl font-bold md:px-4"
                    >
                      MhL
                    </LinkButton>
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    main page navigation menu for mobile devices
                  </SheetDescription>
                </SheetHeader>

                {links.map(({ href, label }) => {
                  return (
                    <LinkButton
                      key={href}
                      buttonProps={{ variant: "link" }}
                      className="justify-start font-medium"
                      href={href}
                    >
                      {label}
                    </LinkButton>
                  );
                })}
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {isHome ? null : <div className="h-14" aria-hidden="true" />}
    </>
  );
}
