import { useNavigate } from "react-router-dom";
import useAuthContext from "../../../custom-hooks/useAuthContext";
import styles from "./User.module.css";

export default function User() {
  const { user, handleLogout } = useAuthContext();
  const navigate = useNavigate();

  function handleClick() {
    handleLogout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
