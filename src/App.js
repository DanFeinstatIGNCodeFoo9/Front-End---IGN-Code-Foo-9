import React, { Component } from "react";
import Feed from "./components/feed/Feed";
import Header from "./components/header/Header";
import NavDrawer from "./components/navDrawer/NavDrawer";
import styles from "./App.module.css";

class App extends Component {
  state = {
    filter: "latest",
    latest: true,
    videos: false,
    articles: false,
    width: window.innerWidth,
    height: window.innerHeight,
    hovered: null,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  targetHovered = e => {
    let hovered = e.target.dataset.name;
    if (hovered !== this.state.filter) {
      this.setState({
        hovered: hovered,
      });
    }
  };
  clearHovered = e => {
    this.setState({
      hovered: null,
    });
  };

  selectFilterOption = e => {
    let filterChoice = e.target.dataset.name;
    if (filterChoice === `articles`) {
      this.setState(
        {
          filter: filterChoice,
          latest: false,
          videos: false,
        },
        () => {
          setTimeout(() => {
            this.setState(state => ({
              articles: true,
            }));
          }, 300);
        }
      );
    } else if (filterChoice === `videos`) {
      this.setState(
        {
          filter: filterChoice,

          articles: false,
          latest: false,
        },
        () => {
          setTimeout(() => {
            this.setState(state => ({
              videos: true,
            }));
          }, 300);
        }
      );
    } else {
      this.setState(
        {
          filter: filterChoice,
          articles: false,
          videos: false,
        },
        () => {
          setTimeout(() => {
            this.setState(state => ({
              latest: true,
            }));
          }, 300);
        }
      );
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.App}>
          <Header className={styles.header} />
          <div className={styles.contentContainer}>
            <div />

            <NavDrawer
              className={styles.navbar}
              filterFunction={this.selectFilterOption}
              filter={this.state.filter}
              hovered={this.state.hovered}
              targetHovered={this.targetHovered}
              clearHovered={this.clearHovered}
              width={this.state.width}
            />
            <Feed
              filter={this.state.filter}
              latFilter={this.state.latest}
              vidFilter={this.state.videos}
              artFilter={this.state.articles}
              className={styles.feed}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
