"use client";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";

interface BreadcrumbProps {
  paths: Array<{ name: string; path: string }>;
}

export const Breadcrumb = ({ paths }: BreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="breadcrumb mb-6 p-3 rounded-lg transition-colors duration-300"
    >
      <ol className={`flex flex-wrap items-center text-sm `}>
        {paths.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <IconChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            )}

            {index === paths.length - 1 ? (
              <span className="font-bold">{item.name}</span>
            ) : (
              <Link href={`${item.path}`} className="hover:font-bold">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
