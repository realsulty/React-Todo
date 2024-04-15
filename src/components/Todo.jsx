import { Link } from "react-router-dom";
import { useTodo } from "../Context/todoContext";
import { FaEdit, FaCheck } from "react-icons/fa";
import { useEffect } from "react";

// this is the indivsial Tasks

function Todo({ todo }) {
  const { completeTodo, removeTodo, todos, progress } = useTodo();

  const getDaysDifference = (dateString) => {
    const today = new Date();
    const todoDate = new Date(dateString);
    const difference = todoDate - today;
    return difference / (1000 * 3600 * 24);
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

  function updateCircleProgress(todoId, progress) {
    const circle = document.getElementById(`progress-circle-${todoId}`);
    const text = document.getElementById(`progress-text-${todoId}`);
    if (circle && text) {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      circle.style.strokeDasharray = `${circumference} `;
      function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
      }
      setProgress(progress);
      function getCircleStrokeColor(todo) {
        if (todo.id === todoId) {
          if (todo.checklistItems.length === 0 || todo.progress === 0) {
            text.textContent = "0%";
            return "lightgrey";
          }
          if (todo.progress > 0 && todo.progress < 100) {
            text.textContent = `${Math.round(progress)}%`;
            return "royalblue";
          }

          if (todo.progress === 100) {
            text.textContent = `${Math.round(progress)}%`;
            return "#00B348";
          }
          text.textContent = "0%";
        }
      }
      const strokeColor = getCircleStrokeColor(todo);
      circle.style.stroke = strokeColor;
    }
  }

  const calculateStrokeOffset = (progress) => {
    const circumference = 125.6;
    return circumference - (progress / 100) * circumference;
  };
  useEffect(() => {
    todos.forEach((todo) => {
      updateCircleProgress(todo.id, todo.progress);
    });
  }, []);
  return (
    <div className={`card ${todo.isCompleted ? "completed" : "not-completed"}`}>
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
          <p>
            Priority:
            {getLabel(todo.selectedPrio)} ({+todo.selectedPrio}/10)
          </p>
          <p>
            Complexity:
            {getLabel(todo.selectedComp)} ({+todo.selectedComp}/10)
          </p>
          {todo.tags.map((tag) => (
            <span key={tag} className="tag m-t ">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex m-t base">
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="lightgrey"
              strokeWidth="5"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              className="circle"
              strokeWidth="5"
              strokeDashoffset={calculateStrokeOffset(progress)}
              id={`progress-circle-${todo.id}`}
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="12px"
              id={`progress-text-${todo.id}`}
            ></text>
          </svg>
          <Link to="/" className="delete" onClick={() => removeTodo(todo)}>
            Delete Task
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Todo;
