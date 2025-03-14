import React from "react";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="px-8 text-sm text-gray-500 bg-[#0e0e0e] rounded-2xl flex justify-between items-center py-4">
      <div className="max-w-4xl">
        <p>© {new Date().getFullYear()} Acme Co.</p>
      </div>

      <Link
        href="https://github.com/martingdinardi"
        className="flex items-center justify-center space-x-1"
        target="_blank"
      >
        <IconBrandGithub size={24} />
        <p>github.com/martingdinardi</p>
      </Link>
    </footer>
  );
}

export default Footer;
