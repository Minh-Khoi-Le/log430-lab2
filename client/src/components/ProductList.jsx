import ProductCard from "./ProductCard";

const ProductList = ({ produits, onDelete, onEdit }) => {
  return (
    <div className="products-grid">
      {produits.map((produit) => (
        <ProductCard key={produit.id} produit={produit} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};
export default ProductList;
