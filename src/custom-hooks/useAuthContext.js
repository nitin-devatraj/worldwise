import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuthContext() {
  const value = useContext(AuthContext);
  if (value === undefined)
    throw new Error("AuthContext was used outside of AuthContextProvider");
  else return value;
}
