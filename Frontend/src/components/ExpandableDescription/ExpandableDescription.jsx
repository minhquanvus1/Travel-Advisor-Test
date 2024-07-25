import React, { useState, useEffect } from "react";
import "./ExpandableDescription.css";

const ExpandableDescription = ({ text, lineClamp = 3 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  useEffect(() => {
    setShowReadMoreButton(text.length > 100);
  }, []);
  return (
    <div className="description">
      <p
        className={isOpen ? "expanded" : ""}
        style={{ WebkitLineClamp: lineClamp }}
      >
        {text}
      </p>
      {showReadMoreButton && (
        <div onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <div className="expand-button">
              <p>Read less</p>
              <i className="fas fa-chevron-up"></i>
            </div>
          ) : (
            <div className="expand-button">
              <p>Read more</p>
              <i className="fas fa-chevron-down"></i>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandableDescription;
