import { getContentSections } from "@/lib/content";
import { MarkdownsClientNavbar } from "./MarkdownsClientNavbar";

export const MarkdownsNavbar = async () => {
  const sections = await getContentSections();

  return <MarkdownsClientNavbar sections={sections} />;
};

export default MarkdownsNavbar;
