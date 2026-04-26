import { Hero } from "@/components/Hero";
import { HyperScroll } from "@/components/HyperScroll";

export default function Home() {
  return (
    <main id="homepage" className="w-full bg-[#030303]">
      <section className="relative z-50">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-[110px]">
          <Hero />
        </div>
      </section>
      
      <section className="relative z-10 -mt-[150px]">
        <HyperScroll />
      </section>
    </main>
  );
}
