import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FaStar } from "react-icons/fa";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/tasks/${id}`)
      .then((response) => {
        setComments(response.data.comments);
        setStatus(response.data.status);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check the console.", {
          variant: "error",
        });
        console.log(error);
      });
  }, [id]);

  const handleEditTask = () => {
    const data = {
      title,
      comments,
      status,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/tasks/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Task edited successfully", { variant: "success" });
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
        <h1 className="text-3xl my-8">EDIT TASK</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-white rounded-xl w-[600px] p-4 mx-auto bg-white">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Comments</label>
          <input
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">--Select--</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditTask}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTask;
