import React, { useMemo, useState } from "react";

export default function Cart() {
  const [price] = useState(100);
  const [qty, setQty] = useState(1);
  const total = useMemo(() => price * Math.max(0, qty), [price, qty]);

  return (
    <section className="panel">
      <h2>Calcul du total du panier</h2>
      <p>Prix unitaire : {price} $</p>
      <label>
        Quantité :
        <input type="number" min="0" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
      </label>
      <p><strong>Total : {total} $</strong></p>
    </section>
  );
}
