import { useTodo } from "../Context/todoContext";

const TimeInput = ({ handleTimeChange, time }) => {
  const {} = useTodo();

  return (
    <div>
      <label htmlFor="timeInput">Select a time:</label>
      <input
        type="time"
        id="timeInput"
        value={time}
        onChange={handleTimeChange}
      />
    </div>
  );
};

export default TimeInput;
