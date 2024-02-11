import { supabaseContext } from "../../main";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

const Header = () => {
  const [theme, setTheme] = useState("light");
  const supabase = useContext(supabaseContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
      <div className="app__header flex justify-between items-center mb-4">
        <h1>TODOAPP </h1>
        <ul className="app__header__list flex gap-x-8">
          <li className="app__header__list__appearance">
            <button
              className={theme === "light" ? "modeDark" : "modeLight"}
              onClick={() => toggleTheme()}
            >
              {theme === "light" ? "modeDark" : "modeLight"}
            </button>
          </li>
          <li className="app__header__list__map"></li>
          <li className="app__header__list__avatar">
            <div className="text-center">
              <img src={user.user_metadata?.avatar_url} alt="avatar" />
              <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                {user.user_metadata?.full_name}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Header;
