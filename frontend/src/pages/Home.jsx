import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import TasksTable from "../components/home/TasksTable";
import TaskCard from "../components/home/TaskCard";
import { FaStar } from "react-icons/fa";

const Home = () => {
  const [tasks, settasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/tasks")
      .then((response) => {
        settasks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 relative">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none">
        <div className="text-8xl text-gray-200 font-bold opacity-20">PESTO</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaStar
            style={{ color: "gold", marginRight: "0.5rem", fontSize: "1.5rem" }}
          />
          <h1 className="text-3xl my-8">Tasks List</h1>
        </div>
        <Link to="/tasks/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <TasksTable tasks={tasks} />
      ) : (
        <TaskCard tasks={tasks} />
      )}
    </div>
  );
};

export default Home;
