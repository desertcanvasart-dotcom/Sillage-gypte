import { getImage } from "@/lib/images";

/**
 * Renders a section image if one exists in the manifest, else nothing
 * (the surrounding gradient placeholder shows through). Placed inside a
 * positioned media container; the image is absolutely filled via `.media-photo`.
 */
export default function Photo({
  k,
  alt = "",
  className = "media-photo",
}: {
  k: string;
  alt?: string;
  className?: string;
}) {
  const src = getImage(k);
  if (!src) return null;
  // Local /public asset; plain <img> keeps the gradient fallback trivial.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />;
}
