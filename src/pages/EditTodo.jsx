import { useTodo } from "../Context/todoContext";
import Form from "../components/Form";
import { useParams, Link } from "react-router-dom";
import ArrowComp from "../components/ArrowComp";

const EditTodo = () => {
  const { todos } = useTodo();
  const { id } = useParams();
  const todo = todos.find((todo) => todo.id === id);

  return (
    <>
      <Link to="/">
        <ArrowComp />
      </Link>
      <div className="container">
        <h1>Edit Todo</h1>
        <Form todo={todo} />
      </div>
    </>
  );
};

export default EditTodo;
