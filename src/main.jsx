import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/style.scss";
import { createClient } from "@supabase/supabase-js";
const supabaseInfo = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const supabaseContext = createContext();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <supabaseContext.Provider value={supabaseInfo}>
      <App />
    </supabaseContext.Provider>
  </React.StrictMode>
);
