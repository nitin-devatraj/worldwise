import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import useCitiesContext from "../../../../custom-hooks/useCitiesContext";
import Button from "../../../../components/button/Button";
import BackButton from "../../../../components/back-button/BackButton";
import useUrlPosition from "../../../../custom-hooks/useUrlPosition";
import Message from "../../../../components/message/Message";
import Spinner from "../../../../components/spinner/Spinner";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCitiesContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  useEffect(
    function () {
      async function fetchCityData() {
        if (!lat && !lng) return;
        try {
          setIsLoadingData(true);
          setGeocodingError("");
          const res = await fetch(
            `${
              import.meta.env.VITE_BASE_URL_GEOCODE
            }?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode || !data.city || !data.locality)
            throw new Error(
              "That doesn't seem to be a city, click somewhere else 😉"
            );
          setCityName(data.city ?? data.locality ?? "");
          setCountry(data.countryName);
          setEmoji(data.countryCode);
        } catch (error) {
          setGeocodingError(error.message);
        } finally {
          setIsLoadingData(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (isLoadingData) return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
