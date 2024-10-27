// eslint-disable-next-line no-unused-vars
import React,{useState} from "react";
import styles from "./Taskcard.module.css";
import dots from "../assets/dots.png";
import Arrow from "../assets/Arrow.png";

const TaskCard = ({ task, updateStatus }) => {
  console.log("Task received in Taskcard:", task);
  const { title, priority, checklist, dueDate, status } = task;
  const isDueDatePassed = dueDate && new Date(dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [localChecklist, setLocalChecklist] = useState(checklist);

  const toggleChecklistItem = (index) => {
    const updatedChecklist = localChecklist.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setLocalChecklist(updatedChecklist);
  };

  const toggleChecklistVisibility = () => {
    setShowChecklist(!showChecklist);
  };

  // Determine the background color for the due date
  const getDueDateBackgroundColor = () => {
    const style = {
      backgroundColor: "#DBDBDB",
      color: "#5A5A5A",
    };
    if (status === "done") {
      style.backgroundColor = "#63C05B";
      style.color = "#ffffff"; // White font color
    } else if (priority === "HIGH" || isDueDatePassed) {
      style.color = "#ffffff";
      style.backgroundColor = "#CF3636";
    }
    return style;
  };

  const formatDueDate = (date) => {
    if (!date) return "";
    const taskDate = new Date(date);
    return taskDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short"
    });
  };

  const completedTasks = localChecklist.filter((item) => item.done).length;

  return (
    <div className={styles.taskCard}>
      <div className={styles.options}>
        <img src={dots} alt="Options" className={styles.dotsIcon} />
      </div>
      <div className={styles.priorityBadge}>
        {priority === "HIGH" && (
          <>
            <span
              className={styles.priorityCircle}
              style={{ backgroundColor: "#ff2473" }}
            ></span>
            <span className={styles.priorityText}>HIGH PRIORITY</span>
          </>
        )}
        {priority === "MODERATE" && (
          <>
            <span
              className={styles.priorityCircle}
              style={{ backgroundColor: "#18b0ff" }}
            ></span>
            <span className={styles.priorityText}>MODERATE PRIORITY</span>
          </>
        )}
        {priority === "LOW" && (
          <>
            <span
              className={styles.priorityCircle}
              style={{ backgroundColor: "#63c05b" }}
            ></span>
            <span className={styles.priorityText}>LOW PRIORITY</span>
          </>
        )}
      </div>
      <div className={styles.taskTitle}>
        {title.length > 20 ? `${title.slice(0, 20)}...` : title}
      </div>
      <div className={styles.checklist}>
        Checklist ({completedTasks}/{localChecklist.length})
        <img src={Arrow} alt="Expand/Collapse" className={styles.arrowIcon} onClick={toggleChecklistVisibility} />
      </div>
      {showChecklist && (
        <div className={styles.checklistItems}>
          {localChecklist.map((item, index) => (
            <div key={index} className={styles.checklistItem}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleChecklistItem(index)}
                className={styles.checklistCheckbox}
              />
              <span className={styles.checklistText}>{item.text}</span>
            </div>
          ))}
        </div>
      )}
      <div className={styles.ButtonContainer}>
      <div className={styles.dueDate} style={getDueDateBackgroundColor()}>{formatDueDate(dueDate)}</div>
      <div className={styles.statusButtons}>
        {status !== "backlog" && (
          <button
            className={styles.statusButton}
            onClick={() => updateStatus(task._id, "backlog")}
          >
            Backlog
          </button>
        )}
        {status !== "to-do" && (
          <button
            className={styles.statusButton}
            onClick={() => updateStatus(task._id, "to-do")}
          >
            To Do
          </button>
        )}
        {status !== "in-progress" && (
          <button
            className={styles.statusButton}
            onClick={() => updateStatus(task._id, "in-progress")}
          >
            In Progress
          </button>
        )}
        {status !== "done" && (
          <button
            className={styles.statusButton}
            onClick={() => updateStatus(task._id, "done")}
          >
            Done
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default TaskCard;
