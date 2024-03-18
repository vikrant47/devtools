import { SiteConfig, ContactConfig } from "@/types"

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

const baseUrl = "https://nextlanding.rdev.pro"

export const siteConfig: SiteConfig = {
  name: "DevTools",
  author: "redpangilinan",
  description:
    "A collection of tools for developers. JSON Editor, Diff Checker, HTML Editor, and more!",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "shadcn/ui",
    "Landing Page",
    "Template",
    "Starter",
  ],
  url: {
    base: baseUrl,
    author: "#",
  },
  ogImage: `${baseUrl}/og.jpg`,
}

export const contactConfig: ContactConfig = {
  email: "user@example.com",
}
