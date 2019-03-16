import React, { Component } from "react";
import styles from "./FeedItem.module.css";
import CommentCountIcon from "../icons/CommentCountIcon";

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: null,
    };
  }

  componentDidMount() {
    this.updateCommentCount();
  }
  componentDidUpdate(prevState) {
    // console.log(this.props.img.url);
    // console.log(prevState);
    if (this.props.comments && this.props.comments !== prevState.comments) {
      let newCommentCount = 0;
      for (let i = 0; i < this.props.comments.length; i++) {
        if (this.props.comments[i].id === this.props.id) {
          newCommentCount += this.props.comments[i].count;
        }
      }
      //   console.log("function running test");
      if (newCommentCount > 0) {
        this.setState({
          commentCount: newCommentCount,
        });
      }
    }
  }

  updateCommentCount = previousProps => {
    if (this.props.comments && this.props.comments !== previousProps) {
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
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <img
          className={styles.img}
          src={this.props.img.url !== undefined ? this.props.img.url : null}
          alt="article thumbnail"
        />

        <span className={styles.date}>{this.props.date}</span>
        <span className={styles.dash}> - </span>
        <CommentCountIcon />
        <span className={styles.comments}>{this.state.commentCount}</span>

        <div className={styles.title}>
          {this.props.title ? this.props.title : this.props.description}
        </div>
      </div>
    );
  }
}

export default FeedItem;
