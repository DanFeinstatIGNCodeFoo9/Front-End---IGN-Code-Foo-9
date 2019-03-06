import React, { PureComponent } from "react";
import styles from "./FeedItem.module.css";

class FeedItem extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <img
          className={styles.img}
          src={this.props.img}
          alt="article thumbnail"
        />
        <div className={styles.contentContainer}>
          <div className={styles.miniHeader}>
            <span className={styles.date}>{this.props.date}</span> -{" "}
            <span className={styles.comments}>{this.props.commentNumber}</span>
          </div>
          <div className={styles.title}>
            {this.props.title ? this.props.title : this.props.description}
          </div>
        </div>
      </div>
    );
  }
}

export default FeedItem;
