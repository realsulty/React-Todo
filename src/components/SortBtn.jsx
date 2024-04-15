function SortBtn({ handleSortChange, selectedSortOption }) {
  const sortingList = [
    "Ascending Date",
    "Descending Date",
    "Ascending Complexity",
    "Descending Complexity",
    "Ascending Priority",
    "Descending Priority",
    "Default"
  ];

  return (
    <>
      {sortingList.map((el) => (
        <div className="heunou">
          <p>{el}</p>
          <input
            type="radio"
            value={el}
            checked={selectedSortOption === `${el}`}
            onChange={handleSortChange}
          />
        </div>
      ))}
    </>
  );
}
export default SortBtn;
