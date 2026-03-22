// src/config.ts

// Site configuration with TypeScript types
export type AspectRatio = "16:9" | "4:3" | "3:2" | "og" | "square" | "golden" | "custom";

export interface SiteConfig {
  site: string;
  title: string;
  description: string;
  author: string;
  language: string;
  faviconThemeAdaptive: boolean;
  defaultOgImageAlt: string;
  theme: "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things" | "custom";
  customThemeFile?: string;
  availableThemes: "default" | Array<string>;
  fonts: {
    source: "local" | "cdn";
    families: { body: string; heading: string; mono: string; };
    display: "swap" | "fallback" | "optional";
  };
  layout: { contentWidth: string; };
  tableOfContents: { enabled: boolean; depth: number; };
  footer: { enabled: boolean; content: string; showSocialIconsInFooter: boolean; };
  hideScrollBar: boolean;
  scrollToTop: boolean;
  featureButton: "mode" | "graph" | "theme" | "none";
  deployment: { platform: "netlify" | "vercel" | "github-pages" | "cloudflare-workers"; };
  commandPalette: {
    enabled: boolean;
    shortcut: string;
    placeholder: string;
    search: { posts: boolean; pages: boolean; projects: boolean; docs: boolean; };
    sections: { quickActions: boolean; pages: boolean; social: boolean; };
    quickActions: { enabled: boolean; toggleMode: boolean; graphView: boolean; changeTheme: boolean; };
  };
  profilePicture: {
    enabled: boolean;
    image: string;
    alt: string;
    size: "sm" | "md" | "lg";
    url?: string;
    placement: "footer" | "header";
    style: "circle" | "square" | "none";
  };
  navigation: {
    showNavigation: boolean;
    style: "minimal" | "traditional";
    showMobileMenu: boolean;
    pages: Array<{ title: string; url: string }>;
    social: Array<{ title: string; url: string; icon: string }>;
  };
  homeOptions: {
    featuredPost: { enabled: boolean; type: "latest" | "featured"; slug?: string; };
    recentPosts: { enabled: boolean; count: number; };
    projects: { enabled: boolean; count: number; };
    docs: { enabled: boolean; count: number; };
    blurb: { placement: "above" | "below" | "none"; };
  };
  postOptions: {
    postsPerPage: number;
    readingTime: boolean;
    wordCount: boolean;
    tags: boolean;
    linkedMentions: { enabled: boolean; linkedMentionsCompact: boolean; };
    graphView: { enabled: boolean; showInSidebar: boolean; maxNodes: number; showOrphanedPosts: boolean; };
    postNavigation: boolean;
    showPostCardCoverImages: "all" | "featured" | "home" | "posts" | "featured-and-posts" | "none";
    postCardAspectRatio: AspectRatio;
    customPostCardAspectRatio?: string;
    comments: {
      enabled: boolean; provider: string; repo: string; repoId: string; category: string; categoryId: string; mapping: string; strict: string; reactions: string; metadata: string; inputPosition: string; theme: string; lang: string; loading: string;
    };
  };
  optionalContentTypes: { projects: boolean; docs: boolean; };
}

// ═══════════════════════════════════════════════════════════════════════════════
// KATHY KO CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

