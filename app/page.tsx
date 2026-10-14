import CommonQuestions from "./components/CommonQuestions";
import FeaturedProperties from "./components/FeaturedProperties";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <main className="flex-1 bg-gradient-to-b from-sky-50 via-white to-sky-50">
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <CommonQuestions />
    </main>
  );
}
