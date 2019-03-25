import React, { PureComponent } from "react";
import styles from "./MobileNav.module.css";
import LatestIcon from "../icons/LatestIcon";
import VideosIcon from "../icons/VideosIcon";
import ArticlesIcon from "../icons/ArticlesIcon";

class MobileNav extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div
          className={
            this.props.filter === "latest"
              ? `${styles.filterOption} ${styles.selected}`
              : styles.filterOption
          }
          data-name={`latest`}
          onClick={this.props.filterFunction}
        >
          <LatestIcon />
        </div>
        <div
          className={
            this.props.filter === "videos"
              ? `${styles.filterOption} ${styles.selected}`
              : styles.filterOption
          }
          data-name={`videos`}
          onClick={this.props.filterFunction}
        >
          <VideosIcon />
        </div>
        <div
          className={
            this.props.filter === "articles"
              ? `${styles.filterOption} ${styles.selected}`
              : styles.filterOption
          }
          data-name={`articles`}
          onClick={this.props.filterFunction}
        >
          <ArticlesIcon />
        </div>
      </div>
    );
  }
}
export default MobileNav;
