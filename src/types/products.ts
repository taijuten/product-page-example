export interface Product {
    id: number;
    slug: string;
    image_src: string;
    title: string;
    vendor: string;
    published: boolean;
    tags: string[];
    option_value: string;
    price: number;
    sku: string;
    subscription_discount: number;

    url: string;
  }
