// EditableText.js
import React, { useState } from "react";

const EditableText = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  return (
    <div onEditItem={handleEditItem}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onSaveItem={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default EditableText;
