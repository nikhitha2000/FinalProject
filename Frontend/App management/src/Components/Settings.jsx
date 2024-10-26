// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import styles from "../Components/Settings.module.css";
import icon1 from "../assets/Frame 1036.png";
import icon2 from "../assets/icon.png";
import icon3 from "../assets/lock.png";
import icon4 from "../assets/view.png";
import icon5 from "../assets/Vector.png";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const toggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/users/update",
        {
          name: userData.name,
          email: userData.email,
          oldPassword,
          newPassword,
        },
        { headers: { "x-auth-token": token } }
      );
      console.log(response.data);
      setUserData({ name: "", email: "" });
      setOldPassword("");
      setNewPassword("");
      setMessage("User updated successfully");
      navigate("/login");
    } catch (error) {
      console.error(
        "Error updating user data:",
        error.response ? error.response.data : error.message
      );
      setMessage(
        error.response ? error.response.data.msg : "Error updating user data"
      );
    }
  };

  return (
    <div className={styles.settingscontainer}>
      <h3 className={styles.Title}>Settings</h3>
      <div className={styles.settingItem}>
        <img src={icon1} alt="userIcon" className={styles.icon} />
        <input
          type="text"
          id="username"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className={styles.inputField}
        />
      </div>
      <div className={styles.settingItem}>
        <img src={icon2} alt="EmailIcon" className={styles.icon} />
        <input
          type="email"
          id="email"
          placeholder="Update Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className={styles.inputField}
        />
      </div>
      <div className={styles.settingItem}>
        <img src={icon3} alt="viewIcon" className={styles.icon} />
        <input
          type={showOldPassword ? "text" : "password"}
          name="password"
          className={styles.inputField}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
        />
        <img
          src={showOldPassword ? icon5 : icon4}
          alt="Show Password"
          className={styles.eyeIcon}
          onClick={toggleOldPassword}
        />
      </div>
      <div className={styles.settingItem}>
        <img src={icon3} alt="viewIcon" className={styles.icon} />
        <input
          type={showNewPassword ? "text" : "password"}
          name="password"
          className={styles.inputField}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <img
          src={showNewPassword ? icon5 : icon4}
          alt="Show Password"
          className={styles.eyeIcon}
          onClick={toggleNewPassword}
        />
      </div>
      {message && <p className={styles.errorMessage}>{message}</p>}
      <button
        type="submit"
        className={styles.UpdateButton}
        onClick={handleSave}
      >
        Update
      </button>
    </div>
  );
}

export default Settings;
