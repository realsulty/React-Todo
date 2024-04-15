import { createContext, useContext, useState, useEffect } from "react";
export const TodoContext = createContext();

export function useTodo() {
  const value = useContext(TodoContext);
  return value;
}
export function useLocalState(key, initialValue) {
  const storedValue = window.localStorage.getItem(key);
  const item = storedValue ? JSON.parse(storedValue) : initialValue;
  const [value, setValue] = useState(item);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useLocalState("todos", []);
  const [selectedTags, setSelectedTags] = useState([]);

  // const saveToLocalStorage = (key, value) => {
  //   const storedValues = JSON.stringify(value);
  //   localStorage.setItem(key, storedValues);
  // };
  // const loadFromLocalStorage = (key, defaultValue) => {
  //   const storedValues = localStorage.getItem(key);
  //   return storedValues ? JSON.parse(storedValues) : defaultValue;
  // };
  const addTodo = (newTodo) => {
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };
  const completeTodo = (todo) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    saveToLocalStorage("todos", updatedTodos);
  };
  const removeTodo = (todo) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (isConfirmed) {
      const updatedTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(updatedTodos);
    }
  };

  const updateTodoTags = (todoId, newTags) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, tags: newTags };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleItemCompletion = (todoId, item) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const updatedChecklistItems = todo.checklistItems.map((t) =>
          t.id === item.id ? { ...t, isCompleted: !t.isCompleted } : t
        );
        const completedItems = updatedChecklistItems.filter(
          (item) => item.isCompleted
        ).length;
        const totalItems = updatedChecklistItems.length;
        const progressPercentage = (completedItems / totalItems) * 100;

        return {
          ...todo,
          checklistItems: updatedChecklistItems,
          progress: progressPercentage
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const updateTodo = (todoId, updatedData) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, ...updatedData } : todo
    );
    setTodos(updatedTodos);
  };
  const repeatTodo = (repeatedTodo) => {
    const newTodos = [...todos, repeatedTodo];
    setTodos(newTodos);
  };
  // in case you werent using custom hook ^
  // useEffect(() => {
  //   const loadedTodos = loadFromLocalStorage("todos", []);
  //   setTodos(loadedTodos);
  // }, []);
  return (
    <TodoContext.Provider
      value={{
        addTodo,
        todos,
        completeTodo,
        removeTodo,
        handleItemCompletion,
        updateTodoTags,
        setTodos,
        updateTodo,
        selectedTags,
        setSelectedTags,
        repeatTodo,
        setTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
