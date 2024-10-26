// eslint-disable-next-line no-unused-vars
import React from "react";
import styles from "../Components/Analytics.module.css";

function Analytics() {
  return (
    <div className={styles.AnalyticsContainer}>
      <h3 className={styles.Title}>Analytics</h3>
      <div className={styles.container}>
        <div className={styles.priorityItem}>
          <span
            className={styles.circle}
            style={{ backgroundColor: "#90c4cc" }}
          ></span>
          <span className={styles.taskItem}>Backlog Tasks</span>
          <div className={styles.count}>16</div>
        </div>
        <div className={styles.priorityItem}>
          <div
            className={styles.circle}
            style={{ backgroundColor: "#90c4cc" }}
          ></div>
          <span className={styles.taskItem}>To-do Tasks</span>
          <span className={styles.count}>14</span>
        </div>
        <div className={styles.priorityItem}>
          <div
            className={styles.circle}
            style={{ backgroundColor: "#90c4cc" }}
          ></div>
          <span className={styles.taskItem}>In Progress Tasks</span>
          <span className={styles.count}>03</span>
        </div>
        <div className={styles.priorityItem}>
          <div
            className={styles.circle}
            style={{ backgroundColor: "#90c4cc" }}
          ></div>
          <span className={styles.taskItem}>Completed Tasks</span>
          <span className={styles.count}>22</span>
        </div>
      </div>
      <div className={styles.chartsContainer}>
        <div className={styles.chart}>
          <span className={styles.colourcircle}></span>
          <h4>Low priority</h4>
          <p>16</p>
        </div>
        <div className={styles.chart}>
          <span className={styles.colourcircle}></span>
          <h4>Moderate priority</h4>
          <p>14</p>
        </div>
        <div className={styles.chart}>
          <span className={styles.colourcircle}></span>
          <h4>High priority</h4>
          <p>03</p>
        </div>
        <div className={styles.chart}>
          <span className={styles.colourcircle}></span>
          <h4>Due Date Tasks</h4>
          <p>03</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
