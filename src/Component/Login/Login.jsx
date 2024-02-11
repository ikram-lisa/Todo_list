import { useContext } from "react";
import { supabaseContext } from "../../main";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const supabase = useContext(supabaseContext);
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (e) => {
      if (e === "SIGNED_IN") {
        navigate("/home");
      }
    });
  }, []);
  return (
    <div className="login">
      <header className="Login-header">
        <Auth
          supabaseClient={supabase}
          providers={["discord"]}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </header>
    </div>
  );
};
export default Login;
