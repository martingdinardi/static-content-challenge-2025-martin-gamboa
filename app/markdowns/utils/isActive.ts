"use client";

export function isActive(pathname: string, slug: string): boolean {
  const pathSegments = pathname.split("/");
  const markdownsIndex = pathSegments.findIndex(
    (segment) => segment === "markdowns"
  );

  if (markdownsIndex !== -1 && pathSegments.length > markdownsIndex + 1) {
    const activeSegment = pathSegments[markdownsIndex + 1];
    return activeSegment === slug;
  }

  return false;
}
