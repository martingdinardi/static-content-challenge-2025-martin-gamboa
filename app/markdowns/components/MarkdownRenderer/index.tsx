import { Metadata } from "@/lib/types";

interface ContentRendererProps {
  content: string;
  metadata: Metadata;
}

function MarkdownRenderer({ content, metadata }: ContentRendererProps) {
  return (
    <div className="markdown-body">
      {metadata.title && (
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{metadata.title}</h1>
          {metadata.description && (
            <p className="text-gray-600 mt-2">{metadata.description}</p>
          )}
          {metadata.date && (
            <p className="text-sm text-gray-500 mt-1">
              {new Date(metadata.date).toLocaleDateString()}
            </p>
          )}
        </header>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default MarkdownRenderer;
