const DateInput = ({ handleDateChange, date }) => {
  return (
    <div>
      <label htmlFor="dateInput">Select a date:</label>
      <input
        type="date"
        id="dateInput"
        value={date}
        onChange={handleDateChange}
      />
      {date && <p>Selected Dateddd: {date}</p>}
    </div>
  );
};

export default DateInput;
