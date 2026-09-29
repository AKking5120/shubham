"use client";

import { AutoUpButton } from "@/components/layout/AutoUpButton";

export function FloatingActions() {
  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 md:bottom-5">
      <AutoUpButton />
    </div>
  );
}
