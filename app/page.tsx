import FeaturedProperties from "./components/FeaturedProperties";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";

const SECTIONS = [
  { id: "about", title: "About" },
  { id: "projects", title: "Projects" },
  { id: "services", title: "Services" },
];

export default function Home() {
  return (
    <main className="flex-1 bg-gradient-to-b from-sky-50 via-white to-sky-50">
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex min-h-screen scroll-mt-0 items-center justify-center px-6"
        >
          <h2 className="text-center text-4xl font-semibold tracking-tight text-[#0d3b73] sm:text-6xl">
            {section.title}
          </h2>
        </section>
      ))}
    </main>
  );
}
