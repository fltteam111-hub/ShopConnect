import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import Container from "../components/Container";
import { ThemeContext } from "../context/ThemeContext";

export default function Home() {
  const theme = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://shopconnect-api-production.up.railway.app/api/products")
      .then((response) => {
        if (!response.ok) throw new Error("Réponse API incorrecte");
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch(() => setError("API Laravel indisponible. Vérifiez que Laravel est lancé sur le port 8000."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <section className="panel">
        <h1>Bienvenue sur ShopConnect 🛒</h1>
        <p>Votre mini-application React commence ici.</p>
        <p>Thème fourni par useContext : <strong>{theme}</strong></p>
      </section>

      <Card title="Nos services">
        <ul>
          <li>Livraison rapide</li>
          <li>Support client 24/7</li>
          <li>Paiement sécurisé</li>
        </ul>
      </Card>

      <Card title="Produits de l'API Laravel (Phase 8)">
        {loading && <p>Chargement des produits...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <div className="card-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <h3>{product.title}</h3>
                <p>Prix : {product.price} DH</p>
                <p>Catégorie : {product.category}</p>
              </article>
            ))}
          </div>
        )}
      </Card>
    </Container>
  );
}
