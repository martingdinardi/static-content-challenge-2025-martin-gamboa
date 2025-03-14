import { getBreadcrumbPaths, getContentBySlug } from "@/lib/content";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { DirectoryList } from "@/app/markdowns/components/DirectoryList";
import { Breadcrumb } from "@/components/Breadcrumb";
import { notFound } from "next/navigation";
import { RecommendedArticles } from "../components/RecommendedArticles";

type tParams = Promise<{ slug: string[] }>;

export default async function Page({ params }: { params: tParams }) {
  const { slug }: { slug: string[] } = await params;
  const path = Array.isArray(slug) ? slug.join("/") : "";

  try {
    const { content, metadata, hasSubdirectories, subdirectories } =
      await getContentBySlug(path);

    const breadcrumbPaths = getBreadcrumbPaths(path);

    return (
      <div className="mt-4">
        <Breadcrumb paths={breadcrumbPaths} />
        <div className="flex justify-between py-8">
          <div className="max-w-4xl">
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
          <div className="hidden xl:flex xl:flex-col xl:w-1/4">
            <h3 className="text-xl font-semibold mb-5">Recommended Articles</h3>
            <RecommendedArticles />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error loading content for path: ${path}`, error);
    notFound();
  }
}
