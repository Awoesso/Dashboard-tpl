import {
  ImagePlus,
  Plus,
  Trash2,
} from "lucide-react";

import type {
  ChangeEvent,
  RefObject,
} from "react";

import type {
  ProductImage,
} from "./ProductsNew";

interface Props {
  images: ProductImage[];
  fileInputRef: RefObject<HTMLInputElement | null>;
  errors?: Record<string, string>;
  onChange: (
    images: ProductImage[],
  ) => void;
  loading?: boolean;
}

const MAX_IMAGES = 6;

const ProductImages = ({
  images,
  fileInputRef,
  errors,
  onChange,
  loading = false,
}: Props) => {
  /* =========================================================
     SKELETON
  ========================================================= */

  if (loading) {
    return (
      <section className="w-full! min-w-0! rounded-2xl! border! border-gray-200! bg-white! p-4! shadow-sm! sm:p-5!">
        <div className="animate-pulse! space-y-4!">
          {/* Header */}

          <div className="flex! items-center! justify-between! gap-3!">
            <div className="min-w-0!">
              <div className="skeleton h-3.5! w-20! rounded-md!" />

              <div className="skeleton mt-1.5! h-2.5! w-44! max-w-full! rounded-md!" />
            </div>

            <div className="skeleton h-3! w-8! shrink-0! rounded-md!" />
          </div>

          {/* Image grid */}

          <div className="grid! grid-cols-2! gap-3! sm:grid-cols-3! lg:grid-cols-4!">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="skeleton aspect-square! rounded-xl!"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     IMAGE SELECT
  ========================================================= */

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(
      event.target.files ?? [],
    );

    if (!files.length) {
      return;
    }

    const remainingSlots =
      MAX_IMAGES - images.length;

    if (remainingSlots <= 0) {
      event.target.value = "";
      return;
    }

    const nextFiles = files
      .filter((file) =>
        file.type.startsWith("image/"),
      )
      .slice(0, remainingSlots);

    const nextImages: ProductImage[] =
      nextFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview:
          URL.createObjectURL(file),
      }));

    onChange([
      ...images,
      ...nextImages,
    ]);

    event.target.value = "";
  };

  /* =========================================================
     REMOVE IMAGE
  ========================================================= */

  const removeImage = (
    id: string,
  ) => {
    const image = images.find(
      (item) => item.id === id,
    );

    if (image) {
      URL.revokeObjectURL(
        image.preview,
      );
    }

    onChange(
      images.filter(
        (item) => item.id !== id,
      ),
    );
  };

  /* =========================================================
     OPEN FILE PICKER
  ========================================================= */

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="w-full! min-w-0! rounded-2xl! border! border-gray-200! bg-white! p-4! shadow-sm! transition-all! duration-200! sm:p-5!">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-4! flex! items-center! justify-between! gap-3!">
        <div className="min-w-0!">
          <h2 className="font-heading! text-[14px]! font-semibold! tracking-tight! text-gray-900! sm:text-[15px]!">
            Images
          </h2>

          <p className="mt-0.5! truncate! text-[10px]! font-medium! text-gray-500! sm:text-[11px]!">
            Add up to {MAX_IMAGES} product images.
          </p>
        </div>

        <span className="shrink-0! text-[10px]! font-semibold! text-gray-400!">
          {images.length}/{MAX_IMAGES}
        </span>
      </div>

      {/* =====================================================
          HIDDEN INPUT
      ===================================================== */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        hidden
        onChange={handleChange}
      />

      {/* =====================================================
          IMAGE GRID
      ===================================================== */}

      <div className="grid! grid-cols-2! gap-3! sm:grid-cols-3! lg:grid-cols-4!">
        {/* EXISTING IMAGES */}

        {images.map(
          (image, index) => (
            <div
              key={image.id}
              className="
                group!
                relative!
                aspect-square!
                min-w-0!
                overflow-hidden!
                rounded-xl!
                border!
                border-gray-200!
                bg-[#fafafa]!
                transition-all!
                duration-200!
                hover:border-gray-300!
              "
            >
              {/* IMAGE */}

              <img
                src={image.preview}
                alt={
                  image.file.name ||
                  `Product image ${
                    index + 1
                  }`
                }
                className="
                  h-full!
                  w-full!
                  object-cover!
                  transition-transform!
                  duration-200!
                  group-hover:scale-[1.02]!
                "
              />

              {/* COVER BADGE */}

              {index === 0 && (
                <span className="absolute! bottom-2! left-2! rounded-full! bg-gray-900/90! px-2! py-1! text-[9px]! font-semibold! text-white! shadow-sm!">
                  Cover
                </span>
              )}

              {/* REMOVE */}

              <button
                type="button"
                onClick={() =>
                  removeImage(
                    image.id,
                  )
                }
                aria-label={`Remove ${
                  image.file.name
                }`}
                className="
                  absolute!
                  right-2!
                  top-2!
                  flex!
                  h-7!
                  w-7!
                  items-center!
                  justify-center!
                  rounded-full!
                  bg-white/95!
                  text-gray-500!
                  opacity-100!
                  shadow-sm!
                  transition-all!
                  duration-150!
                  hover:bg-red-50!
                  hover:text-red-500!
                  active:scale-90!
                "
              >
                <Trash2
                  size={13}
                  strokeWidth={1.9}
                />
              </button>
            </div>
          ),
        )}

        {/* ===================================================
            ADD IMAGE
        =================================================== */}

        {images.length <
          MAX_IMAGES && (
          <button
            type="button"
            onClick={openFilePicker}
            className="
              group!
              flex!
              aspect-square!
              min-w-0!
              cursor-pointer!
              flex-col!
              items-center!
              justify-center!
              gap-1.5!
              rounded-xl!
              border!
              border-dashed!
              border-gray-200!
              bg-[#fafafa]!
              p-3!
              text-center!
              transition-all!
              duration-200!
              hover:border-blue-400!
              hover:bg-blue-50/30!
              active:scale-[0.99]!
            "
          >
            <div
              className="
                flex!
                h-9!
                w-9!
                items-center!
                justify-center!
                rounded-xl!
                border!
                border-gray-200!
                bg-white!
                text-gray-400!
                shadow-sm!
                transition-all!
                duration-200!
                group-hover:border-blue-200!
                group-hover:text-blue-600!
              "
            >
              <ImagePlus
                size={16}
                strokeWidth={1.9}
              />
            </div>

            <span className="text-[10px]! font-semibold! text-gray-600! transition-colors! group-hover:text-blue-600! sm:text-[11px]!">
              Add image
            </span>

            <span className="text-[9px]! font-medium! text-gray-400!">
              {MAX_IMAGES -
                images.length}{" "}
              remaining
            </span>
          </button>
        )}
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {images.length === 0 && (
        <div className="pointer-events-none! mt-3! flex! items-center! gap-2! rounded-xl! border! border-gray-100! bg-gray-50/60! px-3! py-2.5!">
          <Plus
            size={12}
            className="shrink-0! text-gray-400!"
          />

          <p className="text-[9px]! font-medium! leading-relaxed! text-gray-400!">
            The first image you add will
            automatically be used as the
            product cover.
          </p>
        </div>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {errors?.images && (
        <p className="mt-2! text-[10px]! font-semibold! leading-relaxed! text-red-500!">
          {errors.images}
        </p>
      )}
    </section>
  );
};

export default ProductImages;