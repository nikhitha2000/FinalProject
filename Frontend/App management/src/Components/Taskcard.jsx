import React from "react";
import styles from "./TaskCard.module.css";
import dots from "../assets/dots.png";
import Arrow from "../assets/Arrow.png";

const TaskCard = ({ task }) => {
  const { title, priority, checklist, dueDate, status } = task;

  const formatDueDate = (date) => {
    if (!date) return "";
    const taskDate = new Date(date);
    return taskDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const completedTasks = checklist.filter((item) => item.done).length;

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
        Checklist ({completedTasks}/{checklist.length})
        <img src={Arrow} alt="Expand/Collapse" className={styles.arrowIcon} />
      </div>
      <div className={styles.dueDate}>{formatDueDate(dueDate)}</div>
      <div className={styles.statusButtons}>
        {/* Show "Backlog" button if the task is not already in "Backlog" */}
        {status !== "backlog" && (
          <button
            className={styles.statusButton}
            onClick={() => updateStatus(task._id, "backlog")}
          >
            Backlog
          </button>
        )}

        {/* Show "To Do" button if the task is not in "To Do" */}
        {status !== "to-do" && (
          <button
            className={styles.statusButton}
            onClick={() => updateStatus(task._id, "to-do")}
          >
            To Do
          </button>
        )}

        {/* Show "In Progress" button if the task is not in "In Progress" */}
        {status !== "progress" && (
          <button
            className={styles.statusButton}
            onClick={() => updateStatus(task._id, "progress")}
          >
            In Progress
          </button>
        )}

        {/* Show "Done" button if the task is not in "Done" */}
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
  );
};

export default TaskCard;
