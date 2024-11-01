// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './DeleteConfirmationModal.module.css';

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.confirmation}>Are you sure you want to delete this task?</h3>
        <div className={styles.buttons}>
        <button onClick={onConfirm} className={styles.confirmButton}>Yes,Delete</button>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
