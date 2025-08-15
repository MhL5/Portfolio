import ContactMe from "@/app/(with-navigation)/_components/ContactMe";
import HeroSection from "@/app/(with-navigation)/_components/HeroSection";
import MyProjects from "@/app/(with-navigation)/_components/my-projects/MyProjects";
import { ParticlesLazy } from "@/app/(with-navigation)/_components/Particles";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ParticlesLazy
        className="animate-fade-in absolute inset-0 -z-10 h-full overflow-hidden"
        quantity={100}
      />
      <MyProjects />
      <ContactMe className="mt-36 mb-30" />
    </div>
  );
}
