import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://merne-app-backend1.onrender.com/api/items")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched items:", data);
        setItems(data);
      })
      .catch((err) => console.error("Failed to fetch items:", err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Items from MongoDB</h1>
      <ul>
        {items.length === 0 ? (
          <li>No items found</li>
        ) : (
          items.map((item) => <li key={item._id}>{item.name}</li>)
        )}
      </ul>
    </div>
  );
}

export default App;
