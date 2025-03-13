import fs from "fs/promises";
import path from "path";
import { Metadata } from "../types";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "markdowns");

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
        if (metadata.title) {
          title = metadata.title;
        }
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
