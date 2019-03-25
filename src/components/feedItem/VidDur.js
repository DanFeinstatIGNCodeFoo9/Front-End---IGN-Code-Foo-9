import React from "react";
import styles from "./VidDur.module.css";
import VideoDurationIcon from "../icons/VideoDurationIcon";

const VidDur = props => {
  return (
    <div className={styles.container}>
      <VideoDurationIcon />
      <span className={styles.content}>{props.duration}</span>
    </div>
  );
};

export default VidDur;
