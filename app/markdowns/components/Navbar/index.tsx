import { Navbar } from "@/components/Navbar";
import { getContentSections } from "@/lib/content";
import Link from "next/link";

export const MarkdownsNavbar = async () => {
  const sections = await getContentSections();
  return (
    <Navbar>
      <div className="flex justify-between items-center">
        <Link href="/"> ACME</Link>
        <div className="space-x-4">
          {sections.map((section) => (
            <Link
              key={section.slug}
              href={`/markdowns/${section.slug}`}
              className="hover:underline"
            >
              {section.title}
            </Link>
          ))}
        </div>
      </div>
    </Navbar>
  );
};
