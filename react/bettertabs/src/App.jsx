import React from "react";
import Tabs from "./Tabs";
import Tab from "./Tab";
function App() {
  return (
    <Tabs>
      <Tab label="Tab 1">
        <h1>Tab 1</h1>
        <p>Content for Tab 1</p>
      </Tab>
      <Tab label="Tab 2">
        <h1>Tab 2</h1>
        <p>Content for Tab 2</p>
      </Tab>
    </Tabs>
  );
}

export default App;
