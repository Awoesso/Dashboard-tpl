import ProductCard, {
  type MarketplaceProduct,
} from "./ProductCard";

type MarketplaceGridProps = {
  products: MarketplaceProduct[];
};

const MarketplaceGrid = ({
  products,
}: MarketplaceGridProps) => {
  if (!products.length) {
    return null;
  }

  return (
    <div
      className="
        grid!
        min-w-0!
        grid-cols-1!
        gap-3!
        sm:grid-cols-2!
        lg:grid-cols-3!
        xl:grid-cols-4!
        2xl:grid-cols-5!
        sm:gap-4!
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default MarketplaceGrid;