import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export interface CinematicImageProps extends Omit<ImageProps, "className"> {
  className?: string;
  containerClassName?: string;
  objectPosition?: string;
}

export function CinematicImage({
  src,
  alt,
  fill = true,
  preload = false,
  sizes = "100vw",
  className,
  containerClassName,
  objectPosition = "center",
  ...props
}: CinematicImageProps) {
  return (
    <div className={cn("relative overflow-hidden w-full h-full", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        preload={preload}
        sizes={sizes}
        style={{ objectFit: "cover", objectPosition }}
        className={cn("transition-opacity duration-500", className)}
        {...props}
      />
    </div>
  );
}
