import React from 'react';
import styles from './TaskCard.module.css';

const TaskCard = ({ task }) => {
  const { title, priority, checklist, dueDate } = task;

  return (
    <div className={styles.taskCard}>
      <div className={`${styles.priorityBadge} ${styles[priority.toLowerCase()]}`}>
        {priority} Priority
      </div>
      <h3>{title}</h3>
      <p>Checklist ({checklist.length}/3)</p>
      <p>{new Date(dueDate).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskCard;