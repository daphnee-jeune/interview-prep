import { useState } from "react";
import "./App.css";

const transactions = [
  { id: "t_101", customer: "Alice Anderson", amount: 84 },
  { id: "t_102", customer: "Bob Brown", amount: 30 },
  { id: "t_103", customer: "Carla Carter", amount: 42 },
  { id: "t_104", customer: "David Davis", amount: 26 },
  { id: "t_105", customer: "Evelyn Edwards", amount: -84 },
  { id: "t_106", customer: "Frank Foster", amount: 48 },
  { id: "t_107", customer: "Gina Green", amount: 104 },
  { id: "t_108", customer: "Henry Harris", amount: 140 },
  { id: "t_109", customer: "Ivy Ingram", amount: 10 },
  { id: "t_110", customer: "Jack Johnson", amount: 60 },
  { id: "t_111", customer: "Kara King", amount: -26 },
  { id: "t_112", customer: "Liam Lee", amount: -140 },
  { id: "t_113", customer: "Mia Martin", amount: 26 },
  { id: "t_114", customer: "Nina Nelson", amount: 44 },
];

function App() {
  const [userInput, setUserInput] = useState("");

  // Filter transactions based on user input
  const filteredList = transactions.filter((transaction) =>
    transaction.customer.toLowerCase().includes(userInput.toLowerCase())
  );

  // Object to hold the total amount per customer
  let customersTotal = {};

  // Calculate total amount per customer from the filtered list
  filteredList.forEach((transaction) => {
    const { customer, amount } = transaction;
    if (!customersTotal[customer]) {
      customersTotal[customer] = amount; // Initialize if customer does not exist
    } else {
      customersTotal[customer] += amount; // Add amount if customer already exists
    }
  });

  // Find max transaction total across all customers
  const maxTotal = Math.max(...Object.values(customersTotal));
  // Identify the cusomer(s) with the max transaction total
  const topCustomers = Object.keys(customersTotal).filter((customer) => {
    return (customersTotal[customer] = maxTotal);
  });
  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <ul>
        {filteredList.map((transaction) => (
          <li
            key={transaction.id}
            style={{
              backgroundColor: topCustomers.includes(transaction.customer)
                ? "yellow"
                : "transparent",
            }}
          >
            {transaction.customer}: {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
