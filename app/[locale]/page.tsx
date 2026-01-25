"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionRenderer } from "@/components/layout/section-renderer";
import { ConfigPanel } from "@/components/config/config-panel";

export default function HomePage() {
  const [configOpen, setConfigOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onConfigOpen={() => setConfigOpen(true)} />
      
      <SectionRenderer />
      
      <Footer />

      <ConfigPanel open={configOpen} onOpenChange={setConfigOpen} />
    </div>
  );
}
