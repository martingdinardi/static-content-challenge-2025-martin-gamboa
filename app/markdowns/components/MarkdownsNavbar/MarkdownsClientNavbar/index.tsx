"use client";

import { Navbar } from "@/components/ui/Navbar";
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

  const isActive = (slug: string) => {
    const pathSegments = pathname.split("/");
    const markdownsIndex = pathSegments.findIndex(
      (segment) => segment === "markdowns"
    );

    if (markdownsIndex !== -1 && pathSegments.length > markdownsIndex + 1) {
      const activeSegment = pathSegments[markdownsIndex + 1];
      return activeSegment === slug;
    }

    return false;
  };

  return (
    <Navbar>
      <div className="flex justify-between items-center py-4">
        <Link href="/markdowns">
          <Image src="/logo.webp" alt="Acme Co." width={45} height={50} />
        </Link>
        <div className="space-x-4">
          {sections.map((section) => {
            const active = isActive(section.slug);
            return (
              <Link
                key={section.slug}
                href={`/markdowns/${section.slug}`}
                className={`inline-block transition duration-200 hover:scale-110 hover:text-[#2aff7b] text-lg ${
                  active ? "text-[#2aff7b] scale-110" : ""
                }`}
              >
                {section.title}
              </Link>
            );
          })}
        </div>
      </div>
    </Navbar>
  );
};
