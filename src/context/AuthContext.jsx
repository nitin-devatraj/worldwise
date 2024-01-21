import { createContext, useReducer } from "react";

export const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export default function AuthContextProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function handleLogin(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function handleLogout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
