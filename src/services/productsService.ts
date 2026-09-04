import { supabase } from "../lib/supabase";

/* =========================================================
   TYPES
   ========================================================= */

export interface CreateProductData {
  name: string;

  description?: string | null;

  category?: string | null;
  brand?: string | null;

  product_type: "physical" | "digital";

  price: number;
  compare_at_price?: number | null;

  currency?: string;

  sku?: string | null;

  track_inventory?: boolean;
  stock_quantity?: number;

  weight?: number | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;

  options?: Record<string, string[]> | null;

  status?: "draft" | "published" | "archived";
}

export interface ProductImageUpload {
  productId: string;
  file: File;
  sortOrder?: number;
}

export interface SaveProductImageData {
  productId: string;
  storagePath: string;
  sortOrder?: number;
}

export interface ProductFileUpload {
  productId: string;
  file: File;
}

export interface SaveProductFileData {
  productId: string;
  fileName: string;
  storagePath: string;
  fileSize: number;
  mimeType: string;
}

export interface ProductAssets {
  images?: File[];
  digitalFile?: File | null;
}

/* =========================================================
   CONSTANTES
   ========================================================= */

const IMAGE_BUCKET = "product-images";
const DIGITAL_FILE_BUCKET = "product-files";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_DIGITAL_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const ALLOWED_DIGITAL_TYPES = [
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "image/jpeg",
  "image/png",
  "image/webp",
  "text/plain",
];

/* =========================================================
   1. GENERATE PRODUCT SLUG
   ========================================================= */

export const generateProductSlug = (
  name: string,
): string => {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/* =========================================================
   2. CREATE UNIQUE SLUG
   ========================================================= */

export const createUniqueProductSlug = async (
  name: string,
): Promise<string> => {
  const baseSlug = generateProductSlug(name);

  if (!baseSlug) {
    throw new Error(
      "Product name cannot generate a valid slug.",
    );
  }

  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const { data, error } = await supabase
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error(
        "Error checking product slug:",
        error,
      );

      throw new Error(
        "Unable to verify product slug.",
      );
    }

    if (!data) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

/* =========================================================
   3. VALIDATE PRODUCT DATA
   ========================================================= */

const validateProductData = (
  product: CreateProductData,
) => {
  if (!product.name.trim()) {
    throw new Error("Product name is required.");
  }

  if (product.price < 0) {
    throw new Error("Product price cannot be negative.");
  }

  if (
    product.compare_at_price !== null &&
    product.compare_at_price !== undefined &&
    product.compare_at_price < 0
  ) {
    throw new Error(
      "Compare price cannot be negative.",
    );
  }

  if (
    product.stock_quantity !== undefined &&
    product.stock_quantity < 0
  ) {
    throw new Error(
      "Stock quantity cannot be negative.",
    );
  }

  if (
    product.product_type === "physical" &&
    product.weight !== null &&
    product.weight !== undefined &&
    product.weight < 0
  ) {
    throw new Error(
      "Product weight cannot be negative.",
    );
  }

  const dimensions = [
    product.length,
    product.width,
    product.height,
  ];

  if (
    dimensions.some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value < 0,
    )
  ) {
    throw new Error(
      "Product dimensions cannot be negative.",
    );
  }
};

/* =========================================================
   4. CREATE PRODUCT
   ========================================================= */

export const createProduct = async (
  product: CreateProductData,
) => {
  validateProductData(product);

  const slug = await createUniqueProductSlug(
    product.name,
  );

  const { data, error } = await supabase
    .from("products")
    .insert({
      ...product,
      slug,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Error creating product:",
      error,
    );

    throw new Error(error.message);
  }

  return data;
};

/* =========================================================
   5. VALIDATE IMAGE
   ========================================================= */

const validateProductImage = (file: File) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      "Unsupported image format. Use JPG, PNG, WEBP or GIF.",
    );
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(
      "Image size must be smaller than 5 MB.",
    );
  }
};

/* =========================================================
   6. UPLOAD PRODUCT IMAGE TO STORAGE
   ========================================================= */

export const uploadProductImage = async ({
  productId,
  file,
  sortOrder = 0,
}: ProductImageUpload) => {
  validateProductImage(file);

  const fileExtension =
    file.name.split(".").pop()?.toLowerCase() || "jpg";

  const fileName = `${crypto.randomUUID()}.${fileExtension}`;

  const filePath =
    `products/${productId}/${fileName}`;

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    console.error(
      "Error uploading product image:",
      error,
    );

    throw new Error(
      "Unable to upload product image.",
    );
  }

  return {
    storagePath: filePath,
    sortOrder,
  };
};

/* =========================================================
   7. SAVE IMAGE INFORMATION IN DATABASE
   ========================================================= */

export const saveProductImage = async ({
  productId,
  storagePath,
  sortOrder = 0,
}: SaveProductImageData) => {
  const { data, error } = await supabase
    .from("product_images")
    .insert({
      product_id: productId,
      storage_path: storagePath,
      sort_order: sortOrder,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Error saving product image:",
      error,
    );

    throw new Error(
      "Unable to save product image information.",
    );
  }

  return data;
};

