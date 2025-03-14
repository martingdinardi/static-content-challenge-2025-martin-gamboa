// __tests__/content.test.tsx

import { getContentBySlug } from "@/lib/content";
import Page from "@/app/markdowns/[...slug]/page";
import { notFound } from "next/navigation";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
  usePathname: jest.fn(() => "/markdowns/test-path"),
}));

jest.mock("@/lib/content", () => ({
  getContentBySlug: jest.fn(),
  getContentSections: jest.fn(),
  getBreadcrumbPaths: jest.fn(() => [
    { name: "Markdowns", path: "/markdowns" },
    { name: "Test", path: "/markdowns/test" },
  ]),
}));

jest.mock("fs/promises");

describe("Static Content Challenge Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("valid URLs should return content from markdown files", async () => {
    (getContentBySlug as jest.Mock).mockResolvedValue({
      content: "<h1>Test Content</h1><p>This is test content</p>",
      metadata: { title: "Test Page" },
      hasSubdirectories: false,
      subdirectories: [],
    });

    const result = await Page({ params: { slug: ["test-path"] } });

    expect(getContentBySlug).toHaveBeenCalledWith("test-path");

    expect(result).toBeDefined();
  });

  test("valid URLs should return a 200 HTTP status code", async () => {
    (getContentBySlug as jest.Mock).mockResolvedValue({
      content: "<h1>Some Content</h1>",
      metadata: {},
      hasSubdirectories: false,
      subdirectories: [],
    });

    await Page({ params: { slug: ["some-existing-path"] } });

    expect(notFound).not.toHaveBeenCalled();
  });

  test("invalid URLs should return 404", async () => {
    (getContentBySlug as jest.Mock).mockRejectedValue(new Error("Not found"));

    await Page({ params: { slug: ["non-existent-path"] } });

    expect(notFound).toHaveBeenCalled();
  });
});
