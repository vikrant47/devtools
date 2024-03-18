import { HeroHeader, ContentSection } from "@/types/contents"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `Tools for all your need`,
  subheader: `All the tools on your fingertips`,
  image: `/hero-img.webp`,
}

export const featureCards: ContentSection = {
  header: `Brows featured tools`,
  subheader: `Discover the best tools for your needs`,
  content: [
    {
      text: `JSON Editor`,
      subtext: `Edit JSON data with ease`,
      icon: "nextjs",
    },
    {
      text: `Diff Checker`,
      subtext: `Compare two files and see the differences`,
      icon: "shadcnUi",
    },
    {
      text: `HTML Editor`,
      subtext: `Edit HTML code with ease`,
      icon: "vercel",
    },
  ],
}

export const features: ContentSection = {
  header: `Features`,
  subheader: `Why use Next Landing?`,
  image: `/features-img.webp`,
  content: [
    {
      text: `SEO Optimized`,
      subtext: `Improved website visibility on search engines`,
      icon: "fileSearch",
    },
    {
      text: `Highly Performant`,
      subtext: `Fast loading times and smooth performance`,
      icon: "barChart",
    },
    {
      text: `Easy Customizability`,
      subtext: `Change your content and layout with little effort`,
      icon: "settings",
    },
  ],
}
