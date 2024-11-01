// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styles from "./Taskcard.module.css";
import dots from "../assets/dots.png";
import Arrow from "../assets/Arrow.png";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const TaskCard = ({ task, updateStatus, onEditTask }) => {
  const { title, priority, checklist, dueDate, status } = task;
  const isDueDatePassed = dueDate && new Date(dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [localChecklist, setLocalChecklist] = useState(checklist);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleChecklistItem = (index) => {
    const updatedChecklist = localChecklist.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setLocalChecklist(updatedChecklist);
  };

  const toggleChecklistVisibility = () => {
    setShowChecklist(!showChecklist);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Confirmed deletion");
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const getDueDateBackgroundColor = () => {
    if (!dueDate) return { backgroundColor: "transparent" };
    const style = {
      backgroundColor: "#DBDBDB",
      color: "#5A5A5A",
    };
    if (status === "done") {
      style.backgroundColor = "#63C05B";
      style.color = "#ffffff";
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
        <img src={dots} alt="Options" className={styles.dotsIcon} onClick={toggleOptions} />
        {showOptions && (
          <div className={styles.optionsMenu}>
             <div onClick={() => onEditTask(task)} className={styles.optionItem}>Edit</div>
             <div onClick={() => alert("Share clicked")} className={styles.optionItem}>Share</div>
             <div onClick={handleDelete} className={styles.deleteItem}>Delete</div>
          </div>
        )}
      </div>
      <div className={styles.priorityBadge}>
        <span className={styles.priorityCircle} style={{ backgroundColor: priority === "HIGH" ? "#ff2473" : priority === "MODERATE" ? "#18b0ff" : "#63c05b" }}></span>
        <span className={styles.priorityText}>{priority} PRIORITY</span>
      </div>
      <div className={styles.taskTitle} title={title}>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</div>
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
          {status !== "backlog" && <button className={styles.statusButton} onClick={() => updateStatus(task._id, "backlog")}>Backlog</button>}
          {status !== "to-do" && <button className={styles.statusButton} onClick={() => updateStatus(task._id, "to-do")}>To Do</button>}
          {status !== "in-progress" && <button className={styles.statusButton} onClick={() => updateStatus(task._id, "in-progress")}>In Progress</button>}
          {status !== "done" && <button className={styles.statusButton} onClick={() => updateStatus(task._id, "done")}>Done</button>}
        </div>
      </div>
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default TaskCard;
