import React, { useRef, useEffect } from "react";
import "./data-table.js";

const columns = [
  { label: "Name", key: "name" },
  { label: "Role", key: "role" },
  { label: "Location", key: "location" },
];
const rows = [
 { name: 'Daphnée Jeune', role: 'UI Engineer', location: 'Houston' },
 { name: 'Maya Patel', role: 'Designer', location: 'Toronto' },
 { name: 'Kenji Watanabe', role: 'PM', location: 'Tokyo' },
];
const App = () => {
  const ref = useRef();

  useEffect(() => {
   if(ref.current){
    ref.current.data = { columns, rows } // pass props to custom element
   }
  },[])
  return (
   <div style={{ padding: '2rem' }}>
    <h1>Data table</h1>
    <data-table ref={ref}></data-table>
   </div>
  );
};

export default App;
