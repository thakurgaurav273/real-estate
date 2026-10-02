import { Preloader } from "@/components/preloader/Preloader";
import { HeroDescent } from "@/sections/residence/HeroDescent";
import { TowerExplorer } from "@/sections/residence/TowerExplorer";
import { ArrivalScene } from "@/sections/residence/ArrivalScene";
import { RoomsArches } from "@/sections/residence/RoomsArches";
import { AmenitiesList } from "@/sections/residence/AmenitiesList";
import { WellnessScroll } from "@/sections/residence/WellnessScroll";
import { PoolStatement } from "@/sections/residence/PoolStatement";
import { ComingHome } from "@/sections/residence/ComingHome";
import { LifeConsidered } from "@/sections/residence/LifeConsidered";
import { LocationScene } from "@/sections/residence/LocationScene";
import { FinaleArch } from "@/sections/residence/FinaleArch";
import { ContactScene } from "@/sections/residence/ContactScene";

export default function Home() {
  return (
    // overflow-x-clip (not hidden) keeps position: sticky working inside scenes
    <main className="w-full min-h-screen bg-background overflow-x-clip">
      <Preloader />
      <HeroDescent />
      <TowerExplorer />
      <ArrivalScene />
      <RoomsArches />
      <AmenitiesList />
      <WellnessScroll />
      <PoolStatement />
      <ComingHome />
      <LifeConsidered />
      <LocationScene />
      <FinaleArch />
      <ContactScene />
    </main>
  );
}
