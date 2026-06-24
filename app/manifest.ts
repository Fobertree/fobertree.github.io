import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alexander Liu",
    short_name: "Alexander Liu",
    description: "Personal site",
    start_url: "/",
    display: "standalone",
    background_color: "#060c2a",
    theme_color: "#030c36",
    icons: [
      {
        src: "/Images/flowfield1.png",
        sizes: "3072x1676",
        type: "image/png",
      },
    ],
  };
}