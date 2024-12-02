import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ReactTransitionCss.css";

export default function ReactTransitionGroup() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const addItem = () => {
    if (inputValue.trim() === "") return;
    setItems((prevItems) => [...prevItems, inputValue]);
    setInputValue("");
  };

  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>React Transition Group Example</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add an item"
        />
        <button onClick={addItem}>Add</button>
      </div>
      <TransitionGroup component="ul">
        {items.map((item, index) => (
          <CSSTransition key={index} timeout={300} classNames="fade">
            <li>
              {item} <button onClick={() => removeItem(index)}>Remove</button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div>
        <button onClick={handleOpen}>
          {open ? "Close Modal" : "Open Modal"}
        </button>
        <CSSTransition in={open} timeout={300} classNames="fade" unmountOnExit>
          <div className="modal">
            <div className="modal-content">
              <h2>Modal Opened with React Transitions</h2>
              <button onClick={handleOpen}>Close</button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
