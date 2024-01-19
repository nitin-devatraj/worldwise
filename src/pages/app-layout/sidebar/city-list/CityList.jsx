import Message from "../../../../components/message/Message";
import Spinner from "../../../../components/spinner/Spinner";
import styles from "./CityList.module.css";
import City from "./city/City";

export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <City city={city} key={city.id} />
      ))}
    </ul>
  );
}
