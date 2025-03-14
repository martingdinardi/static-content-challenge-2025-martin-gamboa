import { getBreadcrumbPaths, getContentBySlug } from "@/lib/content";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { DirectoryList } from "@/app/markdowns/components/DirectoryList";
import { Breadcrumb } from "@/components/Breadcrumb";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const path = Array.isArray(params.slug) ? params.slug.join("/") : "";

  try {
    const { content, metadata, hasSubdirectories, subdirectories } =
      await getContentBySlug(path);
    const breadcrumbPaths = getBreadcrumbPaths(path);

    return (
      <div className="max-w-4xl mt-4">
        <Breadcrumb paths={breadcrumbPaths} />

        {content ? (
          <MarkdownRenderer content={content} metadata={metadata} />
        ) : (
          <h1 className="text-3xl font-bold mb-6">
            {metadata.title ||
              breadcrumbPaths[breadcrumbPaths.length - 1]?.name}
          </h1>
        )}
        {hasSubdirectories && subdirectories.length > 0 && (
          <div className={content ? "mt-8 pt-6 border-t" : ""}>
            <DirectoryList
              directories={subdirectories}
              title={metadata.title}
            />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(`Error loading content for path: ${path}`, error);
    notFound();
  }
}