/* =========================================================
   8. VALIDATE DIGITAL FILE
   ========================================================= */

const validateDigitalFile = (file: File) => {
  if (!ALLOWED_DIGITAL_TYPES.includes(file.type)) {
    throw new Error(
      "Unsupported digital file format.",
    );
  }

  if (file.size > MAX_DIGITAL_FILE_SIZE) {
    throw new Error(
      "Digital file must be smaller than 50 MB.",
    );
  }
};

/* =========================================================
   9. UPLOAD DIGITAL FILE TO STORAGE
   ========================================================= */

export const uploadDigitalFile = async ({
  productId,
  file,
}: ProductFileUpload) => {
  validateDigitalFile(file);

  const fileExtension =
    file.name.split(".").pop()?.toLowerCase() || "bin";

  const fileName = `${crypto.randomUUID()}.${fileExtension}`;

  const filePath =
    `products/${productId}/${fileName}`;

  const { error } = await supabase.storage
    .from(DIGITAL_FILE_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    console.error(
      "Error uploading digital file:",
      error,
    );

    throw new Error(
      "Unable to upload digital file.",
    );
  }

  return {
    fileName: file.name,
    storagePath: filePath,
    fileSize: file.size,
    mimeType: file.type,
  };
};

/* =========================================================
   10. SAVE DIGITAL FILE INFORMATION
   ========================================================= */

export const saveProductFile = async ({
  productId,
  fileName,
  storagePath,
  fileSize,
  mimeType,
}: SaveProductFileData) => {
  const { data, error } = await supabase
    .from("product_files")
    .insert({
      product_id: productId,
      file_name: fileName,
      storage_path: storagePath,
      file_size: fileSize,
      mime_type: mimeType,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Error saving product file:",
      error,
    );

    throw new Error(
      "Unable to save product file information.",
    );
  }

  return data;
};

/* =========================================================
   11. DELETE STORAGE FILE
   ========================================================= */

const deleteStorageFile = async (
  bucket: string,
  storagePath: string,
) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([storagePath]);

  if (error) {
    console.error(
      `Error deleting file from ${bucket}:`,
      error,
    );
  }
};

/* =========================================================
   12. CREATE PRODUCT WITH IMAGES / DIGITAL FILE
   ========================================================= */

export const createProductWithAssets = async (
  product: CreateProductData,
  assets?: ProductAssets,
) => {
  let createdProduct: {
    id: string;
    [key: string]: unknown;
  } | null = null;

  const uploadedImagePaths: string[] = [];
  const uploadedDigitalPaths: string[] = [];

  try {
    /* -------------------------------------------------------
       CREATE PRODUCT
       ------------------------------------------------------- */

    createdProduct = await createProduct(product);

    if (!createdProduct) {
      throw new Error("Unable to create product.");
    }

    /* -------------------------------------------------------
       UPLOAD IMAGES
       ------------------------------------------------------- */

    if (assets?.images?.length) {
      for (
        let index = 0;
        index < assets.images.length;
        index++
      ) {
        const file = assets.images[index];

        const uploaded = await uploadProductImage({
          productId: createdProduct.id,
          file,
          sortOrder: index,
        });

        uploadedImagePaths.push(
          uploaded.storagePath,
        );

        await saveProductImage({
          productId: createdProduct.id,
          storagePath: uploaded.storagePath,
          sortOrder: uploaded.sortOrder,
        });
      }
    }

    /* -------------------------------------------------------
       UPLOAD DIGITAL FILE
       ------------------------------------------------------- */

    if (
      product.product_type === "digital" &&
      assets?.digitalFile
    ) {
      const uploaded = await uploadDigitalFile({
        productId: createdProduct.id,
        file: assets.digitalFile,
      });

      uploadedDigitalPaths.push(
        uploaded.storagePath,
      );

      await saveProductFile({
        productId: createdProduct.id,
        fileName: uploaded.fileName,
        storagePath: uploaded.storagePath,
        fileSize: uploaded.fileSize,
        mimeType: uploaded.mimeType,
      });
    }

    /* -------------------------------------------------------
       SUCCESS
       ------------------------------------------------------- */

    return createdProduct;
  } catch (error) {
    console.error(
      "Error creating product with assets:",
      error,
    );

    /* -------------------------------------------------------
       CLEANUP STORAGE
       ------------------------------------------------------- */

    for (const path of uploadedImagePaths) {
      await deleteStorageFile(
        IMAGE_BUCKET,
        path,
      );
    }

    for (const path of uploadedDigitalPaths) {
      await deleteStorageFile(
        DIGITAL_FILE_BUCKET,
        path,
      );
    }

    /* -------------------------------------------------------
       CLEANUP DATABASE
       ------------------------------------------------------- */

    if (createdProduct) {
      await supabase
        .from("product_images")
        .delete()
        .eq(
          "product_id",
          createdProduct.id,
        );

      await supabase
        .from("product_files")
        .delete()
        .eq(
          "product_id",
          createdProduct.id,
        );

      await supabase
        .from("products")
        .delete()
        .eq(
          "id",
          createdProduct.id,
        );
    }

    throw error;
  }
};