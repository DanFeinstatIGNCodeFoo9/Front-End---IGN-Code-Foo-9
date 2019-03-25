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
          onMouseEnter={this.props.targetHovered}
          onMouseLeave={this.props.clearHovered}
          onClick={this.props.filterFunction}
        >
          <LatestIcon
            hovered={this.props.hovered}
            filterFunction={this.props.filterFunction}
          />{" "}
          {this.props.width > 600 ? `Latest` : null}
        </div>
        <div
          className={
            this.props.filter === "videos"
              ? `${styles.filterOption} ${styles.selected}`
              : styles.filterOption
          }
          data-name={`videos`}
          onMouseEnter={this.props.targetHovered}
          onMouseLeave={this.props.clearHovered}
          onClick={this.props.filterFunction}
        >
          <VideosIcon
            hovered={this.props.hovered}
            // targetHovered={this.props.targetHovered}
            // clearHovered={this.props.clearHovered}
            filterFunction={this.props.filterFunction}
          />{" "}
          {this.props.width > 600 ? `Videos` : null}
        </div>
        <div
          className={
            this.props.filter === "articles"
              ? `${styles.filterOption} ${styles.selected}`
              : styles.filterOption
          }
          data-name={`articles`}
          onMouseEnter={this.props.targetHovered}
          onMouseLeave={this.props.clearHovered}
          onClick={this.props.filterFunction}
        >
          <ArticlesIcon
            hovered={this.props.hovered}
            // targetHovered={this.props.targetHovered}
            // clearHovered={this.props.clearHovered}
            filterFunction={this.props.filterFunction}
          />{" "}
          {this.props.width > 600 ? `Articles` : null}
        </div>
      </div>
    );
  }
}

export default NavDrawer;
