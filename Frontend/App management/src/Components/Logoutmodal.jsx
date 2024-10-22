// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from '../Components/Logoutmodal.module.css';
    // eslint-disable-next-line react/prop-types
    const Logoutmodal = ({ showModal, handleLogout, handleClose }) => {
        if (!showModal) return null;
  return (
    <div className={styles.modal}>
         <div className={styles.modalContent}>
        <p className={styles.logout}>Are you sure you want to Logout?</p>
        <button onClick={handleLogout} className={styles.logoutButton}>Yes, Logout</button>
        <button onClick={handleClose} className={styles.cancelButton}>Cancel</button>
      </div>
    </div>
  );
};

export default Logoutmodal;