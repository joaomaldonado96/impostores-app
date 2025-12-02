import React, { useState } from "react";

export default function CategorySelector({ categories, value, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (cat) => {
    onChange(cat);
    setOpen(false);
  };

  return (
    <div className="custom-select">
      <div className="selected" onClick={() => setOpen(!open)}>
        {value}
        <span className={`arrow ${open ? "open" : ""}`}>▼</span>
      </div>

      {open && (
        <div className="options">
          {categories.map((cat) => (
            <div
              key={cat}
              className={`option ${cat === value ? "selected-option" : ""}`}
              onClick={() => handleSelect(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}