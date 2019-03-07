import React, { PureComponent } from "react";
import styles from "./NavDrawer.module.css";

class NavDrawer extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div
          className={styles.filterOption}
          data-name={`latest`}
          onClick={this.props.filterFunction}
        >
          Latest
        </div>
        <div
          className={styles.filterOption}
          data-name={`videos`}
          onClick={this.props.filterFunction}
        >
          Videos
        </div>
        <div
          className={styles.filterOption}
          data-name={`articles`}
          onClick={this.props.filterFunction}
        >
          Articles
        </div>
      </div>
    );
  }
}

export default NavDrawer;
