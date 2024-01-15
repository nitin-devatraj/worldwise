import SideBar from "./sidebar/SideBar";
import styles from "./AppLayout.module.css";
import Map from "./map/Map";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}
