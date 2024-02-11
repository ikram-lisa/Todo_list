import { supabaseContext } from "../../main";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import "../../css/style.scss";
const Main = () => {
  const [todos, setTodos] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const supabase = useContext(supabaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select()
      .order("created_at", { ascending: false });
    if (!error) {
      setTodos(data);
    }
  };
  const toggleSelectAll = async () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      checked: !selectAll,
    }));
    await supabase.from("todos").upsert(updatedTodos);
    setSelectAll(!selectAll);
    getTasks();
  };

  // const handleChecked = async (id) => {
  //   const filteredTodos = todos.filter((todo) => todo.id !== id);
  //   const updatedTodos = [
  //     ...filteredTodos,
  //     {
  //       ...todos.find((todo) => todo.id === id),
  //       checked: !todos.find((todo) => todo.id === id).checked,
  //     },
  //   ];
  //   await supabase.from("todos").upsert(updatedTodos);
  //   setTodos([...filteredTodos]);
  // };

  const deletAllTasks = async () => {
    try {
      for (const todo of todos) {
        await supabase.from("todos").delete().eq("id", todo.id);
      }
      setTodos([]);
    } catch (error) {
      console.error(error);
    }
  };

  const ToggleCheck = async (id) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ checked: !todos.find((todo) => todo.id === id).checked })
      .eq("id", id);
    getTasks();
  };
  const DeleteTask = async (id) => {
    const { data, error } = await supabase.from("todos").delete().eq("id", id);
    getTasks();
  };

  return (
    <>
      <div className="app__options flex justify-between my-5 text-2xl font-bold ">
        <button className="ml-8" onClick={toggleSelectAll}>
          {selectAll ? "Deselect All" : "Select All"}
        </button>
        <button
          className="mr-8"
          onClick={() => {
            deletAllTasks();
          }}
        >
          Delete All
        </button>
      </div>
      {todos.length > 0 && (
        <ul className="app__list">
          {todos.map(({ id, task, checked }) => (
            <li
              key={id}
              className={`app__list__item ${checked ? "checked" : ""}`}
            >
              <span className="text">
                {task.charAt(0).toUpperCase() + task.slice(1)}{" "}
              </span>
              <a
                href="#"
                onClick={() => {
                  DeleteTask(id);
                }}
                className="ico ico--delete"
              ></a>
              <a
                href="#"
                onClick={() => ToggleCheck(id, !checked)}
                className={`${
                  checked ? "ico ico--checked" : "ico ico--unchecked"
                }`}
              ></a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default Main;
