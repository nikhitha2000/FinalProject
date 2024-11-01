// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import styles from "../Components/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import icon from "../assets/codesandbox.png";
import axios from "axios";
import Board from "../assets/layout.png";
import AnalyticsIcon from "../assets/database.png";
import settingsIcon from "../assets/settings.png";
import logout from "../assets/Logout.png";
import Group from "../assets/Group__.png";
import collapse from "../assets/collapse.png";
import add from "../assets/Group 10.png";
import Logoutmodal from "../Components/Logoutmodal.jsx";
import TaskModal from "../Components/TaskModal.jsx";
import Settings from "./Settings.jsx";
import Analytics from "../Components/Analytics.jsx";
import Addpeople from "./Addpeople.jsx";
import Taskcard from "./Taskcard.jsx";
function Dashboard() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAddPeopleModal, setShowAddPeopleModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const username = localStorage.getItem("name");
  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
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
  const handleSaveTask = (newTask) => {
    console.log("handleSaveTask called with:", newTask);
    const taskWithStatus = { ...newTask, status: newTask.status || "to-do" };
    const updatedTasks = [...tasks, taskWithStatus];
    setTasks(updatedTasks);
    console.log("Updated Tasks:", updatedTasks);
    setShowTaskModal(false);
  };
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };
  const handleSaveEditedTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    setIsEditModalOpen(false);
  };
  const handleUpdateTaskStatus = (taskId, newStatus) => {
    console.log("Updating task status for:", taskId, "to:", newStatus);
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
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
            backgroundColor:
              activeSection === "Board" ? "#4391ED1A" : "#FFFFFF",
            width: "100%",
          }}
        >
          <img src={Board} alt="Board image" />
          <h4>Board</h4>
        </div>
        <div
          className={styles.Inputgroup}
          onClick={() => handleSectionClick("Analytics")}
          style={{
            backgroundColor:
              activeSection === "Analytics" ? "#4391ED1A" : "#FFFFFF",
            width: "100%",
          }}
        >
          <img src={AnalyticsIcon} alt="Analytics image" />
          <h4>Analytics</h4>
        </div>
        <div
          className={styles.Inputgroup}
          onClick={() => handleSectionClick("Settings")}
          style={{
            backgroundColor:
              activeSection === "Settings" ? "#4391ED1A" : "#FFFFFF",
            width: "100%",
          }}
        >
          <img src={settingsIcon} alt="Settings image" />
          <h4>Settings</h4>
        </div>
        <div className={styles.logout} onClick={() => setShowModal(true)}>
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
              <span
                className={styles.addPeople}
                onClick={() => setShowAddPeopleModal(true)}
              >
                Add People
              </span>
            </div>
            <div className={styles.boardContainer}>
              <div className={styles.boardColumn}>
                <h4>Backlog</h4>
                <img src={collapse} alt="collapse" />
                {tasks
                  .filter((task) => task.status === "backlog")
                  .map((task, index) => (
                    <Taskcard
                      key={index}
                      task={task}
                      updateStatus={handleUpdateTaskStatus}
                      onEditTask={handleEditTask}
                    />
                  ))}
              </div>
              <div className={styles.Todo}>
                <h4>To do</h4>
                <img
                  className={styles.add}
                  src={add}
                  alt="add"
                  onClick={() => setShowTaskModal(true)}
                />
                <img src={collapse} alt="collapse" />
                {console.log(
                  "Rendering To-Do Tasks:",
                  tasks.filter((task) => task.status === "to-do")
                )}
                {tasks
                  .filter((task) => task.status === "to-do")
                  .map((task, index) => (
                    <Taskcard
                      key={index}
                      task={task}
                      updateStatus={handleUpdateTaskStatus}
                      onEditTask={handleEditTask}
                    />
                  ))}
              </div>
              <div className={styles.boardColumn}>
                <h4>In progress</h4>
                <img src={collapse} alt="collapse" />
                {tasks
                  .filter((task) => task.status === "in-progress")
                  .map((task, index) => (
                    <Taskcard
                      key={index}
                      task={task}
                      updateStatus={handleUpdateTaskStatus}
                      onEditTask={handleEditTask}
                    />
                  ))}
              </div>
              <div className={styles.boardColumn}>
                <h4>Done</h4>
                <img src={collapse} alt="collapse" />
                {tasks
                  .filter((task) => task.status === "done")
                  .map((task, index) => (
                    <Taskcard
                      key={index}
                      task={task}
                      updateStatus={handleUpdateTaskStatus}
                      onEditTask={handleEditTask}
                    />
                  ))}
              </div>
            </div>
            <TaskModal
              showModal={showTaskModal}
              handleClose={() => setShowTaskModal(false)}
              onTaskSaved={handleSaveTask}
            />
            {isEditModalOpen && (
              <TaskModal
                showModal={isEditModalOpen}
                task={taskToEdit}
                onSave={handleSaveEditedTask}
                handleClose={() => setIsEditModalOpen(false)}
                mode="edit"
              />
            )}
          </>
        )}
        {activeSection === "Settings" && <Settings />}
        {activeSection === "Analytics" && <Analytics />}
      </div>
      <Addpeople
        showModal={showAddPeopleModal}
        handleClose={() => setShowAddPeopleModal(false)}
      />
    </div>
  );
}

export default Dashboard;
