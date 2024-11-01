// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import styles from "../Components/TaskModal.module.css";
import axios from "axios";
import trashicon from "../assets/Delete.png";

const TaskModal = ({ showModal, handleClose, onTaskSaved, onSave, task = {}, mode = "add" }) => {
  const [title, setTitle] = useState(task.title||"");
  const [priority, setPriority] = useState(task.priority || "");
  const [checklist, setChecklist] = useState(task.checklist || []);
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [errors, setErrors] = useState({});
  const [emails, setEmails] = useState([]);
  const [assignedEmails, setAssignedEmails] = useState(task.assignedEmails || []);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateInputRef = useRef(null);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/emails");
      console.log(response.data);
      setEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const handlePriorityClick = (selectedPriority) => {
    setPriority(selectedPriority);
    fetchEmails();
    setShowEmailDropdown(true);
  };

  const handleAssign = (email) => {
    if (!assignedEmails.includes(email)) {
      setAssignedEmails([email]);
      setShowEmailDropdown(false);
    }
  };

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value ? new Date(event.target.value) : "");
    setCalendarOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dateInputRef.current && !dateInputRef.current.contains(e.target)) {
      setCalendarOpen(false);
    }
  };
  const formatDueDate = (date) => {
    if (!date) return "";
    const taskDate = new Date(date);
    return taskDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  useEffect(() => {
    console.log("onTaskSaved in TaskModal:", onTaskSaved); // This should not be undefined if passed correctly
}, [onTaskSaved]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSave = async () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (mode === "add") {
      if (!priority) newErrors.priority = "Priority is required";
      if (checklist.length === 0) newErrors.checklist = "Checklist is required";
      if (assignedEmails.length === 0) newErrors.assignedEmails = "Assignee is required";
    }
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const taskData = {
          title,
          priority,
          checklist: checklist.map(item => ({ text: item.text, done: item.done })),
          dueDate: dueDate === "" ? null : new Date(dueDate),
          status: task.status || "to-do",
          assignedEmails,
        };
        console.log("Saving task data:", taskData);
        let response;
        if (mode === "add" && typeof onTaskSaved === "function") {
          try {
              onTaskSaved(taskData); // No need to await or access data
              console.log("Task saved successfully.");
          } catch (error) {
              console.error("Error in handleSave:", error);
          }
      } else if (mode === "edit" && typeof onSave === "function") {
          onSave(taskData);
      } else {
          console.error("No valid save function provided");
      }
        console.log("Task saved successfully:", response.data); 
        handleClose();
        setTitle("");
        setPriority("");
        setAssignedEmails([]);
        setChecklist([]);
        setDueDate("");
      } catch (error) {
        console.error("Error saving task:", error.response ? error.response.data : error.message);
      }
    }
  };

  const handleChecklistChange = (index, value) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].text = value;
    setChecklist(updatedChecklist);
  };

  const handleChecklistToggle = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].done = !updatedChecklist[index].done;
    setChecklist(updatedChecklist);
  };
  const handleDeleteChecklistItem = (index) => {
    const updatedChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(updatedChecklist);
  };

  const addChecklistItem = () => {
    setChecklist([...checklist, { text: "", done: false }]);
  };

  const completedTasks = checklist.filter((item) => item.done).length;

  if (!showModal) return null;

  return (
    <div className={styles.Taskmodel}>
      <div className={styles.Taskmodelcontent}>
        <p>
          Title <span className={styles.required}>*</span>
        </p>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors({ ...errors, title: "" });
          }}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}

        <div className={styles.priorityOptions}>
          <p>
            Select Priority <span className={styles.required}>*</span>
          </p>
          <div
            className={`${styles.priorityOption} ${
              priority === "HIGH" ? styles.selected : ""
            }`}
            onClick={() => handlePriorityClick("HIGH")}
            style={{
              backgroundColor: priority === "HIGH" ? "#EEECEC" : "white",
            }}
          >
            <span className={styles.highPriority}></span>HIGH PRIORITY
          </div>
          <div
            className={`${styles.priorityOption} ${
              priority === "MODERATE" ? styles.selected : ""
            }`}
            onClick={() => handlePriorityClick("MODERATE")}
            style={{
              backgroundColor: priority === "MODERATE" ? "#EEECEC" : "white",
            }}
          >
            <span className={styles.moderatePriority}></span>MODERATE PRIORITY
          </div>
          <div
            className={`${styles.priorityOption} ${
              priority === "LOW" ? styles.selected : ""
            }`}
            onClick={() => handlePriorityClick("LOW")}
            style={{
              backgroundColor: priority === "LOW" ? "#EEECEC" : "white",
            }}
          >
            <span className={styles.lowPriority}></span>LOW PRIORITY
          </div>
        </div>
        {errors.priority && <p className={styles.error}>{errors.priority}</p>}
        <div className={styles.parentContainer}>
          <p className={styles.assignLabel}>
            Assign to <span className={styles.required}>*</span>
          </p>
          <input
            type="text"
            className={styles.inputEmail}
            value={assignedEmails.length ? assignedEmails[0] : ""}
            readOnly
            onClick={() => setShowEmailDropdown(!showEmailDropdown)}
          />

          {showEmailDropdown && (
            <div className={styles.emailDropdown}>
              {emails.map((email, index) => (
                <div key={index} className={styles.emailItem}>
                  <span className={styles.emailAvatar}>
                    {email.email.split("@")[0].slice(0, 2).toUpperCase()}
                  </span>
                  <span className={styles.emailText}>{email.email}</span>
                  <button
                    className={styles.assignButton}
                    onClick={() => handleAssign(email.email)}
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.assignedEmails && (
            <p className={styles.error}>{errors.assignedEmails}</p>
          )}
        </div>
        <p className={styles.checklist}>
          Checklist ({completedTasks}/{checklist.length})
          <span className={styles.required}>*</span>
        </p>
        {checklist.map((item, index) => (
          <div key={index} className={styles.checklistItem}>
            <div className={styles.inputContainer}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => handleChecklistToggle(index)}
                className={styles.checklistCheckbox}
              />
              <input
                type="text"
                className={styles.checklistInput}
                placeholder="Task to be done"
                value={item.text}
                onChange={(e) => handleChecklistChange(index, e.target.value)}
              />
              <img
                src={trashicon}
                alt="Delete icon"
                className={styles.trashIcon}
                onClick={() => handleDeleteChecklistItem(index)}
              />
            </div>
          </div>
        ))}
        {errors.checklist && <p className={styles.error}>{errors.checklist}</p>}
        <button
          className={styles.addChecklistButton}
          onClick={addChecklistItem}
        >
          + Add New
        </button>
        <div className={styles.buttonGroup}>
          <div className={styles.datePickerContainer} ref={dateInputRef}>
          <button
              className={styles.datePickerButton}
              onClick={toggleCalendar}
            >
              {dueDate ? formatDueDate(dueDate) : "Select Due Date"}
            </button>
            {calendarOpen && (
              <div className={styles.calendarDropdown}>
                <input
                  type="date"
                  className={styles.input}
                  value={
                    dueDate ? new Date(dueDate).toISOString().split("T")[0] : ""
                  }
                  onChange={handleDateChange}
                />
              </div>
            )}
          </div>
          <button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            {mode === "add" ? "Save" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
