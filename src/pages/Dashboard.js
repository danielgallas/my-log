import React, { useState } from "react";
import "./pages.css";
import data from "../data";

function Dashboard() {
  const [logs, setLogs] = useState(data);
  const [currentEntry, setCurrentEntry] = useState(null);

  // const getData = async () => {
  //   try {
  //     const response = await fetch(url);
  //     const data = response.json();
  //     setData(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(data);

  // useEffect(() => {
  //   getData();
  // }, []);

  const handleClick = (e, entry) => {
    e.preventDefault();
    setCurrentEntry(entry);
    return;
  };

  return (
    <>
      <div className="dashboard-container dashboard-list">
        <h1>My log: </h1>
        {logs.map((item) => {
          const { id, title, entry, timestamp } = item;
          return (
            <div key={id} className="dashboard-item">
              {id}:
              <button
                className="dashboard-clickable"
                onClick={(e) => handleClick(e, entry)}
              >
                {title}
              </button>
              : {timestamp}
            </div>
          );
        })}
        <div className="dashboard-item" style={{ "text-align": "center" }}>
          <button
            className="dashboard-clickable"
            onClick={() => setCurrentEntry(null)}
          >
            Create entry
          </button>
        </div>
      </div>
      <div className="dashboard-container">
        <h1>Entry:</h1>
        {currentEntry ? (
          currentEntry
        ) : (
          <textarea className="dashboard-item"></textarea>
        )}
      </div>
    </>
  );
}

export default Dashboard;
