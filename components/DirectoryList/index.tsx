import Link from "next/link";
import Card from "../Card";
import { DirectoryInfo } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  IconFolder,
  IconChevronRight,
  IconCalendar,
} from "@tabler/icons-react";

interface DirectoryListProps {
  directories: DirectoryInfo[];
  parentTitle?: string;
  showTitle?: boolean;
}

export const DirectoryList = ({
  directories,
  showTitle = true,
}: DirectoryListProps) => {
  return (
    <div className="space-y-6">
      {showTitle}

      {directories.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directories.map((dir) => (
              <Card
                key={dir.path}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <Card.Header>
                  <IconFolder className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                  <Card.Title>{dir.title}</Card.Title>
                </Card.Header>
                <Card.Content>
                  {dir.description && (
                    <Card.Description className="mb-4 line-clamp-2">
                      {dir.description}
                    </Card.Description>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    {dir.date && (
                      <div className="flex items-center text-sm text-gray-500">
                        <IconCalendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(dir.date)}</span>
                      </div>
                    )}
                    <Link
                      href={`/markdowns/${dir.path}`}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      Explore
                      <IconChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
