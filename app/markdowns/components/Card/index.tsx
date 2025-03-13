import { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = ({ children, ...props }: CardProps) => (
  <div
    className="bg-white border border-gray-200 rounded-lg shadow-sm"
    {...props}
  >
    {children}
  </div>
);

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardHeader = ({ children, ...props }: CardHeaderProps) => (
  <div className="border-b border-gray-200" {...props}>
    {children}
  </div>
);

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const CardTitle = ({ children, ...props }: CardTitleProps) => (
  <h3 className="text-base font-semibold" {...props}>
    {children}
  </h3>
);

export interface CardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

const CardDescription = ({ children, ...props }: CardDescriptionProps) => (
  <p className="text-sm text-gray-500 mt-1" {...props}>
    {children}
  </p>
);

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardContent = ({ children, ...props }: CardContentProps) => (
  <div className="" {...props}>
    {children}
  </div>
);

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardFooter = ({ children, ...props }: CardFooterProps) => (
  <div className="p-6 border-t border-gray-200" {...props}>
    {children}
  </div>
);

type CardComponent = typeof Card & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};

const ComposedCard = Card as CardComponent;

ComposedCard.Header = CardHeader;
ComposedCard.Title = CardTitle;
ComposedCard.Description = CardDescription;
ComposedCard.Content = CardContent;
ComposedCard.Footer = CardFooter;

export default ComposedCard;
