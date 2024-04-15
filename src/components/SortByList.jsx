import { useTodo } from "../Context/todoContext";
import { useState, useEffect } from "react";
import SortBtn from "./SortBtn";

function SortByList({ show, setShowSortOptions, firstChevronRef }) {
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const { setTodos, todos } = useTodo();

  const handleSortChange = (e) => {
    setSelectedSortOption(e.target.value);
    setShowSortOptions(!show);
    let sortedTodos = [...todos];

    switch (e.target.value) {
      case "Ascending Date":
        sortedTodos.sort((a, b) => {
          const dateA =
            a.date.length === 0 ? new Date(9999, 2, 2) : new Date(a.date);
          const dateB =
            b.date.length === 0 ? new Date(9999, 2, 2) : new Date(b.date);
          return dateA - dateB;
        });
        break;
      case "Descending Date":
        sortedTodos.sort((a, b) => {
          const dateA = a.date.length === 0 ? 0 : new Date(a.date);
          const dateB = b.date.length === 0 ? 0 : new Date(b.date);
          return dateB - dateA;
        });
        break;
      case "Ascending Priority":
        sortedTodos.sort((a, b) => a.selectedPrio - b.selectedPrio);
        break;
      case "Descending Priority":
        sortedTodos.sort((a, b) => b.selectedPrio - a.selectedPrio);
        break;
      case "Ascending Complexity":
        sortedTodos.sort((a, b) => a.selectedComp - b.selectedComp);
        break;
      case "Descending Complexity":
        sortedTodos.sort((a, b) => b.selectedComp - a.selectedComp);
        break;
      case "Default":
        sortedTodos.sort((a, b) => a.dueDate - b.dueDate);
        break;
      default:
        break;
    }
    setTodos(sortedTodos);
  };

  useEffect(() => {
    const toggleSortList = (e) => {
      if (firstChevronRef.current === e.target) {
        return;
      }
      setShowSortOptions(false);
    };
    document.body.addEventListener("click", toggleSortList);
    return () => {
      document.body.removeEventListener("click", toggleSortList);
    };
  }, []);
  return (
    <>
      {show && (
        <div className="sort-options">
          <SortBtn
            selectedSortOption={selectedSortOption}
            handleSortChange={handleSortChange}
          />
        </div>
      )}
    </>
  );
}
export default SortByList;
