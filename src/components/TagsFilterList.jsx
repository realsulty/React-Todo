import { useEffect } from "react";
import { useTodo } from "../Context/todoContext";

function TagsFilterList({
  showTagsFilter,
  setShowTagsFilter,
  secondChevronRef
}) {
  const { todos, selectedTags, setSelectedTags } = useTodo();

  const handleTagChange = (tag, isChecked) => {
    if (isChecked) {
      setSelectedTags([...selectedTags, tag]);
      setShowTagsFilter(!showTagsFilter);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };

  const uniqueTags = todos.reduce((acc, todo) => {
    todo.tags.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);
  useEffect(() => {
    const toggleShowTagsFilter = (e) => {
      if (secondChevronRef.current === e.target) {
        return;
      }

      setShowTagsFilter(false);
    };
    document.body.addEventListener("click", toggleShowTagsFilter);
    return () => {
      document.body.removeEventListener("click", toggleShowTagsFilter);
    };
  }, []);
  return (
    <>
      {showTagsFilter && (
        <div className="sort-options">
          {uniqueTags.map((tag) => (
            <div className="heunou" key={tag}>
              <div>{tag}</div>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={(e) => handleTagChange(tag, e.target.checked)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default TagsFilterList;