export const siteConfig: SiteConfig = {
  // Site Information
  site: "https://kathyko.github.io",
  title: "Kathy Ko",
  description: "Personal Portfolio and Blog of Kathy Ko.",
  author: "Kathy Ko",
  language: "en",
  faviconThemeAdaptive: true,
  defaultOgImageAlt: "Kathy Ko Portfolio logo.",

  // Global Settings
  theme: "oxygen", 
  customThemeFile: "custom",
  availableThemes: "default",
  fonts: {
    source: "local",
    families: {
      body: "Inter",
      heading: "Inter",
      mono: "JetBrains Mono",
    },
    display: "swap",
  },
  layout: {
    contentWidth: "45rem",
  },
  tableOfContents: {
    enabled: true,
    depth: 4,
  },
  footer: {
    enabled: true,
    content: `© 2025 Kathy Ko. Built with Astro.`,
    showSocialIconsInFooter: true,
  },
  hideScrollBar: false,
  scrollToTop: true,
  featureButton: "mode", 
  deployment: {
    platform: "netlify",
  },

  // Command Palette
  commandPalette: {
    enabled: true,
    shortcut: "ctrl+K",
    placeholder: "Search posts",
    search: {
      posts: true,
      pages: false,
      projects: true,
      docs: false, // Docs disabled
    },
    sections: {
      quickActions: true,
      pages: true,
      social: true,
    },
    quickActions: {
      enabled: true,
      toggleMode: true,
      graphView: true,
      changeTheme: true,
    },
  },

  // Profile Picture (Optional, currently disabled as per your previous config)
  profilePicture: {
    enabled: false, 
    image: "/profile.jpg",
    alt: "Kathy Ko",
    size: "md",
    placement: "footer",
    style: "circle",
  },

  // Navigation
  navigation: {
    showNavigation: true,
    style: "traditional",
    showMobileMenu: true,
    pages: [
      { title: "Posts", url: "/posts/" },
      { title: "Projects", url: "/projects/" },
      { title: "About", url: "/about/" },
      // Docs removed
      // GitHub link moved to social icons or kept here if you prefer
      { title: "GitHub", url: "https://github.com/KathyKo" },
    ],
    social: [
      {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/kohungchi",
        icon: "linkedin", // Changed from X-twitter to LinkedIn
      },
      {
        title: "GitHub",
        url: "https://github.com/KathyKo",
        icon: "github",
      },
    ],
  },

  // Optional Content Types
  optionalContentTypes: {
    projects: true,
    docs: false, // Docs fully disabled
  },

  // Home Options
  homeOptions: {
    featuredPost: {
      enabled: true,
      type: "latest",
      slug: "getting-started",
    },
    recentPosts: {
      enabled: true,
      count: 7,
    },
    projects: {
      enabled: true,
      count: 2,
    },
    docs: {
      enabled: false, // Disabled
      count: 3,
    },
    blurb: {
      placement: "below",
    },
  },

  // Post Options
  postOptions: {
    postsPerPage: 6,
    readingTime: true,
    wordCount: true,
    tags: true,
    linkedMentions: {
      enabled: true,
      linkedMentionsCompact: false,
    },
    graphView: {
      enabled: true,
      showInSidebar: true,
      maxNodes: 100,
      showOrphanedPosts: true,
    },
    postNavigation: true,
    showPostCardCoverImages: "featured-and-posts",
    postCardAspectRatio: "og",
    comments: {
      enabled: false,
      provider: "giscus",
      repo: "",
      repoId: "",
      category: "",
      categoryId: "",
      mapping: "",
      strict: "",
      reactions: "",
      metadata: "",
      inputPosition: "",
      theme: "",
      lang: "",
      loading: "",
    },
  },
};

// Utility functions (Keeping these as they are used by components)
export function getFeature(feature: keyof Omit<SiteConfig["postOptions"], "postsPerPage" | "showPostCardCoverImages" | "postCardAspectRatio" | "customPostCardAspectRatio" | "linkedMentions" | "graphView" | "comments">): boolean {
  return siteConfig.postOptions[feature];
}

export function getCommandPaletteShortcut(): string {
  return siteConfig.commandPalette.shortcut;
}

export function getContentWidth(): string {
  return siteConfig.layout.contentWidth;
}

export function getTheme(): "minimal" | "oxygen" | "atom" | "ayu" | "catppuccin" | "charcoal" | "dracula" | "everforest" | "flexoki" | "gruvbox" | "macos" | "nord" | "obsidian" | "rose-pine" | "sky" | "solarized" | "things" | "custom" {
  return siteConfig.theme;
}

