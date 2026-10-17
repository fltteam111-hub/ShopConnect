
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const API_URL =
  "https://shopconnect-api-production.up.railway.app/api/products";

// Images from the internet
const productImages = {
  1: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  2: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
  3: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur API");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch(() =>
        setError("Impossible de charger les produits depuis Laravel.")
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMin =
      minPrice === "" || Number(product.price) >= Number(minPrice);

    const matchesMax =
      maxPrice === "" || Number(product.price) <= Number(maxPrice);

    return matchesSearch && matchesMin && matchesMax;
  });

  return (
    <section className="panel">
      <h2>Nos produits</h2>

      <div className="filters">
        <h4>Rechercher et filtrer</h4>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un produit..."
        />

        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Prix minimum (DH)"
        />

        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Prix maximum (DH)"
        />
      </div>

      {loading && <p>Chargement des produits...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p>Aucun produit trouvé.</p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="card-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="product-image-link"
              >
                <img
                  className="product-list-image"
                  src={productImages[product.id]}
                  alt={product.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </Link>

              <h3>
                <Link to={`/products/${product.id}`}>
                  {product.title}
                </Link>
              </h3>

              <p className="product-list-price">
                {product.price} DH
              </p>

              <p>Catégorie : {product.category}</p>

              <Link
                to={`/products/${product.id}`}
                className="product-details-button"
              >
                Voir les détails
              </Link>
            </article>
          ))}
        </div>
      )}

      <Outlet />
    </section>
  );
}
