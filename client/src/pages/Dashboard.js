import React, { useEffect, useState } from "react";
import "./pages.css";
import data from "../data";
import axios from "axios";
import { TbTrash, TbEdit } from "react-icons/tb";

function Dashboard() {
  const [logs, setLogs] = useState(data);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [currentId, setCurrentId] = useState("");
  const [newEntry, setNewEntry] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://my-log-jnwg.onrender.com/api/v1/tasks/"
      );
      setLogs(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async () => {
    try {
      await axios.post("https://my-log-jnwg.onrender.com/api/v1/tasks/", {
        id: "5",
        title: newTitle,
        entry: newEntry,
        timestamp: "February 27 2023, 20:42",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const patchData = async (e, _id) => {
    try {
      await axios.patch(
        "https://my-log-jnwg.onrender.com/api/v1/tasks/" + _id,
        {
          title: newTitle,
          entry: newEntry,
          timestamp: "March 2 2023, 06:17",
        }
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e, _id) => {
    e.preventDefault();
    try {
      await axios.delete(
        "https://my-log-jnwg.onrender.com/api/v1/tasks/" + _id
      );
      fetchData();
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
    if (isEditing) {
      patchData(e, currentId);
    } else {
      let newItem = {
        title: newTitle,
        entry: newEntry,
        timestamp: "February 23 2022, 17:17",
      };
      setLogs([...logs, newItem]);
      postData();
    }
  };

  let index = 0;

  return (
    <section>
      {/* LIST OF LOG ENTRIES */}
      <div className="dashboard-container">
        <h1>My log: </h1>
        {logs.map((item) => {
          const { _id, title, entry, timestamp } = item;
          index += 1;
          return (
            <div key={index} className="dashboard-item">
              {index}:
              <button
                className="dashboard-clickable"
                onClick={(e) => {
                  setIsDisplaying(true);
                  setCurrentId(_id);
                  handleClick(e, entry, title);
                }}
              >
                {title}
              </button>
              : {timestamp} :{" "}
              <button
                className="dashboard-clickable"
                onClick={(e) => handleDelete(e, _id)}
              >
                <TbTrash />
              </button>
              <button
                className="dashboard-clickable"
                onClick={(e) => {
                  setNewEntry(entry);
                  setNewTitle(title);
                  setCurrentId(_id);
                  setIsDisplaying(false);
                  setIsEditing(true);
                }}
              >
                <TbEdit />
              </button>
            </div>
          );
        })}
        {/* CREATE NEW ENTRY */}
        <div className="dashboard-item">
          <button
            className="dashboard-clickable"
            onClick={() => {
              setIsDisplaying(false);
              setIsEditing(false);
              setNewEntry("");
              setNewTitle("");
              setCurrentEntry(null);
            }}
          >
            Create entry
          </button>
        </div>
      </div>

      {/* SECOND BOX */}
      <div className="dashboard-container">
        {isDisplaying ? (
          // DISPLAYING LOG ENTRY
          <>
            <h1>
              Entry: {newTitle}{" "}
              <button
                className="dashboard-clickable"
                onClick={(e) => {
                  setIsDisplaying(false);
                  setIsEditing(true);
                  setNewEntry(currentEntry);
                  setNewTitle(newTitle);
                }}
              >
                <TbEdit />
              </button>
            </h1>
            {currentEntry}
          </>
        ) : (
          // DISPLAYING EDIT/CREATE BOX
          <>
            <div className="dashboard-entry">
              <h1>
                <label>
                  Entry:{" "}
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="dashboard-entry-input"
                  />
                </label>
              </h1>
            </div>
            <form onSubmit={(e) => handleEntry(e, newEntry, newTitle)}>
              <textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                className="dashboard-item"
                rows="10"
              />
              <button
                className="dashboard-item dashboard-clickable"
                type="submit"
                style={{ width: "300px" }}
              >
                {isEditing ? "Edit entry" : "Create new entry"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
