import { FC, ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
  }

  export const Container: FC<ContainerProps> = ({ children, className = "" }) => {
    return (
      <div className={`container mx-auto px-4 ${className}`}>{children}</div>
    );
  };
  