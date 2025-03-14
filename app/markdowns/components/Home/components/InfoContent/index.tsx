"use client";
import React from "react";
import { InfoCard } from "../ui/InfoCard";
import { infoConent } from "./info";

export function InfoContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 py-8">
      {infoConent.map((card, index) => (
        <InfoCard key={index}>
          <div>
            <h2 className="!m-0">{(index + 1).toString().padStart(2, "0")}.</h2>
            <h2 className="!m-0 text-[#2aff7bbd]">{card.title}</h2>
          </div>
          <p className="text-gray-300 text-xl">{card.description}</p>
        </InfoCard>
      ))}
    </div>
  );
}
