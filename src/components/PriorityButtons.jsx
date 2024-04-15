import "../styles.css";
import PrioBtn from "./PrioBtn";

const PriorityButtons = ({ selectedPrio, handlePrio }) => {
  return (
    <>
      <h3>Select Priority Level</h3>
      <ul className="rating">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <PrioBtn
            key={value}
            value={value}
            handlePrio={handlePrio}
            selectedPrio={selectedPrio}
          />
        ))}
      </ul>
    </>
  );
};

export default PriorityButtons;
