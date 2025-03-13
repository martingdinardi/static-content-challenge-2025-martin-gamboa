import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";

interface BreadcrumbProps {
  paths: Array<{ name: string; path: string }>;
}

export const Breadcrumb = ({ paths }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 bg-gray-50 p-3 rounded-lg">
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        {paths.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <IconChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            )}

            {index === paths.length - 1 ? (
              <span className="font-medium text-gray-900">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-gray-900">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
