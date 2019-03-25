import React from "react";
import styles from "./Icons.module.css";

//took the svg icon from the ign website's html, converted it to a react component.

const CommentCountIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={styles.commentCount}
        d="M7.538 11.528l-3.14 2.048a.5.5 0 0 1-.773-.419v-1.993a4.375 4.375 0 0 1 1.749-8.383h5.252a4.374 4.374 0 1 1 0 8.747H7.538z"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default CommentCountIcon;
