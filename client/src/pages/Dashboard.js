import React, { useState } from "react";
import "./pages.css";
import data from "../data";
import axios from "axios";

function Dashboard() {
  const [logs, setLogs] = useState(data);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [newEntry, setNewEntry] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newId, setNewId] = useState(4);

  const fetchData = async () => {
    try {
      const response = await axios("http://localhost:5000/api/v1/tasks/");
      console.log(response);
      console.log(response.data.tasks[0]);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();

  const handleClick = (e, entry, title, id) => {
    e.preventDefault();
    setNewTitle(title);
    console.log(newTitle);
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
    setLogs([...logs, newItem]);
  };

  return (
    <section>
      <div className="dashboard-container">
        <h1>My log: </h1>
        {logs.map((item) => {
          const { id, title, entry, timestamp } = item;
          return (
            <div key={id} className="dashboard-item">
              {id}:
              <button
                className="dashboard-clickable"
                onClick={(e) => handleClick(e, entry, title, id)}
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
        <h1>Entry: {newTitle}</h1>
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
