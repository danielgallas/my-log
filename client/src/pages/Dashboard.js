import React, { useEffect, useState } from "react";
import "./pages.css";
import data from "../data";
import axios from "axios";

function Dashboard() {
  const [logs, setLogs] = useState(data);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [newEntry, setNewEntry] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/tasks/");
      setLogs(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/tasks/", {
        id: "5",
        title: newTitle,
        entry: newEntry,
        timestamp: "February 27 2023, 20:42",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (e, entry, title) => {
    e.preventDefault();
    setNewTitle(title);
    setCurrentEntry(entry);
    return;
  };

  const handleEntry = (e, newEntry, newTitle) => {
    e.preventDefault();
    let newItem = {
      title: newTitle,
      entry: newEntry,
      timestamp: "February 23 2022, 17:17",
    };
    setLogs([...logs, newItem]);
    postData();
  };

  let index = 0;

  return (
    <section>
      <div className="dashboard-container">
        <h1>My log: </h1>
        {logs.map((item) => {
          const { title, entry, timestamp } = item;
          index += 1;
          return (
            <div key={index} className="dashboard-item">
              {index}:
              <button
                className="dashboard-clickable"
                onClick={(e) => handleClick(e, entry, title)}
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
            onClick={() => {
              setNewTitle("");
              setCurrentEntry(null);
            }}
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
            <form onSubmit={(e) => handleEntry(e, newEntry, newTitle)}>
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
