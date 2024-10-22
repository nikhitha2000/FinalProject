// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import styles from "../Components/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import icon from "../assets/codesandbox.png";
import Board from "../assets/layout.png";
import Analytics from "../assets/database.png";
import settings from "../assets/settings.png";
import logout from "../assets/Logout.png";
import Group from "../assets/Group__.png";
import collapse from "../assets/collapse.png";
import add from "../assets/Group 10.png";
import Logoutmodal from "../Components/Logoutmodal.jsx";
import TaskModal from "../Components/TaskModal.jsx";
function Dashboard() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [showModal, setShowModal] = useState(false);
  const[showTaskModal, setShowTaskModal] = useState(false);
  const username = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    navigate("/login");
  };

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCurrentDate(formattedDate);
    };
    updateDate();
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftDashboard}>
          <img className={styles.image} src={icon} alt="icon image" />
          <h4 className={styles.title}>Pro Manage</h4>
        </div>
        <div
          className={styles.Inputgroup}
          onClick={() => handleSectionClick("Board")}
          style={{
            backgroundColor: activeSection === "Board" ? "#4391ED1A" : "#FFFFFF",
            width: '100%',
          }}
        >
          <img src={Board} alt="Board image" />
          <h4>Board</h4>
        </div>
        <div className={styles.Inputgroup}>
          <img src={Analytics} alt="Analytics image" />
          <h4>Analytics</h4>
        </div>
        <div className={styles.Inputgroup}>
          <img src={settings} alt="Settings image" />
          <h4>Settings</h4>
        </div>
        <div
          className={styles.logout}
          onClick={() => setShowModal(true)}
        >
          <img src={logout} alt="logout" />
          <h4>Log out</h4>
        </div>
        <Logoutmodal 
            showModal={showModal} 
            handleLogout={handleLogout} 
            handleClose={() => setShowModal(false)} 
        />
        </div>
      <div className={styles.right}>
      {activeSection === "Board" && (
        <>
        <div className={styles.header}>
          <div className={styles.welcomeMessage}>
            <h1>Welcome! {username}</h1>
            <span>{currentDate}</span>
          </div>
        </div>
        <div className={styles.Group}>
          <p>Board</p>
          <img src={Group} alt="Group" />
          <span>Add People</span>
        </div>
        <div className={styles.boardContainer}>
          <div className={styles.boardColumn}>
            <h4>Backlog</h4>
            <img src={collapse} alt="collapse" />
          </div>
          <div className={styles.Todo}>
            <h4>To do</h4>
            <img className={styles.add} src={add} alt="add" onClick={() =>setShowTaskModal(true)}/>
            <img src={collapse} alt="collapse" />
          </div>
          <div className={styles.boardColumn}>
            <h4>In progress</h4>
            <img src={collapse} alt="collapse" />
          </div>
          <div className={styles.boardColumn}>
            <h4>Done</h4>
            <img src={collapse} alt="collapse" />
          </div>
        </div>
        <TaskModal
            showModal={showTaskModal}
            handleClose={() => setShowTaskModal(false)}
        />
        </>
      )}
      </div>
    </div>
  );
}

export default Dashboard;
