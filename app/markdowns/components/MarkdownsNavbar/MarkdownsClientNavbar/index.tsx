"use client";

import { useHamburger } from "@/app/markdowns/hooks/useHamburger";
import { useMobile } from "@/app/markdowns/hooks/useMobile";
import { isActive } from "@/app/markdowns/utils/isActive";
import { Navbar } from "@/components/ui/Navbar";
import { useTheme } from "@/context/ThemeContext";
import { IconMenu3, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MarkdownsClientNavbarProps {
  sections: { title: string; slug: string }[];
}

export const MarkdownsClientNavbar = ({
  sections,
}: MarkdownsClientNavbarProps) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const { isMenuOpen, handleOpen, handleClose } = useHamburger();

  const isMobile = useMobile();

  const showHamburger = isMobile || sections.length > 4;
  const navbarSections = sections.slice(0, 4);

  return (
    <Navbar className="markdowns-nav">
      <div className="flex justify-between items-center py-4">
        <Link href="/markdowns" className="p-4 rounded-full ">
          <Image
            src={theme === "light" ? `/logo-light.webp` : `/logo.webp`}
            alt="Acme Co."
            width={45}
            height={50}
            onClick={handleClose}
          />
        </Link>
        <div className="flex gap-8">
          {!isMobile && (
            <div className="space-x-4">
              {navbarSections.map((section) => {
                const active = isActive(pathname, section.slug);
                return (
                  <Link
                    key={section.slug}
                    href={`/markdowns/${section.slug}`}
                    className={`inline-block transition duration-200 hover:scale-110 hover:text-[#2aff7b] text-lg ${
                      active ? "active scale-105" : ""
                    }`}
                  >
                    {section.title}
                  </Link>
                );
              })}
            </div>
          )}
          {showHamburger && (
            <button
              onClick={handleOpen}
              className="text-gray-300 focus:outline-none cursor-pointer transition duration-200 hover:scale-105"
              aria-label="Menú"
            >
              {isMenuOpen ? (
                <IconX stroke={2} width={28} height={28} />
              ) : (
                <IconMenu3 stroke={2} width={28} height={28} />
              )}
            </button>
          )}
        </div>
      </div>
      {isMenuOpen && sections.length > 0 && (
        <div className="pb-4 border-t absolute bg-gray-800 w-full border-zinc-800">
          <div className="flex flex-col space-y-2 pt-2 gap-1 mt-4">
            {sections.map((section) => {
              const active = isActive(pathname, section.slug);
              return (
                <Link
                  key={section.slug}
                  href={`/markdowns/${section.slug}`}
                  className={`inline-block transition  hover:text-[#2aff7b] text-lg ${
                    active ? "text-[#2aff7b]" : ""
                  }`}
                  onClick={handleOpen}
                >
                  {section.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </Navbar>
  );
};
