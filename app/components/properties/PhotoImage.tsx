import Image from "next/image";
import type { Photo } from "../../data/properties";

/** A `fill` image that honours a placeholder photo's crop and zoom. */
export default function PhotoImage({
  photo,
  alt,
  sizes,
  preload,
  className = "",
}: {
  photo: Photo;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  const image = (
    <Image
      src={photo.src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${className}`}
      style={photo.position ? { objectPosition: photo.position } : undefined}
    />
  );
  if (!photo.zoom) return image;
  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `scale(${photo.zoom})`,
        transformOrigin: photo.position,
      }}
    >
      {image}
    </div>
  );
}
