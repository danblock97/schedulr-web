"use client";

import dynamic from "next/dynamic";

const FairyLights = dynamic(() => import("@/components/ui/FairyLights"), {
  ssr: false,
});

const ChristmasTree = dynamic(() => import("@/components/ui/ChristmasTree"), {
  ssr: false,
});

export default function DecorativeComponents() {
  return (
    <>
      <FairyLights />
      <ChristmasTree />
    </>
  );
}

