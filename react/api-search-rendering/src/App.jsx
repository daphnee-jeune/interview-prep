import { useState, useEffect } from "react";
import Product from "./Product";
import "./App.css";

const url = "https://dummyjson.com/products";

const App = () => {
  const [products, setProducts] = useState([]); // State for storing the list of all products
  const [selectedImage, setSelectedImage] = useState(""); // State for the currently selected image
  const [searchVal, setSearchVal] = useState(""); // State for the search input value
  const [filteredResults, setFilteredResults] = useState([]); // State for the filtered list of products

  useEffect(() => {
    // Fetches product data from the API on component mount
    const fetchResults = async () => {
      const results = await fetch(url);
      const json = await results.json();
      setProducts(json.products);
      setFilteredResults(json.products);
      setSelectedImage(json.products[0].images[0]); // Sets the first image as the selected image by default
    };
    fetchResults();
  }, []);

  const onProductClick = (product) => {
    // Updates the selected image when a product is clicked
    setSelectedImage(product.images[0]);
  };

  const handleSearch = (e) => {
    // Updates the search value and filters the product list based on the search input
    const val = e.target.value;
    setSearchVal(val);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <div style={{ width: 500, margin: "0 auto" }}>
      <div style={{ width: "100%" }}>
        <img
          src={selectedImage}
          alt="Selected Product"
          style={{ width: "100%", height: 200 }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <input
          type="text"
          placeholder="Search"
          value={searchVal}
          onChange={handleSearch}
        />
      </div>

      <div style={{ width: "100%" }}>
        {filteredResults.map((product, idx) => (
          <Product
            key={idx}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
};


// rankAccounts(){
//   const rankedAccounts = Array.from(this.account.values()).sort((a, b) => b.transactionValue - a.transactionValue)
  
//   return rankedAccounts.map(account => ({
//     name: account.name,
//     transactionValue: account.transactionValue,
//   }))
// }
// scheduleTransfers(transferId, sourceAccountName, destinationAccountName, amount){
//   if(this.scheduledTransfers.find(transfer => transfer.transferId === transferId)){
//     throw new Error(`Transfer ${transferId} has already been scheduled.`)
//   }
//   if(!this.accountNames.has(sourceAccountName) || !this.accountNames.has(destinationAccountName)){
//     return null
//   }
//   if(amount < 0){
//     throw new Error(`Transfer amount must be greater than 0.`)
//   }
//   const sourceAccountId = this.accountNames.get(sourceAccountName)
//   const sourceAccount = this.accounts.get(sourceAccountId)
  
//   const destinationAccountId = this.accountNames.get(destinationAccountName)
//   const destinationAccount = this.accounts.get(destinationAccountId)
  
//   if(sourceAccount.balance < amount){
//     this.scheduleTransfers.push({
//       transferId,
//       sourceAccountName,
//       destinationAccountName,
//       amount,
//       status: 'failed',
//       timestamp: Date.now()
//     })
//     return failed
//   }
//   // process transfer
//   sourceAccount.balance -= amount
//   destinationAccount.balance += amount
//   sourceAccount.transactionValue += amount
//   destinationAccount.transactionValue += amount
  
//   this.scheduledTransfers.push({
//     transferId,
//     sourceAccountName,
//     destinationAccountName,
//     amount,
//     status: 'completed',
//     timestamp: Date.now()
//   })
//   return 'completed'
// }
// checkTransferStatus(transferId){
//   const transfer = this.scheduledTransfers.find(transfer => transfer.transferId === transferId)
//   if(!transfer){
//     return null
//   }
//   return transfer.status
// }


// transfer(transactionId, sourceAccountName, destinationAccountName, amount) {
//   if (this.transactions.has(transactionId)) {
//     throw new Error(`Transaction ${transactionId} has already been processed.`);
//   }
//   if (!this.accountNames.has(sourceAccountName) || !this.accountNames.has(destinationAccountName)) {
//     throw new Error(`One or both accounts do not exist.`);
//   }
//   if (amount <= 0) {
//     throw new Error(`Transfer amount must be greater than 0.`);
//   }

//   const sourceAccountId = this.accountNames.get(sourceAccountName);
//   const destinationAccountId = this.accountNames.get(destinationAccountName);

//   const sourceAccount = this.accounts.get(sourceAccountId);
//   const destinationAccount = this.accounts.get(destinationAccountId);

//   if (sourceAccount.balance < amount) {
//     throw new Error(`Insufficient funds in source account.`);
//   }

//   sourceAccount.balance -= amount;
//   destinationAccount.balance += amount;


//   sourceAccount.transactionValue += amount;
//   destinationAccount.transactionValue += amount;

//   this.transferCounter += 1;
//   const transferId = `transfer${this.transferCounter}`;

//   this.transactions.add(transactionId);
//   return transferId;
// }

export default App;