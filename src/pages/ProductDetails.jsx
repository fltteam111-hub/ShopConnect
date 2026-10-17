
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL =
  "https://shopconnect-api-production.up.railway.app/api/products";

// Images from the internet, associated with each product ID
const productImages = {
  1: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
  2: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
  3: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
};

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setProduct(null);
    setError("");
    setLoading(true);

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur API");
        }

        return response.json();
      })
      .then((products) => {
        const foundProduct = products.find(
          (p) => String(p.id) === String(id)
        );

        if (!foundProduct) {
          throw new Error("Produit introuvable");
        }

        setProduct(foundProduct);
      })
      .catch(() => {
        setError("Impossible de charger les détails du produit.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <section className="panel">
        <p>Chargement des détails du produit...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error">{error}</p>
        <Link to="/products">← Retour aux produits</Link>
      </section>
    );
  }

  return (
    <article className="panel product-detail">
      <Link to="/products" className="back-link">
        ← Retour aux produits
      </Link>

      <div className="product-detail-layout">
        <div className="product-detail-image-container">
          <img
            className="product-detail-image"
            src={productImages[product.id]}
            alt={product.title}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="product-detail-info">
          <h2>{product.title}</h2>

          <p className="product-detail-price">
            {product.price} DH
          </p>

          <p className="product-detail-category">
            <strong>Catégorie :</strong> {product.category}
          </p>

          <hr />

          <h3>Description</h3>
          <p>
            Découvrez {product.title}, un produit proposé par
            ShopConnect. Consultez ses informations et son prix
            avant de faire votre choix.
          </p>

          <div className="product-services">
            <div>
              <strong>🚚 Livraison rapide</strong>
              <p>Partout au Maroc</p>
            </div>

            <div>
              <strong>🔒 Paiement sécurisé</strong>
              <p>Achat en toute confiance</p>
            </div>

            <div>
              <strong>🎧 Support client</strong>
              <p>À votre écoute</p>
            </div>
          </div>

          <Link to="/products" className="back-to-products-button">
            Continuer mes achats
          </Link>
        </div>
      </div>
    </article>
  );
}
