import React from "react";

const Square = ({ onClick, value }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "60px",
        height: "60px",
        float: "left",
        margin: "1px",
        fontSize: "24px",
      }}
    >
      {value}
    </button>
  );
};

export default Square;
