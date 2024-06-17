// file to genrate robots.txt static file to allow userAgent to be any and allow from root
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      //   disallow: '/private/',
    },
    sitemap: "https://priyankrai.in/sitemap.xml",
  };
}
