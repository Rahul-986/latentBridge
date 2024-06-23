import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [id, setId] = useState(1);
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()},0.9)`;
  };

  const fetchBody = async (id) => {
    setLoading(true);
    try {
      const fetchedData = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const jsonData = await fetchedData.json();
      setBody(jsonData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBody(id);
  }, [id]);

  const RandomNumber = () => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    setId(randomId);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <div className={`App ${isDarkMode ? 'dark' : ''}`}>
        <button onClick={RandomNumber}>Click for Random Email</button>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        {loading ? (
          <p className="loader">Loading...</p>
        ) : (
          <ul>
            {body.map((body) => (
              <li key={body.id}>
                <div className="main-container">
                  <div className="icon" style={{ backgroundColor: color() }}>
                    {body.email.slice(0, 1)}
                  </div>
                  <div className="body">
                    <strong>{body.email}</strong>: {body.body}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default App;
