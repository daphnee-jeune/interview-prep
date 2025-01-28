import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api_endpoint =
      "https://api.github.com/search/repositories?q=stars:>25000&sort=stars&order=desc";

    const fetchData = () => {
      fetch(api_endpoint)
        .then((res) => res.json())
        .then((res) => {
          setRepos(res.items);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const repoList =
    !loading &&
    repos.map((repo) => {
      return (
        <div key={repo.id} className="repo">
          <div key={Math.random(Math.floor() * 10)} className="repo_name">
            {repo.name}
          </div>
          <div className="stargazers__count">{repo.stargazers__count}</div>
        </div>
      );
    });

  return <>{repoList}</>;
}

export default App;
