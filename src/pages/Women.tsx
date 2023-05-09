import { useCollection } from "../hooks/useCollection";
import ProductList from "../components/ProductList";

const Women = () => {
  const { documents: products, error } = useCollection("products", [
    "category",
    "==",
    "women's clothing",
  ]);

  return (
    <div>
      <h5 className="p-4 text-center">Women's Clothing</h5>
      {error && <p className="error">{error}</p>}
      {products && <ProductList products={products} />}
    </div>
  );
};

export default Women;
