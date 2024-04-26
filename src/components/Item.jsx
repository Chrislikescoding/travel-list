// export default function Item({ item, onDeleteItem, onToggleItem, onEditItem }) {
//   return (
//     <li>
//       <button onClick={() => onEditItem(item.id)}>
//         {item.isEditing ? "SAVE" : "EDIT"}
//       </button>
//       <input
//         type="checkbox"
//         value={item.packed}
//         onChange={() => onToggleItem(item.id)}
//       />
//       <span style={item.packed ? { textDecoration: "line-through" } : {}}>
//         {item.quantity} {item.description}
//       </span>
//       <span style={item.iseditable ? { textDecoration: "underline" } : {}}>
//         {item.quantity} {item.description}
//       </span>
//       <button onClick={() => onDeleteItem(item.id)}>❌</button>
//     </li>
//   );
// }
import { useState } from "react";
export default function Item({
  item,
  filter,
  onDeleteItem,
  onToggleItem,
  onEditItem,
  onHandleChange,
}) {
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <li>
      {!item.isEditing ? (
        <button type="li button" onClick={() => onEditItem(item.id)}>
          EDIT
        </button>
      ) : (
        <button
          type="li button"
          onClick={() => onHandleChange(item.id, description, quantity)}
        >
          SAVE
        </button>
      )}

      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      {item.isEditing ? (
        <div>
          <input
            type="short"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
          <input
            type="edit"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      ) : (
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
          <button onClick={() => onDeleteItem(item.id, filter)}>❌</button>
        </span>
      )}
    </li>
  );
}
