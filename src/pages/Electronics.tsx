import { useCollection } from "../hooks/useCollection";
import ProductList from "../components/ProductList";

const Electronics = () => {
  const { documents: products, error } = useCollection("products", [
    "category",
    "==",
    "electronics",
  ]);

  return (
    <div>
      <h5 className="p-4 text-center">Electronics</h5>
      {error && <p className="error">{error}</p>}
      {products && <ProductList products={products} />}
    </div>
  );
};

export default Electronics;
