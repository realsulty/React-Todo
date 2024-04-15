function ComplexBtn({ handleComp, selectedComp, value }) {
  return (
    <>
      <li>
        <input
          type="radio"
          id={`complex-num${value}`}
          name="complex"
          value={value}
          onChange={handleComp}
          checked={selectedComp === value}
        />
        <label htmlFor={`complex-num${value}`}>{value}</label>
      </li>
    </>
  );
}

export default ComplexBtn;
