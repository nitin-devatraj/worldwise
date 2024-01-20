import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";

export default function useCitiesContext() {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("CitiesContext was used outside of CitiesContextProvider");
  else return value;
}
