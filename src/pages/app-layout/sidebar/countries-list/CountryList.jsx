import Message from "../../../../components/message/Message";
import Spinner from "../../../../components/spinner/Spinner";
import useCitiesContext from "../../../../custom-hooks/useCitiesContext";
import styles from "./CountryList.module.css";
import Country from "./country/Country";

export default function CountryList() {
  const { cities, isLoading } = useCitiesContext();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) return arr;
    else
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <Country country={country} key={country.id} />
      ))}
    </ul>
  );
}
