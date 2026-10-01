import { DEFAULT_SITE_CONTENT } from "./site-content-defaults";
import type { SiteContent } from "./site-content-types";

export function mergeSiteContent(partial: Partial<SiteContent>): SiteContent {
  return {
    business: { ...DEFAULT_SITE_CONTENT.business, ...partial.business },
    seo: { ...DEFAULT_SITE_CONTENT.seo, ...partial.seo },
    announcement: {
      ...DEFAULT_SITE_CONTENT.announcement,
      ...partial.announcement,
    },
    hero: { ...DEFAULT_SITE_CONTENT.hero, ...partial.hero },
    contact: { ...DEFAULT_SITE_CONTENT.contact, ...partial.contact },
    shopGallery: {
      ...DEFAULT_SITE_CONTENT.shopGallery,
      ...partial.shopGallery,
      photos:
        partial.shopGallery?.photos !== undefined
          ? partial.shopGallery.photos
          : DEFAULT_SITE_CONTENT.shopGallery.photos,
    },
  };
}
