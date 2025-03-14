import Link from "next/link";
import Folder from "../Folder";
import { DirectoryInfo } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  IconFolder,
  IconArrowUpRight,
  IconCalendar,
} from "@tabler/icons-react";

interface DirectoryListProps {
  directories: DirectoryInfo[];
  title?: string;
}

export const DirectoryList = ({ directories, title }: DirectoryListProps) => {
  return (
    <div className="space-y-6">
      <p className="py-2 text-xl">
        Explore all the posts and updates, from the latest stories to timeless
        insights in <span className="font-bold">{title}</span>
      </p>

      {directories.length > 0 && (
        <>
          {directories.map((dir) => (
            <Link href={`/markdowns/${dir.path}`} key={dir.path}>
              <Folder className="overflow-hidden flex border rounded-xl items-center justify-between py-4 px-6 w-fit gap-12 border-zinc-600 group hover:border-[#2aff7b] hover:scale-105 transition-all duration-500">
                <Folder.Header className="flex items-center w-max">
                  <IconFolder className="h-5 w-5 text-[#2aff7b] mr-3 flex-shrink-0" />
                  <Folder.Title>{dir.title}</Folder.Title>
                </Folder.Header>
                <Folder.Content>
                  {dir.description && (
                    <Folder.Description className="mb-4 line-clamp-2">
                      {dir.description}
                    </Folder.Description>
                  )}
                  <div className="flex justify-between items-center">
                    {dir.date && (
                      <div className="flex items-center text-sm text-indigo-50">
                        <IconCalendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(dir.date)}</span>
                      </div>
                    )}
                    <div className="flex gap-1 items-center">
                      <div className="overflow-hidden">
                        <div className="text-indigo-50 relative">
                          {"Explore".split("").map((letter, index) => (
                            <span
                              key={index}
                              className="inline-block opacity-0 translate-y-full transition-all group-hover:opacity-100 group-hover:translate-y-0 text-xs"
                              style={{
                                transitionDelay: `${index * 50}ms`,
                                transitionProperty: "transform, opacity",
                              }}
                            >
                              {letter}
                            </span>
                          ))}
                        </div>
                      </div>
                      <IconArrowUpRight className="h-6 w-6 text-indigo-50 duration-300 group-hover:scale-125 transition-all" />
                    </div>
                  </div>
                </Folder.Content>
              </Folder>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
