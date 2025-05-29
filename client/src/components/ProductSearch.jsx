import React from "react";
import Form from "react-bootstrap/Form";

const ProductSearch = ({ value, onChange }) => {
  return (
    <Form style={{ display: "flex", alignItems: "center", margin: "1.5rem 0" }}>
      <Form.Control
        type="search"
        placeholder="Rechercher un produit..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          borderRadius: 25,
          paddingLeft: 35,
          background: "#e6e6e6",
        }}
      />
      <span
        style={{
          position: "absolute",
          marginLeft: 10,
          pointerEvents: "none",
        }}
      >
        <i className="bi bi-search" />
      </span>
    </Form>
  );
};
export default ProductSearch;
