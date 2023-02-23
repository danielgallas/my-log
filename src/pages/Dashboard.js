import React, { useState } from "react";
import "./pages.css";
import data from "../data";

function Dashboard() {
  const [logs, setLogs] = useState(data);
  const [search, setSearch] = useState(null);
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
    setSearch(entry);
    console.log(entry);
    return;
  };

  return (
    <>
      <div className="dashboard-container">
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
      </div>
      <div className="dashboard-container">
        Entry: {search}
        {logs.find((item) => item.id === search)}
      </div>
    </>
  );
}

export default Dashboard;
