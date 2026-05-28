import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WhyItMatters } from "@/components/WhyItMatters";
import { ValueProps } from "@/components/ValueProps";
import { WhatWereBuilding } from "@/components/WhatWereBuilding";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhyItMatters />
        <ValueProps />
        <WhatWereBuilding />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
