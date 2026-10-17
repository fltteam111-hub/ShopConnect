import React, { useRef } from "react";

export default function SearchBar() {
  const inputRef = useRef(null);
  return (
    <div className="search-row">
      <input ref={inputRef} placeholder="Tapez pour rechercher..." aria-label="Recherche de démonstration" />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </div>
  );
}
