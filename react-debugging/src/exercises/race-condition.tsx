import { useState, useEffect } from 'react'

const UseProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState(null);
  // incorrect
  useEffect(() => {
   fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => setUser(data))
  }, []) // <= empty dep array
  
  return (
    <div>
      {user && user.name}
    </div>
  )
}

// Correct implementation
const UseProfilee = ({ userId }: { userId: string }) => {
 const [user, setUser] = useState(null);
 const [error, setError] = useState(null);
 // incorrect
 useEffect(() => {
  const controller = new AbortController(); // <= cancels the previous request as soon as a new one starts
  setUser(null) // reset while loading
  setError(null)

  fetch(`/api/users/${userId}`, { signal: controller.signal })
   .then(res => {
    if(!res.ok) throw new Error("Network error")
    return res.json()
   })
   .then(data => setUser(data))
   .catch(err => {
    if(err.name === 'AbortError') return // <= expected on unmount / cancel
    setError(err.message || 'Fetch error')
   })

   return () => controller.abort() // <= cancel prev request on userId change / unmount
 }, [userId]) // <= keeps track of the value changing
 
 if(error) return <div>Error: {error}</div>
 return (
   <div>
     {user && user.name}
   </div>
 )
}

export default UseProfile
// Symptom
// if userId prop changes (e.g., user navigates between profiles), component keeps showing previous user or never updates
// Diagnosis
// Reproduce the error by updating the prop value and noticing the it still shows old data
// Check the network tab and notice that only the first network request is made
// This is because the useEffect renders the data onMount, but never updates because what it depends on is missing in the dependency array
// Fix: add dependencies (in our case userId) in the array AND add cancellation to avoid showing outdated responses when requests resolve out of order
// AbortController cancels earlier inflight requests so a late response from an old request doesn't overwrite the newer result — preventing race conditions
