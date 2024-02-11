import { supabaseContext } from "../../main";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const supabase = useContext(supabaseContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user?.id) {
        setUser(data.user);
      } else {
        navigate("/");
      }
    };

    fetchUser();
  }, []);
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/");
    }
  };
  const getTasks = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select()
      .order("created_at", { ascending: false });
    if (!error) {
      setTodos(data);
    }
  };

  const AddTodo = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("todos")
      .insert({ task: newTodo, user_id: user.id });
    if (error) {
      console.error("Error adding task", error);
    } else {
      getTasks();
      setNewTodo("");
    }
  };

  return (
    <>
      <div>
        <div className="hide">
          <h1></h1>
        </div>
      </div>
      <form className="app__form" action="" onSubmit={AddTodo}>
        <input
          placeholder="Add your todo here"
          className="app__form__input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="app__form__button"></button>
      </form>
    </>
  );
};
export default Form;
