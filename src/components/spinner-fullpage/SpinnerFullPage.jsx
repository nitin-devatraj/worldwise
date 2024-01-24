import Spinner from "../spinner/Spinner";
import styles from "./SpinnerFullPage.module.css";

export default function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
}
