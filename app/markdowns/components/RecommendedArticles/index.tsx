import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { getRecommendedArticles } from "@/lib/content";

interface RecommendedArticlesProps {
  limit?: number;
}

export const RecommendedArticles = async ({
  limit = 3,
}: RecommendedArticlesProps) => {
  const articles = await getRecommendedArticles(null, limit);

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-5">Recommended Articles</h3>

      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.path}
            className="p-4 border border-gray-200 rounded-lg transition duration-200 hover:scale-102"
          >
            <Link href={article.path} className="flex items-center text-sm">
              <div className="flex items-start">
                <div className="flex-1 items-end">
                  <h3 className="text-lg font-medium">{article.title}</h3>

                  {article.description && (
                    <p className="text-gray-400 mt-1 line-clamp-2">
                      {article.description}
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-2">
                    {article.date && (
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{formatDate(article.date)}</span>
                      </div>
                    )}

                    <span className="read-more flex items-center text-sm font-bold">
                      Read More
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
