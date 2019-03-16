import React, { PureComponent } from "react";
import styles from "./NavDrawer.module.css";
import LatestIcon from "../icons/LatestIcon";
import VideosIcon from "../icons/VideosIcon";
import ArticlesIcon from "../icons/ArticlesIcon";

class NavDrawer extends PureComponent {
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
          <LatestIcon /> Latest
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
          <VideosIcon /> Videos
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
          <ArticlesIcon /> Articles
        </div>
      </div>
    );
  }
}

export default NavDrawer;
