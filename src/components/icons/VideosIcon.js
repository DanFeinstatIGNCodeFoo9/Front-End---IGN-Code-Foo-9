import React from "react";
import styles from "./Icons.module.css";

const VideosIcon = props => {
  return (
    <svg
      onClick={props.filterFunction}
      data-name={`videos`}
      xmlns="http://www.w3.org/2000/svg"
      className={
        props.hovered === "videos"
          ? `${styles.filters} ${styles.btnHovered}`
          : styles.filters
      }
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
    </svg>
  );
};
export default VideosIcon;
