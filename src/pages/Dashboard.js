import React, { useState } from "react";
import "./pages.css";
import data from "../data";

function Dashboard() {
  const [logs, setLogs] = useState(data);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [newEntry, setNewEntry] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newId, setNewId] = useState(4);

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

  const handleEntry = (e, newEntry, newTitle) => {
    e.preventDefault();
    setNewId(newId + 1);
    let newItem = {
      id: newId,
      title: newTitle,
      entry: newEntry,
      timestamp: "February 23 2022, 17:17",
    };
    setLogs([...data, newItem]);
  };

  return (
    <section>
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
        <div className="dashboard-item">
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
          <>
            <form onSubmit={(e) => handleEntry(e, newEntry, newTitle, newId)}>
              <textarea
                onChange={(e) => setNewEntry(e.target.value)}
                className="dashboard-item"
                rows="10"
              />
              <input
                onChange={(e) => setNewTitle(e.target.value)}
                className="dashboard-item"
              />
              <button
                className="dashboard-item dashboard-clickable"
                type="submit"
              >
                Submit entry
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
