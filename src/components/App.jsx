import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { useEffect } from "react";

export default function App() {
  const [isEditing, setisEditing] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([items]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));

    setFilteredItems((filteredItems) =>
      filteredItems.filter((item) => item.id !== id)
    );

    console.log(filteredItems);
  }

  function handleEditItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
    setFilteredItems((filteredItems) =>
      filteredItems.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  }

  const handleChange = (id, description, quantity) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              description: description,
              quantity: quantity,
              isEditing: !item.isEditing,
            }
          : item
      )
    );
    setFilteredItems((items) =>
      filteredItems.map((item) =>
        item.id === id
          ? {
              ...item,
              description: description,
              quantity: quantity,
              isEditing: !item.isEditing,
            }
          : item
      )
    );
  };

  function handleFilter(filter) {
    let filteredItems = items;
    if (filter === "All") {
      setFilteredItems(items);
    } else {
      filter === "Packed"
        ? (filteredItems = items.filter((item) => item.packed))
        : (filteredItems = items.filter((item) => item.packed === false));
    }
    setFilteredItems(filteredItems);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItems(items) {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} onFilterItems={handleFilter} />
      <PackingList
        items={items}
        filteredItems={filteredItems}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
        onHandleChange={handleChange}
      />
      <Stats items={items} />
    </div>
  );
}
