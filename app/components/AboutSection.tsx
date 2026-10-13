import Image from "next/image";
import Link from "next/link";

const values = [
  {
    no: "01",
    title: "Verified Properties",
    text: "Every listing is verified with clear information and documents.",
  },
  {
    no: "02",
    title: "Local Expertise",
    text: "Deep understanding of Kashi, Purvanchal and the local market.",
  },
  {
    no: "03",
    title: "Transparent Process",
    text: "Clear information, documentation and communication at every step.",
  },
  {
    no: "04",
    title: "Personal Assistance",
    text: "Dedicated support from enquiry to site visit and beyond.",
  },
];

const card =
  "rounded-3xl border border-[#dbe5f5] bg-white shadow-[0_10px_40px_-15px_rgba(30,70,140,0.25)]";

export default function AboutSection({
  isStandalone = false,
}: {
  isStandalone?: boolean;
}) {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-gradient-to-b from-[#f7f9fd] to-[#eaf0fa] text-[#10224a]"
    >
      {/* Hero */}
      <div
        className={`mx-auto max-w-6xl px-6 pb-12 ${
          isStandalone ? "pt-36 md:pt-44" : "pt-24 md:pt-32"
        }`}
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#2c5fa8]">
          About RHC World
        </p>
        <h2 className="font-serif text-4xl leading-tight md:text-6xl">
          Where landmarks{" "}
          <em className="italic text-[#2c5fa8]">begin.</em>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[#5b6b8a]">
          Local expertise, verified properties, and personal guidance for a
          simpler property journey across Kashi and Purvanchal.
        </p>
      </div>

      {/* Story */}
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_20px_60px_-20px_rgba(30,70,140,0.35)]">
          <Image
            src="/hero_image.png"
            alt="Modern riverside residence at sunrise"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-serif text-3xl md:text-4xl">
            Our <em className="italic text-[#2c5fa8]">story</em>
          </h3>
          <p className="mt-4 text-[#5b6b8a]">
            RHC World helps people buy and invest in property in Varanasi and
            the wider Purvanchal region. We combine deep local knowledge with
            clear, honest communication, so every home or investment decision
            feels confident and simple.
          </p>
          <p className="mt-4 text-[#5b6b8a]">
            From the first enquiry to the site visit and beyond, our team stays
            with you at every step.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className={`${card} p-8 md:p-12`}>
          <h3 className="font-serif text-3xl md:text-4xl">
            Our <em className="italic text-[#2c5fa8]">mission</em>
          </h3>
          <p className="mt-4 max-w-3xl text-lg text-[#5b6b8a]">
            To make property in Kashi and Purvanchal easy to find, easy to
            trust, and easy to own, with verified listings and honest guidance.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h3 className="font-serif text-3xl md:text-4xl">
          Why choose <em className="italic text-[#2c5fa8]">RHC World</em>
        </h3>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.no} className={`${card} p-6`}>
              <span className="font-serif text-2xl text-[#2c5fa8]/50">
                {v.no}
              </span>
              <h4 className="mt-3 text-lg font-semibold">{v.title}</h4>
              <p className="mt-2 text-sm text-[#5b6b8a]">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 text-center">
        <h3 className="font-serif text-3xl md:text-5xl">
          Let&apos;s find the place you&apos;ll call{" "}
          <em className="italic text-[#2c5fa8]">home.</em>
        </h3>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-[#2f6fb7] to-[#2b4a8a] px-7 py-3 font-medium text-white transition hover:opacity-90"
          >
            Get in touch
          </Link>
          <Link
            href="/#featured"
            className="rounded-full border border-[#10224a] px-7 py-3 font-medium text-[#10224a] transition hover:bg-[#10224a] hover:text-white"
          >
            Browse properties
          </Link>
        </div>
      </div>
    </section>
  );
}

