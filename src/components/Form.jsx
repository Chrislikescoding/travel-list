import { useState } from "react";
import { useEffect } from "react";

export default function Form({ onAddItems, onFilterItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    onFilterItems(filter);
  }, [filter]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p>
        Items to display:
        <input
          type="radio"
          name="Display"
          value="Packed"
          id="Packed"
          onChange={() => {
            setFilter("Packed");
          }}
        />
        <label htmlFor="Packed">Packed </label>
        <input
          type="radio"
          name="Display"
          value="Not packed"
          id="Not packed"
          onChange={() => setFilter("Not packed")}
        />
        <label htmlFor="Not packed">Not packed </label>
        <input
          type="radio"
          name="Display"
          value="All"
          id="All items"
          onChange={(e) => setFilter("All")}
        />
        <label htmlFor="All items">All items </label>
      </p>
      <button>Add</button>
    </form>
  );
}
