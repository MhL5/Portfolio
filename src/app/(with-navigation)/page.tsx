import { cacheLife } from "next/cache";
import ContactMe from "@/app/(with-navigation)/_components/ContactMe";
import HeroSection from "@/app/(with-navigation)/_components/HeroSection";
import MyProjects from "@/app/(with-navigation)/_components/my-projects/MyProjects";

export default async function Page() {
  "use cache";
  cacheLife("weeks");

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <MyProjects />
      <ContactMe className="mt-36 mb-30" />
    </div>
  );
}
