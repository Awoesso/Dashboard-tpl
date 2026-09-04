import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { createProductWithAssets } from "@/services/productsService";

import ProductHeader from "@/Pages/products/ProductHeader";
import ProductDetails from "@/Pages/products/ProductDetails";
import ProductPricing from "@/Pages/products/ProductPricing";
import ProductInventory from "@/Pages/products/ProductInventory";
import ProductShipping from "@/Pages/products/ProductShipping";
import ProductOptions from "@/Pages/products/ProductOptions";
import ProductImages from "@/Pages/products/ProductImages";
import DigitalFileUpload from "@/Pages/products/DigitalFileUpload";
import ProductPreview from "@/Pages/products/ProductPreview";
import ProductPublication from "@/Pages/products/ProductPublication";
import ProductActions from "@/Pages/products/ProductActions";
import ProductReviewModal from "@/Pages/products/ProductReviewModal";
import ProductNewSkeleton from "@/Pages/products/ProductNewSkeleton";

/* =========================================================
   TYPES
========================================================= */

export type ProductType = "physical" | "digital";

export type ProductStatus = "draft" | "published";

export interface ProductImage {
  id: string;
  file: File;
  preview: string;
}

export interface ProductFormData {
  productType: ProductType;
  status: ProductStatus;

  productName: string;
  brand: string;
  category: string;
  description: string;

  price: string;
  comparePrice: string;

  sku: string;
  trackInventory: boolean;
  stock: string;

  weight: string;
  length: string;
  width: string;
  height: string;

  hasOptions: boolean;
  optionName: string;
  optionValues: string[];
}

/* =========================================================
   CONSTANTS
========================================================= */

export const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Home",
  "Beauty",
  "Sports",
  "Accessories",
  "Digital",
  "Other",
];

const MAX_DESCRIPTION_LENGTH = 1000;

/* =========================================================
   COMPONENT
========================================================= */