export function getPostCardAspectRatio(): string {
  const { postCardAspectRatio, customPostCardAspectRatio } = siteConfig.postOptions;
  switch (postCardAspectRatio) {
    case "16:9": return "16 / 9";
    case "4:3": return "4 / 3";
    case "3:2": return "3 / 2";
    case "og": return "1.91 / 1";
    case "square": return "1 / 1";
    case "golden": return "1.618 / 1";
    case "custom": return customPostCardAspectRatio || "1.91 / 1";
    default: return "1.91 / 1";
  }
}

export function getHeadingFont(): string { return siteConfig.fonts.families.heading; }
export function getProseFont(): string { return siteConfig.fonts.families.body; }
export function getTableOfContentsDepth(): number { return siteConfig.tableOfContents.depth; }
export function getTableOfContentsEnabled(): boolean { return siteConfig.tableOfContents.enabled; }

export function getFontFamily(fontName: string): string {
  const fontMap: Record<string, string> = {
    'Inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    'Roboto': "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Open Sans': "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Lato': "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Poppins': "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Source Sans Pro': "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Nunito': "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Montserrat': "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'Playfair Display': "'Playfair Display', Georgia, 'Times New Roman', serif",
    'Merriweather': "'Merriweather', Georgia, 'Times New Roman', serif",
    'Lora': "'Lora', Georgia, 'Times New Roman', serif",
    'Crimson Text': "'Crimson Text', Georgia, 'Times New Roman', serif",
    'PT Serif': "'PT Serif', Georgia, 'Times New Roman', serif",
    'Libre Baskerville': "'Libre Baskerville', Georgia, 'Times New Roman', serif",
    'Fira Code': "'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace",
    'JetBrains Mono': "'JetBrains Mono', 'Monaco', 'Consolas', 'Courier New', monospace",
    'Source Code Pro': "'Source Code Pro', 'Monaco', 'Consolas', 'Courier New', monospace",
    'IBM Plex Mono': "'IBM Plex Mono', 'Monaco', 'Consolas', 'Courier New', monospace",
    'Cascadia Code': "'Cascadia Code', 'Monaco', 'Consolas', 'Courier New', monospace",
  };
  return fontMap[fontName] || `'${fontName}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
}

export function getGoogleFontsUrl(headingFont: string, bodyFont: string): string {
  const googleFonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Source Sans Pro', 
    'Nunito', 'Montserrat', 'Playfair Display', 'Merriweather', 'Lora', 
    'Crimson Text', 'PT Serif', 'Libre Baskerville', 'Fira Code', 
    'JetBrains Mono', 'Source Code Pro', 'IBM Plex Mono', 'Cascadia Code'
  ];
  const fonts = new Set<string>();
  if (googleFonts.includes(headingFont)) fonts.add(headingFont);
  if (googleFonts.includes(bodyFont)) fonts.add(bodyFont);
  if (fonts.size === 0) return '';
  
  const fontList = Array.from(fonts).map(font => {
    const weights = font.includes('Mono') ? '300;400;500;600;700' : '300;400;500;600;700';
    return `${font.replace(/\s+/g, '+')}:wght@${weights}`;
  }).join('&family=');
  return `https://fonts.googleapis.com/css2?family=${fontList}&display=swap`;
}

export function getFontSource(): "local" | "cdn" { return siteConfig.fonts.source; }
export function getFontDisplay(): "swap" | "fallback" | "optional" { return siteConfig.fonts.display; }
export function getFontFamilies() { return siteConfig.fonts.families; }
export function shouldLoadLocalFonts(): boolean { return siteConfig.fonts.source === "local"; }
export function shouldLoadCdnFonts(): boolean { return siteConfig.fonts.source === "cdn"; }

export function getThemeDisplayName(themeName: string): string {
  const specialCases: Record<string, string> = { 'rose-pine': 'Rosé Pine', 'macos': 'macOS' };
  if (specialCases[themeName]) return specialCases[themeName];
  return themeName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default siteConfig;