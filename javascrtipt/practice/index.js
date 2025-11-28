// Data manipulation
// Given an array of transactions, return the total spending per category sorted by amount (descending).
const transactions = [
 { id: 1, category: 'Food', amount: 20 },
 { id: 2, category: 'Travel', amount: 100 },
 { id: 3, category: 'Food', amount: 50 },
 { id: 4, category: 'Utilities', amount: 75 },
];

const grouped = Obect.values(transactions.reduce((acc, curr) => {
 acc[curr.category] = acc[curr.category] || { category: curr.category, total: 0 },
 acc[curr.category].total += curr.amount
 return acc
}, {})
).sort((a,b) =>  b.total - a.total)

// Flatten array
// Given a nested array, return the flattened version 
const arr = [1, [2, [3, 4]], 5];
const flattenArr = arr => {
 if(!arr.length) return null
 let results = []
  arr.forEach(el => {
   if(Array.isArray(el)){
    return results.push(...flatten(el))
   } else {
    return results.push(el)
   }
  })
 return results
}