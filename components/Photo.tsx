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
  // scripts/optimize-images.mjs writes a .webp beside every .jpg — offer it
  // first and let the browser fall back to the jpg it already knows.
  const webp = src.replace(/\.jpe?g$/i, ".webp");
  return (
    <picture>
      {webp !== src && <source srcSet={webp} type="image/webp" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />
    </picture>
  );
}
