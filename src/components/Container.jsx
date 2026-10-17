import React from "react";

export default function Container({ children }) {
  return <div style={{ padding: "4px", minHeight: "60vh" }}>{children}</div>;
}
