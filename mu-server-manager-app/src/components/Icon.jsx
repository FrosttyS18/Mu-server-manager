import { ICONS } from "../assets/Icons";

export function Icon({ name, className = "", alt }) {
  const src = ICONS[name];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt ?? name}
      className={className}
      draggable={false}
    />
  );
}
