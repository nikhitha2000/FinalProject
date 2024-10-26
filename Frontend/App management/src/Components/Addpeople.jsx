// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styles from "../Components/Addpeople.module.css";

const AddPeopleModal = ({ showModal, handleClose }) => {
    const [email, setEmail] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleAddEmail = () => {
        setShowConfirmation(true);
      };
  
    if (!showModal) return null;
  
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
        {!showConfirmation ? (
          <>
          <h3>Add People to the board</h3>
          <input
            type="email"
            placeholder="Enter the email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <div className={styles.buttons}>
            <button onClick={handleClose} className={styles.cancelButton}>Cancel</button>
            <button onClick={handleAddEmail}className={styles.addButton}>Add Email</button>
          </div>
          </>
        ) : (
          <div className={styles.Confirmtion}>
            <p className={styles.confirmEmail}>{email} added to board.</p>
            <button onClick={handleClose} className={styles.confirmButton}>Okay, got it!</button>
          </div>
        )}
        </div>
      </div>
    );
  }
  
  export default AddPeopleModal;