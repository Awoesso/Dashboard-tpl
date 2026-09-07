import { supabase } from "@/lib/supabase";

/* =========================================================
   TYPES
========================================================= */

export type MarketplaceProductStatus =
  | "draft"
  | "published"
  | "archived";

export interface MarketplaceProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string | null;
  price: number;
  currency: string;
  status: MarketplaceProductStatus;
  sales_count: number;
  view_count: number;
  image_url: string | null;
  created_at: string;
}

/* =========================================================
   IMAGE URL
========================================================= */

const getCoverUrl = (
  storagePath: string | null,
) => {
  if (!storagePath) {
    return null;
  }

  const { data } =
    supabase.storage
      .from("product-covers")
      .getPublicUrl(storagePath);

  return data.publicUrl || null;
};

/* =========================================================
   MAP PRODUCT
========================================================= */

const mapProduct = (
  product: any,
): MarketplaceProduct => {
  const firstImage =
    Array.isArray(
      product.product_images,
    )
      ? [...product.product_images].sort(
          (a, b) =>
            (a.sort_order ?? 0) -
            (b.sort_order ?? 0),
        )[0]
      : null;

  return {
    id: product.id,

    name: product.name,

    slug: product.slug || "",

    description:
      product.description ?? null,

    category:
      product.category ?? null,

    price:
      Number(product.price) || 0,

    currency:
      product.currency || "XOF",

    status:
      product.status || "draft",

    sales_count:
      Number(product.sales_count) || 0,

    view_count:
      Number(product.view_count) || 0,

    image_url:
      firstImage?.storage_path
        ? getCoverUrl(
            firstImage.storage_path,
          )
        : null,

    created_at:
      product.created_at,
  };
};

/* =========================================================
   GET ALL PRODUCTS
========================================================= */

export const getMarketplaceProducts =
  async (): Promise<
    MarketplaceProduct[]
  > => {
    const {
      data,
      error,
    } = await supabase
      .from("products")
      .select(
        `
          id,
          name,
          slug,
          description,
          category,
          price,
          currency,
          status,
          sales_count,
          view_count,
          created_at,
          product_images (
            id,
            storage_path,
            sort_order,
            created_at
          )
        `,
      )
      .order(
        "created_at",
        {
          ascending: false,
        },
      );

    if (error) {
      console.error(
        "Get marketplace products failed:",
        error,
      );

      throw new Error(
        error.message ||
          "Unable to load products.",
      );
    }

    return (data ?? []).map(
      mapProduct,
    );
  };

/* =========================================================
   GET PRODUCT BY ID
========================================================= */

export const getMarketplaceProductById =
  async (
    productId: string,
  ): Promise<MarketplaceProduct> => {
    if (!productId) {
      throw new Error(
        "Product ID is required.",
      );
    }

    const {
      data,
      error,
    } = await supabase
      .from("products")
      .select(
        `
          id,
          name,
          slug,
          description,
          category,
          price,
          currency,
          status,
          sales_count,
          view_count,
          created_at,
          product_images (
            id,
            storage_path,
            sort_order,
            created_at
          )
        `,
      )
      .eq(
        "id",
        productId,
      )
      .maybeSingle();

    if (error) {
      console.error(
        "Get marketplace product failed:",
        error,
      );

      throw new Error(
        error.message ||
          "Unable to load the product.",
      );
    }

    if (!data) {
      throw new Error(
        "Product not found.",
      );
    }

    return mapProduct(data);
  };

/* =========================================================
   DELETE PRODUCT
========================================================= */

export const deleteMarketplaceProduct =
  async (
    productId: string,
  ): Promise<void> => {
    if (!productId) {
      throw new Error(
        "Product ID is required.",
      );
    }

    const {
      error,
    } = await supabase
      .from("products")
      .delete()
      .eq(
        "id",
        productId,
      );

    if (error) {
      console.error(
        "Delete marketplace product failed:",
        error,
      );

      throw new Error(
        error.message ||
          "Unable to delete the product.",
      );
    }
  };