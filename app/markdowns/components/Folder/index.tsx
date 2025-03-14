import { HTMLAttributes, ReactNode } from "react";

export interface FolderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Folder = ({ children, ...props }: FolderProps) => (
  <div
    className="bg-white border border-gray-200 rounded-lg shadow-sm"
    {...props}
  >
    {children}
  </div>
);

export interface FolderHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FolderHeader = ({ children, ...props }: FolderHeaderProps) => (
  <div className="border-b border-gray-200" {...props}>
    {children}
  </div>
);

export interface FolderTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const FolderTitle = ({ children, ...props }: FolderTitleProps) => (
  <h3 className="text-base font-semibold" {...props}>
    {children}
  </h3>
);

export interface FolderDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

const FolderDescription = ({ children, ...props }: FolderDescriptionProps) => (
  <p className="text-sm text-gray-500 mt-1" {...props}>
    {children}
  </p>
);

export interface FolderContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FolderContent = ({ children, ...props }: FolderContentProps) => (
  <div className="" {...props}>
    {children}
  </div>
);

export interface FolderFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FolderFooter = ({ children, ...props }: FolderFooterProps) => (
  <div className="p-6 border-t border-gray-200" {...props}>
    {children}
  </div>
);

type FolderComponent = typeof Folder & {
  Header: typeof FolderHeader;
  Title: typeof FolderTitle;
  Description: typeof FolderDescription;
  Content: typeof FolderContent;
  Footer: typeof FolderFooter;
};

const ComposedFolder = Folder as FolderComponent;

ComposedFolder.Header = FolderHeader;
ComposedFolder.Title = FolderTitle;
ComposedFolder.Description = FolderDescription;
ComposedFolder.Content = FolderContent;
ComposedFolder.Footer = FolderFooter;

export default ComposedFolder;
