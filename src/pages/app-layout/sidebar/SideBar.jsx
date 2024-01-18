import { Outlet } from "react-router-dom";
import Logo from "../../../components/logo/Logo";
import AppNav from "./app-nav/AppNav";
import Footer from "./footer/Footer";
import styles from "./Sidebar.module.css";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
