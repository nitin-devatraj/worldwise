import { createContext, useEffect, useState } from "react";

export const CitiesContext = createContext();

export default function CitiesContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("there was an error loading the data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}
