import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlotDetail from "../../components/properties/PlotDetail";
import PropertyDetail from "../../components/properties/PropertyDetail";
import {
  PLOTS,
  PROPERTIES,
  getPlot,
  getProperty,
  plotRate,
} from "../../data/properties";

export function generateStaticParams() {
  return [...PROPERTIES, ...PLOTS].map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/properties/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const property = getProperty(id);
  if (property) {
    return {
      title: `${property.name} | RHC`,
      description: `${property.bedrooms} BHK ${property.type.toLowerCase()} in ${property.location} — ${property.price}, ${property.area.toLocaleString("en-IN")} sq.ft.`,
    };
  }
  const plot = getPlot(id);
  if (plot) {
    return {
      title: `${plot.name} | RHC`,
      description: `${plot.type} in ${plot.address} — ${plotRate(plot)}, ${plot.area.toLocaleString("en-IN")} sq ft.`,
    };
  }
  return { title: "Property not found | RHC" };
}

export default async function PropertyPage(
  props: PageProps<"/properties/[id]">,
) {
  const { id } = await props.params;
  const property = getProperty(id);
  if (property) return <PropertyDetail property={property} />;
  const plot = getPlot(id);
  if (plot) return <PlotDetail plot={plot} />;
  notFound();
}
