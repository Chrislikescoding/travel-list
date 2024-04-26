import Item from "./Item";
import { useState } from "react";

export default function PackingList({
  filteredItems,
  items,
  onDeleteItem,
  onEditItem,
  onToggleItem,
  onClearItems,
  onHandleChange,
  onHandleFilter,
  onFilterItems,
}) {
  const [sortBy, setSortby] = useState("input");

  if (filteredItems !== undefined && filteredItems.length > 0) {
    items = filteredItems;
  }
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            onEditItem={onEditItem}
            onHandleChange={onHandleChange}
            onHandleFilter={onHandleFilter}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  );
}
