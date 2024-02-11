import { supabaseContext } from "../../main";
import { useEffect, useState, useContext } from "react";
import Form from "../../Component/Form";
import Header from "../../Component/Header";
import Main from "../../Component/Main";
import "../../css/style.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const supabase = useContext(supabaseContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user?.id) {
        setUser(data.user);
      } else {
        navigate("/");
      }
    })();
  }, []);
  return (
    <>
      <main className="App ">
        <Header />
        <Form />
        <Main />
      </main>
    </>
  );
};
export default Home;
