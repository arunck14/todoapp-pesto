import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const TaskModal = ({ task, onClose }) => {
  // Define a variable to hold the color class based on task status
  let statusColorClass = "";
  switch (task.status) {
    case "PENDING":
      statusColorClass = "bg-red-300";
      break;
    case "WIP":
      statusColorClass = "bg-blue-300";
      break;
    case "COMPLETED":
      statusColorClass = "bg-green-300";
      break;
    default:
      statusColorClass = "bg-gray-300"; // Default color if status is not recognized
  }

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        {/* Apply the status color class */}
        <h2 className={`w-fit px-4 py-1 rounded-lg ${statusColorClass}`}>
          {task.status}
        </h2>
        <h4 className="my-2 text-gray-500">{task._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{task.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{task.comments}</h2>
        </div>
        <p className="mt-4">NOTE :</p>
        <p className="my-2">
          Please update the status of this task accordingly without fail
        </p>
      </div>
    </div>
  );
};

export default TaskModal;