const ProductsNew = () => {
  const navigate = useNavigate();

  /* =======================================================
     REFS
  ======================================================= */

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const digitalFileInputRef =
    useRef<HTMLInputElement>(null);

  const imagesRef =
    useRef<ProductImage[]>([]);

  /* =======================================================
     UI STATE
  ======================================================= */

  const [isLoading, setIsLoading] =
    useState(true);

  const [showReview, setShowReview] =
    useState(false);

  const [isCreating, setIsCreating] =
    useState(false);

  /* =======================================================
     ASSETS
  ======================================================= */

  const [images, setImages] =
    useState<ProductImage[]>([]);

  const [digitalFile, setDigitalFile] =
    useState<File | null>(null);

  /* =======================================================
     ERRORS
  ======================================================= */

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  /* =======================================================
     FORM
  ======================================================= */

  const [form, setForm] =
    useState<ProductFormData>({
      productType: "physical",
      status: "draft",

      productName: "",
      brand: "",
      category: "Electronics",
      description: "",

      price: "",
      comparePrice: "",

      sku: "",

      trackInventory: true,
      stock: "0",

      weight: "",
      length: "",
      width: "",
      height: "",

      hasOptions: false,
      optionName: "Color",
      optionValues: [""],
    });

  /* =======================================================
     INITIAL LOADING
  ======================================================= */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 650);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* =======================================================
     KEEP IMAGES REF UPDATED
  ======================================================= */

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  /* =======================================================
     CLEANUP OBJECT URLS
  ======================================================= */

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, []);

  /* =======================================================
     UPDATE FORM
  ======================================================= */

  const updateForm = <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const next = { ...current };

      delete next[key];

      return next;
    });
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    /* ---------------- Product name ---------------- */

    if (!form.productName.trim()) {
      nextErrors.productName =
        "Product name is required.";
    }

    /* ---------------- Price ---------------- */

    if (!form.price.trim()) {
      nextErrors.price = "Price is required.";
    } else {
      const price = Number(
        form.price.replace(/\s/g, ""),
      );

      if (Number.isNaN(price) || price < 0) {
        nextErrors.price =
          "Enter a valid price.";
      }
    }

    /* ---------------- Description ---------------- */

    if (
      form.description.length >
      MAX_DESCRIPTION_LENGTH
    ) {
      nextErrors.description =
        "Description is too long.";
    }

    /* ---------------- Stock ---------------- */

    if (
      form.productType === "physical" &&
      form.trackInventory
    ) {
      const stock = Number(form.stock);

      if (
        form.stock === "" ||
        Number.isNaN(stock) ||
        stock < 0
      ) {
        nextErrors.stock =
          "Enter a valid stock quantity.";
      }
    }

    /* ---------------- Options ---------------- */

    if (form.hasOptions) {
      if (!form.optionName.trim()) {
        nextErrors.optionName =
          "Option name is required.";
      }

      const validValues =
        form.optionValues.filter(
          (value) => value.trim() !== "",
        );

      if (!validValues.length) {
        nextErrors.optionValues =
          "Add at least one option value.";
      }
    }

    /* ---------------- Digital file ---------------- */

    if (
      form.productType === "digital" &&
      !digitalFile
    ) {
      nextErrors.digitalFile =
        "Please select a digital file.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /* =======================================================
     REVIEW
  ======================================================= */

  const handleReview = () => {
    if (!validateForm()) {
      return;
    }

    setShowReview(true);
  };

  /* =======================================================
     CREATE PRODUCT
  ======================================================= */

  const handleCreate = async () => {
    if (isCreating) {
      return;
    }

    setIsCreating(true);

    setErrors((current) => {
      const next = { ...current };

      delete next.submit;

      return next;
    });

    try {
      /* =====================================================
         PRICE
      ===================================================== */

      const price = Number(
        form.price.replace(/\s/g, ""),
      );

      /* =====================================================
         COMPARE PRICE
      ===================================================== */

      const compareAtPrice =
        form.comparePrice.trim() !== ""
          ? Number(
              form.comparePrice.replace(
                /\s/g,
                "",
              ),
            )
          : null;

      /* =====================================================
         STOCK
      ===================================================== */

      const stockQuantity =
        form.productType === "physical"
          ? Number(form.stock || 0)
          : 0;

      /* =====================================================
         OPTIONS
      ===================================================== */

      const options =
        form.hasOptions
          ? {
              [form.optionName.trim()]:
                form.optionValues
                  .map((value) =>
                    value.trim(),
                  )
                  .filter(Boolean),
            }
          : null;

      /* =====================================================
         PRODUCT DATA
      ===================================================== */

      const productData = {
        name: form.productName.trim(),

        description:
          form.description.trim() || null,

        category:
          form.category.trim() || null,

        brand:
          form.brand.trim() || null,

        product_type:
          form.productType,

        price,

        compare_at_price:
          compareAtPrice,

        currency: "XOF",

        sku:
          form.sku.trim() || null,

        track_inventory:
          form.productType === "physical"
            ? form.trackInventory
            : false,

        stock_quantity:
          stockQuantity,

        weight:
          form.productType ===
            "physical" &&
          form.weight.trim()
            ? Number(form.weight)
            : null,

        length:
          form.productType ===
            "physical" &&
          form.length.trim()
            ? Number(form.length)
            : null,

        width:
          form.productType ===
            "physical" &&
          form.width.trim()
            ? Number(form.width)
            : null,

        height:
          form.productType ===
            "physical" &&
          form.height.trim()
            ? Number(form.height)
            : null,

        options,

        status: form.status,
      };

      /* =====================================================
         SEND TO SERVICE
      ===================================================== */

      const createdProduct =
        await createProductWithAssets(
          productData,
          {
            images: images.map(
              (image) => image.file,
            ),

            digitalFile:
              form.productType ===
              "digital"
                ? digitalFile
                : null,
          },
        );

      console.log(
        "Product created successfully:",
        createdProduct,
      );

      /* =====================================================
         CLOSE MODAL
      ===================================================== */

      setShowReview(false);

      /* =====================================================
         REDIRECT
      ===================================================== */

      navigate("/dashboard/products");
    } catch (error) {
      console.error(
        "Create product failed:",
        error,
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to create the product.";

      setErrors({
        submit: message,
      });

      /*
       * On ferme la modal pour que l'erreur
       * soit visible sur la page principale.
       */
      setShowReview(false);
    } finally {
      setIsCreating(false);
    }
  };

  /* =======================================================
     FORM SUBMIT
  ======================================================= */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    handleReview();
  };

  /* =======================================================
     IMAGES
  ======================================================= */

  const handleImagesChange = (
    nextImages: ProductImage[],
  ) => {
    setImages(nextImages);

    setErrors((current) => {
      if (!current.images) {
        return current;
      }

      const next = { ...current };

      delete next.images;

      return next;
    });
  };

  /* =======================================================
     DIGITAL FILE
  ======================================================= */

  const handleDigitalFileChange = (
    file: File | null,
  ) => {
    setDigitalFile(file);

    setErrors((current) => {
      if (!current.digitalFile) {
        return current;
      }

      const next = { ...current };

      delete next.digitalFile;

      return next;
    });
  };

  /* =======================================================
     PREVIEW IMAGE
  ======================================================= */

  const previewImage = useMemo(() => {
    if (images.length > 0) {
      return images[0].preview;
    }

    return "/dashboard-preview.png";
  }, [images]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (isLoading) {
    return <ProductNewSkeleton />;
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <>
      <div className="min-h-screen! w-full! bg-[#fafafa]! px-3! py-3! sm:px-4! sm:py-5! lg:px-6! lg:py-6!">
        <form
          onSubmit={handleSubmit}
          className="animate-in!"
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <ProductHeader
            status={form.status}
          />

          {/* =================================================
              SUBMIT ERROR
          ================================================= */}

          {errors.submit && (
            <div className="mb-4! rounded-xl! border! border-red-200! bg-red-50! px-4! py-3! text-xs! font-semibold! text-red-600! transition-all!">
              {errors.submit}
            </div>
          )}

        {/* =================================================
    MAIN GRID
================================================= */}

<div
  className="
    mt-4!
    grid!
    min-w-0!
    grid-cols-1!
    gap-4!
    sm:mt-5!
    lg:grid-cols-[minmax(0,1fr)_320px]!
    xl:grid-cols-[minmax(0,1fr)_350px]!
    lg:gap-5!
  "
>
  {/* =================================================
      LEFT COLUMN
  ================================================= */}

  <div className="min-w-0! space-y-4!">
    <ProductDetails
      form={form}
      errors={errors}
      updateForm={updateForm}
    />

    <ProductPricing
      form={form}
      errors={errors}
      updateForm={updateForm}
    />

    {form.productType === "physical" && (
      <>
        <ProductInventory
          form={form}
          errors={errors}
          updateForm={updateForm}
        />

        <ProductShipping
          form={form}
          updateForm={updateForm}
        />
      </>
    )}

    <ProductOptions
      form={form}
      errors={errors}
      updateForm={updateForm}
    />

    <ProductImages
      images={images}
      fileInputRef={fileInputRef}
      errors={errors}
      onChange={handleImagesChange}
    />

    {form.productType === "digital" && (
      <DigitalFileUpload
        file={digitalFile}
        inputRef={digitalFileInputRef}
        error={errors.digitalFile}
        onChange={handleDigitalFileChange}
      />
    )}
  </div>

  {/* =================================================
      RIGHT COLUMN
      DESKTOP = ALWAYS VISIBLE
      MOBILE = NORMAL FLOW
  ================================================= */}
<aside
  className="
    min-w-0!
    lg:sticky!
    lg:top-4!
    lg:h-[calc(100vh-1.5rem)]!
  "
>
  <div className="flex! h-full! min-h-0! flex-col! gap-4!">
    
    <div className="min-h-0! flex-1! overflow-hidden!">
      <ProductPreview
        form={form}
        images={images}
        digitalFile={digitalFile}
      />
    </div>

    <div className="shrink-0!">
      <ProductPublication
        status={form.status}
        onChange={(status) =>
          updateForm("status", status)
        }
      />
    </div>

    <div className="shrink-0!">
      <ProductActions
        isCreating={isCreating}
        onReview={handleReview}
      />
    </div>

  </div>
</aside>
</div>

    </form>
  </div>

      {/* =====================================================
          REVIEW MODAL
      ===================================================== */}

      {showReview && (
        <ProductReviewModal
          form={form}
          images={images}
          digitalFile={digitalFile}
          isCreating={isCreating}
          onClose={() =>
            setShowReview(false)
          }
          onCreate={handleCreate}
        />
      )}
    </>
  );
};

export default ProductsNew;