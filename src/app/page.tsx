import HeroSection from "../components/landingPages/HeroSection";
import FeaturesSection from "../components/landingPages/FeaturesSection";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory">
      <section className="snap-start min-h-screen flex flex-col justify-center items-center bg-charcoal px-4 md:px-8">
        <HeroSection />
      </section>

      <section className="snap-start min-h-screen flex flex-col justify-center items-center bg-charcoal px-4 md:px-8">
        <FeaturesSection />
      </section>
    
    </main>
  );
}
