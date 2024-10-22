import React, { useState } from 'react';
import styles from '../Components/TaskModal.module.css';

const TaskModal = ({ showModal, handleClose }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [checklist, setChecklist] = useState('');
  const [errors, setErrors] = useState({});
  const [bgColor, setBgColor] = useState('');
  const handleSave = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!priority) {
      newErrors.priority = 'Priority is required';
    }
    if (!checklist.trim()) {
      newErrors.checklist = 'Checklist is required';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Perform save action
    }
  };

  if (!showModal) return null;

  return (
    <div className={styles.Taskmodel}>
      <div className={styles.Taskmodelcontent}>
        <p>Title <span className={styles.required}>*</span></p>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors({ ...errors, title: '' });
          }}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
        <div className={styles.priorityOptions}>
        <p>Select Priority <span className={styles.required}>*</span></p>
          <div
            className={`${styles.priorityOption} ${priority === 'HIGH' ? styles.selected : ''}`}
            onClick={() => {
                setPriority('HIGH');
                setBgColor('#EEECEC'); // Set background color in state
                setErrors({ ...errors, priority: '' });
              }}
              style={{ backgroundColor: bgColor }}
          >
            <span className={styles.highPriority}></span>HIGH PRIORITY
          </div>
          <div
            className={`${styles.priorityOption} ${priority === 'MODERATE' ? styles.selected : ''}`}
            onClick={() => {
              setPriority('MODERATE');
              setBgColor('#EEECEC');
              setErrors({ ...errors, priority: '' });
            }}
          >
            <span className={styles.moderatePriority}></span>MODERATE PRIORITY
          </div>
          <div
            className={`${styles.priorityOption} ${priority === 'LOW' ? styles.selected : ''}`}
            onClick={() => {
              setPriority('LOW');
              setBgColor('#EEECEC');
              setErrors({ ...errors, priority: '' });
            }}
          >
            <span className={styles.lowPriority}></span>LOW PRIORITY
          </div>
        </div>
        {errors.priority && <p className={styles.error}>{errors.priority}</p>}

        <p className={styles.checklist}>Checklist (0/0) <span className={styles.required}>*</span></p>
        {errors.checklist && <p className={styles.error}>{errors.checklist}</p>}
        <button className={styles.addChecklistButton}>+ Add New</button>
        <div className={styles.buttonGroup}>
        <button className={styles.dueDateButton}>Select Due Date</button>
          <button className={styles.cancelButton} onClick={handleClose}>Cancel</button>
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
