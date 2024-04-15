function PrioBtn({ handlePrio, selectedPrio, value }) {
  return (
    <>
      <li>
        <input
          type="radio"
          id={`num${value}`}
          name="rating"
          value={value}
          onChange={handlePrio}
          checked={selectedPrio === value}
        />
        <label htmlFor={`num${value}`}>{value}</label>
      </li>
    </>
  );
}

export default PrioBtn;
