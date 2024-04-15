import ComplexBtn from "./ComplexBtn";
import "../styles.css";

const ComplexButtons = ({ handleComp, selectedComp }) => {
  return (
    <>
      <h3>Select Complexity Level</h3>
      <ul className="rating">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <ComplexBtn
            key={value}
            value={value}
            handleComp={handleComp}
            selectedComp={selectedComp}
          />
        ))}
      </ul>
    </>
  );
};

export default ComplexButtons;
