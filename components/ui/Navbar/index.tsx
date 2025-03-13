import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

export const Navbar = ({ children, className = "" }: NavbarProps) => {
  return <nav className={`py-4 ${className}`}>{children}</nav>;
};
