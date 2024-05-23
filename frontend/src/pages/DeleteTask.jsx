import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FaStar } from "react-icons/fa";

const DeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTask = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/tasks/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Task Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check the console.", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#850F8D" }}>
      <BackButton />
      <div className="flex items-center">
        <FaStar
          style={{ color: "gold", marginRight: "0.5rem", fontSize: "1.5rem" }}
        />
        <h1 className="text-3xl my-8">DELETE TASK</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-white rounded-xl w-[600px] p-8 mx-auto bg-white">
        <h3 className="text-2xl">Are You Sure You want to delete this task?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteTask}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteTask;
