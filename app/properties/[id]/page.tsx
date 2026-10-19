import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetail from "../../components/properties/PropertyDetail";
import { PROPERTIES, getProperty } from "../../data/properties";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/properties/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const property = getProperty(id);
  if (!property) return { title: "Property not found | RHC" };
  return {
    title: `${property.name} | RHC`,
    description: `${property.bedrooms} BHK ${property.type.toLowerCase()} in ${property.location} — ${property.price}, ${property.area.toLocaleString("en-IN")} sq.ft.`,
  };
}

export default async function PropertyPage(
  props: PageProps<"/properties/[id]">,
) {
  const { id } = await props.params;
  const property = getProperty(id);
  if (!property) notFound();
  return <PropertyDetail property={property} />;
}
