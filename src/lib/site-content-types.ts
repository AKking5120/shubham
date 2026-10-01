export type ShopPhoto = {
  id: string;
  image: string;
  caption: string;
};

export type SiteContent = {
  business: {
    name: string;
    owner: string;
    phones: string[];
    email: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      full: string;
    };
    slogan: string;
  };
  seo: {
    title: string;
    description: string;
  };
  announcement: {
    badge: string;
    text: string;
  };
  hero: {
    title: string;
    highlight: string;
    trailing: string;
    description: string;
  };
  contact: {
    workingHours: string;
    whatsappDefaultMessage: string;
  };
  shopGallery: {
    title: string;
    subtitle: string;
    photos: ShopPhoto[];
  };
};
