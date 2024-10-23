import React, { useState, useRef } from "react";
import styles from "../Components/TaskModal.module.css";
import axios from 'axios';
import Delete from '../assets/Delete.png';

const TaskModal = ({ showModal, handleClose }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [dueDate, setDueDate] = useState(null); // State for the due date
  const [errors, setErrors] = useState({});
  const [calendarOpen, setCalendarOpen] = useState(false); // State to toggle calendar visibility

  const dateInputRef = useRef(null); 

 
  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  // Handle date change
  const handleDateChange = (event) => {
    setDueDate(event.target.value);
    setCalendarOpen(false); // Close calendar after selecting the date
  };

  // Close calendar when clicking outside
  const handleClickOutside = (e) => {
    if (dateInputRef.current && !dateInputRef.current.contains(e.target)) {
      setCalendarOpen(false);
    }
  };

  // Add event listener to detect clicks outside
  React.useEffect(() => {
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
    if (!priority) {
      newErrors.priority = "Priority is required";
    }
    if (checklist.length === 0) {
      newErrors.checklist = "Checklist is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Send task data, including due date, to the backend
        console.log("date :",dueDate);
        const response = await axios.post('http://localhost:5000/api/tasks', {
          title,
          priority,
          checklist,
          dueDate 
        });

        console.log('Task saved:', response.data);
        setTitle("");
        setPriority("");
        setChecklist([]);
        setDueDate(null); // Clear the due date
        handleClose();

      } catch (error) {
        console.error('Error saving task:', error);
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
            onClick={() => setPriority("HIGH")}
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
            onClick={() => setPriority("MODERATE")}
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
            onClick={() => setPriority("LOW")}
            style={{
              backgroundColor: priority === "LOW" ? "#EEECEC" : "white",
            }}
          >
            <span className={styles.lowPriority}></span>LOW PRIORITY
          </div>
        </div>
        {errors.priority && <p className={styles.error}>{errors.priority}</p>}

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
                src={Delete}
                alt="Delete"
                className={styles.trashIcon}
                onClick={() => handleDeleteChecklistItem(index)}
              />
            </div>
          </div>
        ))}
        {errors.checklist && <p className={styles.error}>{errors.checklist}</p>}
        <button className={styles.addChecklistButton} onClick={addChecklistItem}>
          + Add New
        </button>

        {/* Custom Date Picker */}
        

        <div className={styles.buttonGroup}>
        <div className={styles.datePickerContainer} ref={dateInputRef}>
          <button
            className={styles.datePickerButton}
            onClick={toggleCalendar}
          >
            {dueDate ? `Due Date: ${dueDate}` : "Select Due Date"}
          </button>
          {calendarOpen && (
            <div className={styles.calendarDropdown}>
              <input
                type="date"
                className={styles.input}
                value={dueDate}
                onChange={handleDateChange}
              />
            </div>
          )}
        </div>
          <button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
