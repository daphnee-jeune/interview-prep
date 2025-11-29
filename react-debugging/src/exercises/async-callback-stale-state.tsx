import { useState } from 'react'

const Scores = () => {
 const [scores, setScores] = useState([1, 2, 3])

 const addScoreAsync = () => {
  setTimeout(() => {
   // incorrect
   // setScores([...scores, scores.length + 1])
   // Correct
   setScores(prev => [...prev, prev.length + 1])
   console.log("here", scores)
  }, 1000)
 }
  return (
    <div>
      <button onClick={addScoreAsync}>Add</button>
      <div>{scores.join(', ')}</div>
    </div>
  )
}

export default Scores

// Symptom
// Click Add quickly multiple times, for example 3, and notice how the UI outputs, 1,2,3,4 instead of 1,2,3,4,5,6
// Diagnosis
// Reproduce the bug by quickly clicking on the button and observing the value
// Log out the scores value inside the timeout to confirm the stale value
// Spot red flags: async callback referencing scores + direct state update
// Fix
// Use functional state updates (safest for async work) to use the freshest state at execution time, not creating time
