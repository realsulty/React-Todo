import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos";
import TodoDetail from "./pages/Todo";
import CreateTodo from "./pages/CreateTodo";
import EditTodo from "./pages/EditTodo";
import { TodoProvider } from "./Context/todoContext";

function App() {
  return (
    <Router>
      <div>
        <TodoProvider>
          <Routes>
            <Route exact path="/" element={<Todos />} />
            <Route path="/todo/:id" element={<TodoDetail />} />
            <Route path="/create" element={<CreateTodo />} />
            <Route path="/edit/:id" element={<EditTodo />} />
          </Routes>
        </TodoProvider>
      </div>
    </Router>
  );
}

export default App;
