import fs from "fs/promises";
import path from "path";
import { ContentResult, DirectoryInfo, Metadata } from "../types";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");
const TEMPLATE_PATH = path.join(process.cwd(), "public", "template.html");

/**
 * Verify if a directory contains an index.md file
 */
async function hasIndexFile(dirPath: string): Promise<boolean> {
  try {
    await fs.access(path.join(dirPath, "index.md"));
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Format a directory name for display
 */
function formatDirectoryName(name: string): string {
  if (!name) return "Content";

  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Get metadata from a Markdown file
 */
async function getMetadataFromFile(filePath: string): Promise<Metadata> {
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data } = matter(fileContent);
    return data as Metadata;
  } catch (error) {
    return {};
  }
}

/**
 * Verifies if an index.md file is a valid article (not just an index)
 */
async function isValidArticle(filePath: string): Promise<boolean> {
  try {
    await fs.readFile(filePath, "utf8");
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Check if a path is a directory
 */
async function isDirectory(path: string): Promise<boolean> {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch (error) {
    return false;
  }
}

/**
 * Convert Markdown to HTML
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdown);

  return result.toString();
}

/**
 * Get the main content sections for the navbar
 */
export async function getContentSections(): Promise<
  Array<{ slug: string; title: string }>
> {
  try {
    const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });

    const sectionsPromises = entries.map(async (entry) => {
      if (!entry.isDirectory()) {
        return null;
      }

      const dirPath = path.join(CONTENT_DIR, entry.name);

      const [hasIndex, dirEntries] = await Promise.all([
        hasIndexFile(dirPath),
        fs.readdir(dirPath, { withFileTypes: true }),
      ]);

      const hasSubdirs = dirEntries.some((e) => e.isDirectory());

      if (!hasIndex && !hasSubdirs) {
        return null;
      }

      let title = formatDirectoryName(entry.name);

      if (hasIndex) {
        const metadata = await getMetadataFromFile(
          path.join(dirPath, "index.md")
        );
      }

      return {
        slug: entry.name,
        title,
      };
    });

    const results = await Promise.all(sectionsPromises);
    return results.filter(
      (item): item is { slug: string; title: string } => !!item
    );
  } catch (error) {
    console.error("Error getting content sections:", error);
    return [];
  }
}

/**
 * Get content for a specific slug
 */
export async function getContentBySlug(slug: string): Promise<ContentResult> {
  const dirPath = slug ? path.join(CONTENT_DIR, slug) : CONTENT_DIR;

  const directoryExists = await isDirectory(dirPath);
  if (!directoryExists) {
    throw new Error(`Directory not found: ${dirPath}`);
  }

  const indexPath = path.join(dirPath, "index.md");
  const hasIndex = await hasIndexFile(dirPath);

  // Check if the index.md is a real article (not just an index)
  const isArticle = hasIndex ? await isValidArticle(indexPath) : false;

  // Get subdirectories
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const subdirectories: DirectoryInfo[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subDirPath = path.join(dirPath, entry.name);
      const hasSubIndex = await hasIndexFile(subDirPath);
      const hasSubdirs = (
        await fs.readdir(subDirPath, { withFileTypes: true })
      ).some((e) => e.isDirectory());

      if (hasSubIndex || hasSubdirs) {
        let metadata: Metadata = {};
        if (hasSubIndex) {
          metadata = await getMetadataFromFile(
            path.join(subDirPath, "index.md")
          );
        }

        const relativePath = slug ? `/${slug}/${entry.name}` : `/${entry.name}`;

        subdirectories.push({
          name: entry.name,
          path: relativePath,
          title: formatDirectoryName(entry.name),
          description: metadata.description,
          date: metadata.date,
        });
      }
    }
  }

  // If there is no index.md file or it's not a real article, return only the list of subdirectories
  if (!hasIndex || !isArticle) {
    return {
      content: "",
      metadata: {
        title: formatDirectoryName(slug.split("/").pop() || "Contenido"),
      },
      hasSubdirectories: subdirectories.length > 0,
      subdirectories,
    };
  }

  // Read the Markdown file
  const fileContent = await fs.readFile(indexPath, "utf8");

  // Extract frontmatter and content
  const { data: metadata, content: markdownContent } = matter(fileContent);

  //Convert Markdown to HTML
  const htmlContent = await markdownToHtml(markdownContent);

  // Read the HTML template
  const template = await fs.readFile(TEMPLATE_PATH, "utf8");

  // Replace the placeholder {{content}} with the HTML content
  const finalContent = template.replace("{{content}}", htmlContent);

  return {
    content: finalContent,
    metadata: metadata as Metadata,
    hasSubdirectories: subdirectories.length > 0,
    subdirectories,
  };
}

/**
 * Get the full path for a slug
 */
export function getPathParts(slug: string): string[] {
  if (!slug) return [];
  return slug.split("/").filter(Boolean);
}

/**
 * Generate the paths for the breadcrumb
 */
export function getBreadcrumbPaths(
  slug: string
): Array<{ name: string; path: string }> {
  const parts = getPathParts(slug);
  const paths: Array<{ name: string; path: string }> = [
    { name: "Markdowns", path: "/markdowns" },
  ];

  let currentPath = "/markdowns";
  for (const part of parts) {
    currentPath += `/${part}`;
    paths.push({
      name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
      path: currentPath,
    });
  }

  return paths;
}

/**
 * Get Recommended Articles to display before the markdown files.
 */
export async function getRecommendedArticles(
  basePath: string | null,
  limit = 3
): Promise<DirectoryInfo[]> {
  const articles: DirectoryInfo[] = [];
  const baseDir = basePath ? path.join(CONTENT_DIR, basePath) : CONTENT_DIR;

  async function scanForArticles(dir: string, relativePath = "") {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      const indexPath = path.join(dir, "index.md");
      try {
        await fs.access(indexPath);
        if (await isValidArticle(indexPath)) {
          const metadata = await getMetadataFromFile(indexPath);

          let articleSlug: string;
          let segments: string[] = [];
          if (relativePath) {
            segments = relativePath.split("/");
            articleSlug = segments[segments.length - 1];
          } else {
            articleSlug = path.basename(dir);
          }

          let parentSlug = "";
          if (segments.length > 1) {
            parentSlug = segments[segments.length - 2];
          }

          const articleName =
            metadata.title || formatDirectoryName(articleSlug);
          let displayTitle = articleName;
          if (parentSlug) {
            displayTitle = `${formatDirectoryName(
              parentSlug
            )} - ${articleName}`;
          }

          const linkPath = basePath
            ? `/content/${basePath}/${relativePath}`
            : `/markdowns/${relativePath || articleSlug}`;

          articles.push({
            name: path.basename(dir),
            path: linkPath.replace(/\/$/, ""),
            title: displayTitle,
            description: metadata.description,
            date: metadata.date,
          });
        }
      } catch {}

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const newRelativePath = relativePath
            ? `${relativePath}/${entry.name}`
            : entry.name;
          await scanForArticles(path.join(dir, entry.name), newRelativePath);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory: ${dir}`, error);
    }
  }

  await scanForArticles(baseDir, "");

  return articles
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
}
