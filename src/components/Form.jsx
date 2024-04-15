import CheckList from "../components/CheckList";
import ComplexButtons from "../components/ComplexButtons";
import DateInput from "../components/DateInput";
import PriorityButtons from "../components/PriorityButtons";
import Tags from "../components/Tags";
import TimeInput from "../components/TimeInput";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../Context/todoContext";
import { uid } from "uid";

function Form(props) {
  const [value, setValue] = useState(props.todo ? props.todo.text : "");
  const [checklistItems, setChecklistItems] = useState(
    props.todo ? props.todo.checklistItems : []
  );
  const [focusedItemId, setFocusedItemId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(props.todo ? props.todo.tags : []);
  const [tagValue, setTagValue] = useState(props.todo ? props.todo.tags : "");
  const [selectedPrio, setSelectedPrio] = useState(
    props.todo ? props.todo.selectedPrio : null
  );
  const [selectedComp, setSelectedComp] = useState(
    props.todo ? props.todo.selectedComp : null
  );
  const [date, setDate] = useState(props.todo ? props.todo.date : []);
  const [time, setTime] = useState(props.todo ? props.todo.time : []);
  const [amOrPm, setAmOrPm] = useState(props.todo ? props.todo.amOrPm : []);
  const { addTodo, updateTodoTags, todos, updateTodo, repeatTodo } = useTodo();
  const navigate = useNavigate();
  const { id } = useParams();
  const todo = todos.find((todo) => todo.id === id);

  const handleItemChange = (id, newValue) => {
    const updatedItems = checklistItems.map((item) =>
      item.id === id ? { ...item, value: newValue } : item
    );
    setChecklistItems(updatedItems);
  };
  const newCheckList = (inputValue) => {
    if (inputValue) {
      const newItem = { id: Date.now(), value: inputValue, isCompleted: false };
      setChecklistItems((prevItems) => [...prevItems, newItem]);
      setInputValue("");
    }
  };
  const handleFocus = (id) => {
    setFocusedItemId(id);
  };

  const handleBlur = () => {
    setFocusedItemId(null);
  };
  const deleteItem = (id) => {
    const filteredItems = checklistItems.filter((item) => item.id !== id);
    setChecklistItems(filteredItems);
  };
  const handleChange = (e, todoId) => {
    const newValue = e.target.value;
    setTagValue(newValue);
    const splitWords = newValue
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    setTags(splitWords);
    updateTodoTags(
      todoId,
      newValue.split(",").map((word) => word.trim())
    );
  };
  const handlePrio = (e) => {
    setSelectedPrio(+e.currentTarget.value);
  };
  const handleComp = (e) => {
    setSelectedComp(+e.currentTarget.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setTime(newTime);
    const hour = parseInt(newTime.split(":")[0], 10);
    const amPm = hour >= 12 && hour < 24 ? "PM" : "AM";
    setAmOrPm(amPm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    const newTodo = {
      text: value,
      dueDate: new Date(),
      isCompleted: false,
      id: uid(),
      tags,
      selectedPrio,
      selectedComp,
      date,
      time,
      amOrPm,
      checklistItems,
      progress: 0
    };
    addTodo(newTodo);
    setValue("");
    navigate("/");
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTodoData = {
      ...todo,
      text: value,
      tags,
      selectedPrio,
      selectedComp,
      date,
      time,
      amOrPm,
      checklistItems
    };
    updateTodo(id, updatedTodoData);
    navigate("/");
  };

  const handleRepeat = () => {
    const repeatedTodo = {
      text: value,
      isCompleted: false,
      id: uid(),
      tags,
      selectedPrio,
      selectedComp,
      date,
      time,
      amOrPm,
      checklistItems,
      progress: 0
    };
    repeatTodo(repeatedTodo);
    navigate("/");
  };

  return (
    <>
      <h3>Task Name</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            id="taskName"
            placeholder="Task Name"
            name="taskName"
          />
        </form>
      </div>
      <PriorityButtons selectedPrio={selectedPrio} handlePrio={handlePrio} />
      <ComplexButtons selectedComp={selectedComp} handleComp={handleComp} />
      <DateInput date={date} handleDateChange={handleDateChange} />
      <TimeInput time={time} handleTimeChange={handleTimeChange} />
      <CheckList
        inputValue={inputValue}
        focusedItemId={focusedItemId}
        newCheckList={newCheckList}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        deleteItem={deleteItem}
        setInputValue={setInputValue}
        checklistItems={checklistItems}
        handleItemChange={handleItemChange}
      />
      <Tags handleChange={handleChange} tags={tags} tagValue={tagValue} />
      {!props.todo && (
        <button onClick={handleSubmit} className="push-btn">
          + Save Task
        </button>
      )}
      {props.todo && (
        <div>
          <button onClick={handleEditSubmit} className="push-btn">
            + Save Edited Task
          </button>
          <button onClick={handleRepeat} className="push-btn green">
            + Repeat Task
          </button>
        </div>
      )}
    </>
  );
}
export default Form;
