import Form from "../components/Form";
import { Link } from "react-router-dom";
import ArrowComp from "../components/ArrowComp";
import "../styles.css";

const CreateTodo = () => {
  return (
    <>
      <Link to="/">
        <ArrowComp />
      </Link>
      <div className="container">
        <h1>Create New Todo</h1>
        <Form />
      </div>
    </>
  );
};

export default CreateTodo;
