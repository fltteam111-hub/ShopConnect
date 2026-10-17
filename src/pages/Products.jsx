import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) throw new Error("Erreur API");
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(() => setError("Impossible de charger les produits depuis FakeStoreAPI."));
  }, []);

  const handleFilter = () => {
    let result = [...products];
    if (search.trim() !== "") {
      result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (minPrice !== "") result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice !== "") result = result.filter((p) => p.price <= Number(maxPrice));
    setFilteredProducts(result);
  };

  return (
    <section className="panel">
      <h2>Nos produits</h2>
      <div className="filters">
        <h4>Filtres</h4>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un produit..." />
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Prix min" />
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Prix max" />
        <button onClick={handleFilter}>Filtrer</button>
      </div>
      {error && <p className="error">{error}</p>}
      {!error && filteredProducts.length === 0 ? <p>Aucun produit trouvé ou chargement en cours.</p> : (
        <div className="card-grid">
          {filteredProducts.map((p) => (
            <article className="product-card" key={p.id}>
              <img src={p.image} alt={p.title} />
              
              <h3><Link to={`/products/${p.id}`}>{p.title}</Link></h3>

              <p>{p.price} $</p>
            </article>
          ))}
        </div>
      )}
      <Outlet />
    </section>
  );
}
