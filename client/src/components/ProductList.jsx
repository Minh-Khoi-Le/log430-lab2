import ProductCard from "./ProductCard";

const ProductList = ({ produits, onDelete }) => {
  return (
    <div className="products-grid">
      {produits.map((produit) => (
        <ProductCard key={produit.id} produit={produit} onDelete={onDelete}  />
      ))}
    </div>
  );
};
export default ProductList;
