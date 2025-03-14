import React, { ReactNode } from "react";

interface InfoCardProps {
  children?: ReactNode;
}

export function InfoCard({ children }: InfoCardProps) {
  return (
    <div className="p-8 bg-zinc-900 w-fit rounded-3xl">
      <div className="flex flex-col justify-between gap-48">{children}</div>
    </div>
  );
}
