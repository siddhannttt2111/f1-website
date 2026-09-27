import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CarShowcase from "@/components/CarShowcase";
import Rivals from "@/components/Rivals";
import Timeline from "@/components/Timeline";
import Stats from "@/components/Stats";
import Outro from "@/components/Outro";
import Credits from "@/components/Credits";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <CarShowcase />
      <Rivals />
      <Timeline />
      <Stats />
      <Outro />
      <Credits />
    </main>
  );
}
