import { useCollection } from "../hooks/useCollection";
import ProductList from "../components/ProductList";

const Men = () => {
  const { documents: products, error } = useCollection("products", [
    "category",
    "==",
    "men's clothing",
  ]);

  return (
    <div>
      <h5 className="p-4 text-center">Men's Clothing</h5>

      {error && <p className="error">{error}</p>}
      {products && <ProductList products={products} />}
    </div>
  );
};

export default Men;
