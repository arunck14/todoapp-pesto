import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import ShowTask from "./pages/ShowTask";
import EditTask from "./pages/EditTask";
import DeleteTask from "./pages/DeleteTask";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks/create" element={<CreateTask />} />
      <Route path="/tasks/details/:id" element={<ShowTask />} />
      <Route path="/tasks/edit/:id" element={<EditTask />} />
      <Route path="/tasks/delete/:id" element={<DeleteTask />} />
    </Routes>
  );
};

export default App;
