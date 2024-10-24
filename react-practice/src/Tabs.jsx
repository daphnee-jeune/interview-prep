import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (idx) => setActiveTab(idx);
  return (
    <div>
      {children.map((child, idx) => {
        return (
          <button
            key={idx}
            onClick={() => handleTabClick(idx)}
            // disabled={activeTab === idx}
          >
            {child.props.label}
          </button>
        );
      })}
      <div>{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
