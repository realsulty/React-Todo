import { FaArrowRotateLeft } from "react-icons/fa6";

const CheckList = ({
  inputValue,
  focusedItemId,
  newCheckList,
  handleFocus,
  handleBlur,
  deleteItem,
  setInputValue,
  checklistItems,
  handleItemChange
}) => {
  return (
    <>
      <h4>Add CheckList</h4>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newCheckList(inputValue);
          }}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add CheckList item"
          />
          <button type="submit" className="push-btn">
            +
          </button>
        </form>
      </div>
      {checklistItems.map((item) => (
        <>
          <input
            key={item.id}
            item={item}
            value={item.value}
            onFocus={() => handleFocus(item.id)}
            onBlur={handleBlur}
            className="margin"
            onChange={(e) => handleItemChange(item.id, e.target.value)}
            id={item.id}
          />
          {focusedItemId === item.id ? (
            <FaArrowRotateLeft className="edit-arrow" />
          ) : (
            <button onClick={() => deleteItem(item.id)} className="delete-btn">
              X
            </button>
          )}
        </>
      ))}
    </>
  );
};

export default CheckList;
