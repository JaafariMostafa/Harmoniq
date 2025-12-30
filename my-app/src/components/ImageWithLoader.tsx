"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type Props = ImageProps & {
  loaderColor?: string; // optional customize loader color
};

export default function ImageWithLoader({ src, alt, loaderColor = "bg-gray-300", ...rest }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {!loading && (
        <div className={`absolute inset-0 flex items-center justify-center border-2 ${loaderColor} animate-pulse`} />
      )}
      <Image
        {...rest}
        src={src}
        alt={alt}
        fill
        onLoadingComplete={() => setLoading(false)}
        className={`object-cover ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
      />
    </div>
  );
}
