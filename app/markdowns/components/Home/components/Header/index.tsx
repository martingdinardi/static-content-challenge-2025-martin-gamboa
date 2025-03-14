"use client";
import { IconCircleFilled } from "@tabler/icons-react";

function Header() {
  return (
    <div className="markdowns-header">
      <div className="lg:w-1/2 py-8">
        <span className="text-xs flex items-center gap-1 mb-2">
          <IconCircleFilled
            width={14}
            height={14}
            className="text-[#2aff7bbd]"
          />
          Hi!
        </span>
        <h1 className={"!m-0"}>
          {`Welcome to Acme Co's Marketing Space! Discover, create, and manage
markdown-based content with ease!`}
        </h1>
      </div>
    </div>
  );
}

export default Header;
