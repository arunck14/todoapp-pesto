import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveTask = () => {
    console.log("Title:", title);
    console.log("Comments:", comments);
    console.log("Status:", status);
    const data = {
      title,
      comments,
      status,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/tasks", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Task Created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };
  // Add an additional useEffect to listen for changes in the 'status' state
  useEffect(() => {
    // This will log the updated 'status' whenever it changes
    console.log(status);
  }, [status]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Task</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
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
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        {/* <div className="my-4"> */}
        {/* <label className="text-xl mr-4 text-gray-500">Status</label>
          <input
            type="text"
            value={status}
            onChange={(e) => {
              console.log("Selected status:", e.target.value);
              setStatus(e.target.value);
            }}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div> */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Status</label>
          <select
            value={status}
            onChangeCapture={(e) => {
              console.log("Selected status:", e.target.value);
              setStatus(e.target.value);
            }}
            className="border-2 border-gray-500 px-4 py-2  w-full"
          >
            <option value="">--Select--</option>
            <option value="PENDING">PENDING</option>
            <option value="WIP">WIP</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveTask}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
