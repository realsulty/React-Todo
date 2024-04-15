import { useParams, Link, useNavigate } from "react-router-dom";
import { useTodo } from "../Context/todoContext";
import { FaEdit, FaCheck } from "react-icons/fa";
import ArrowComp from "../components/ArrowComp";
import { uid } from "uid";

// This page is inside the Todo Details
const getDaysDifference = (dateString) => {
  if (!dateString) {
    return "No Date Set";
  }
  const today = new Date();
  const todoDate = new Date(dateString);
  const difference = todoDate - today;
  return difference / (1000 * 3600 * 24);
};

function getLabel(selected) {
  if (!selected) {
    return "Low";
  }
  if (selected > 5) {
    return "High";
  }
  if (selected === 5) {
    return "Moderate";
  }
  return "Low";
}
function getChecklistStatus(todo) {
  if (todo.checklistItems.length === 0) {
    return "Add Checklist";
  }
  if (todo.progress >= 0 && todo.progress < 100) {
    return "In Progress";
  }
  if (todo.progress === 100) {
    return "Task Complete";
  }
  return "No Progress";
}

function getProgressBarStyle(todo) {
  const width =
    todo.checklistItems.length > 0
      ? `${Number.isFinite(todo.progress) ? todo.progress : 0}%`
      : "0%";
  return { width };
}

function Todo() {
  const {
    todos,
    completeTodo,
    removeTodo,
    handleItemCompletion,
    repeatTodo
  } = useTodo();
  const { id } = useParams();
  const todo = todos.find((todo) => todo.id === id);
  const navigate = useNavigate();
  const itemLoop = todo.checklistItems.map((t) => t);
  const handleRepeat = () => {
    const repeatedTodo = {
      text: todo.text,
      isCompleted: false,
      id: uid(),
      tags: todo.tags,
      selectedPrio: todo.selectedPrio,
      selectedComp: todo.selectedComp,
      date: todo.date,
      time: todo.time,
      amOrPm: todo.amOrPm,
      checklistItems: itemLoop,
      progress: 0
    };
    repeatTodo(repeatedTodo);

    navigate("/");
  };
  const daysDifference = todo ? getDaysDifference(todo.date) : "Todo Not Found";
  function getColor(daysDifference) {
    if (daysDifference <= 3) {
      return "red";
    } else if (daysDifference <= 7) {
      return "orange";
    } else {
      return "black";
    }
  }
  const colorClass = getColor(daysDifference);

  if (!todo) return <div>No todo found</div>;

  return (
    <>
      <Link to="/">
        <ArrowComp />
      </Link>
      <div
        className={`card ${todo.isCompleted ? "completed" : "not-completed"}`}
      >
        <div className="mini-header">
          <Link to={`/edit/${todo.id}`}>
            <FaEdit className="edit-icon" />
          </Link>
          <FaCheck
            className={`check-icon ${
              todo.isCompleted ? "checked" : "check-icon"
            }`}
            onClick={() => completeTodo(todo)}
          />
        </div>
        <Link to={`/todo/${todo.id}`}>{todo.text}</Link>
        <div>
          <div>
            <p className={colorClass}>
              Due Date:{todo.date} {todo.time}
              {todo.amOrPm}
            </p>
          </div>
          <div>
            {todo.tags?.length > 0 &&
              todo.tags.map((tag) => <span className="tag">#{tag}</span>)}

            {
              <div key={todo.id}>
                <p>
                  Priority:
                  {getLabel(todo.selectedPrio)} ({+todo.selectedPrio}/10)
                </p>
              </div>
            }
            {
              <div>
                <p>
                  Complexity:
                  {getLabel(todo.selectedComp)} ({+todo.selectedComp}/10)
                </p>
              </div>
            }
          </div>

          <div className="flex">
            <p>{getChecklistStatus(todo)}</p>

            <p>
              {todo.checklistItems.length > 0 && Number.isFinite(todo.progress)
                ? `${todo.progress.toFixed()}%`
                : "No Progress"}
            </p>
          </div>

          <div className="progress-bar">
            <div className="bar-fill" style={getProgressBarStyle(todo)}></div>
          </div>
          <div className="flex col">
            {todo.checklistItems?.length > 0 &&
              todo.checklistItems.map((item) => (
                <div key={item.id}>
                  <input value={item.value} />
                  <button
                    className="check-btn"
                    onClick={() => handleItemCompletion(todo.id, item)}
                  >
                    {item.isCompleted ? "Undo" : `Done`}
                  </button>
                </div>
              ))}

            <Link to="/" className="delete" onClick={() => removeTodo(todo)}>
              Delete Task
            </Link>
            <button onClick={handleRepeat} className="push-btn green">
              + Repeat Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
