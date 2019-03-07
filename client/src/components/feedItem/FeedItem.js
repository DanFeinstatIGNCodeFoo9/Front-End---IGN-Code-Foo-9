import React, { PureComponent } from "react";
import styles from "./FeedItem.module.css";

class FeedItem extends PureComponent {
  state = {
    commentCount: null,
  };
  componentDidUpdate() {
    this.updateCommentCount();
  }

  updateCommentCount = () => {
    let newCommentCount = 0;
    for (let i = 0; i < this.props.comments.length; i++) {
      if (this.props.comments[i].id === this.props.id) {
        newCommentCount += this.props.comments[i].count;
      }
    }
    if (newCommentCount > 0) {
      this.setState({
        commentCount: newCommentCount,
      });
    }
  };

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
            <span className={styles.comments}>{this.state.commentCount}</span>
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
