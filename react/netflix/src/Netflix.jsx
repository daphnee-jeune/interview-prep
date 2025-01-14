/**
 * Leverage this function to search for results that match a search term
 * @param string searchTerm
 * @returns Promise<string[]> List of search results wrapped in a promise
 */

// input
// suggestionsList => sugestion
function executeSearch(term) {
  // Don't change anything here. This is intended as a simple stub for an API call.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([term, `${term} bar`, `${term} foo`]);
    }, Math.floor(Math.random() * 3000));
  });
}

// Example of what executeSearch does:
// const searchResults = await executeSearch("cat");
// console.log(searchResults); // [“cat”, “cat bar”, “cat foo”]

const App = () => {
  const [userInput, setUserInput] = React.useState("");
  const [results, setResults] = React.useState({});
  const [error, setError] = React.useState({});
  const [isLoading, setIsLoading] = useState({});

  const handleChange = async (e) => {
    const value = e.target.value;
    setUserInput(value);
    try {
      setIsLoading({ [value]: true });
      setError({ [value]: null });
      const awaitedResults = await executeSearch(value);
      setResults({
        [value]: awaitedResults,
      });
      setIsLoading({ [value]: false });
    } catch (err) {
      setError({ [value]: err });
    }
  };

  return (
    <div>
      <input type="text" value={userInput} onChange={handleChange} />
      {isLoading && 'Loading...'}
      <ul>
        {results[userInput].map((result, i) => {
          return <li key={i}>{result}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
