import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setProduct(null);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Produit introuvable");
        return response.json();
      })
      .then(setProduct)
      .catch(() => setError("Impossible de charger les détails du produit."));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Chargement...</p>;

  return (
    <article className="panel">
      <h2>{product.title}</h2>
      <img className="small-image" src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p><strong>Prix :</strong> {product.price} $</p>
    </article>
  );
}
