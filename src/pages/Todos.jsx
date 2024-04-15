import Todo from "../components/Todo";
import TodoHome from "../components/TodoHome";
import { useTodo } from "../Context/todoContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
// Todos List with search bar, main Page

const Todos = () => {
  const [searchValue, setSearchValue] = useState("");

  const { todos, selectedTags } = useTodo();
  const filtered = todos.filter(
    (todo) =>
      todo.text.toLowerCase().includes(searchValue) &&
      (selectedTags.length === 0 ||
        todo.tags.some((tag) => selectedTags.includes(tag)))
  );
  return (
    <div className="container">
      <TodoHome searchValue={searchValue} setSearchValue={setSearchValue} />
      <AnimatePresence>
        {filtered.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Todo todo={todo} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Todos;
