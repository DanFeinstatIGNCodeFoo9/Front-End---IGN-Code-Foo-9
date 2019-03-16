import React, { Component } from "react";
import { Spring, Transition, animated, config } from "react-spring/renderprops";
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
      <div className={styles.App}>
        <Header />
        <div className={styles.contentContainer}>
          <div />
          <NavDrawer
            className={styles.navbar}
            filterFunction={this.selectFilterOption}
            filter={this.state.filter}
          />
          {/* <Transition
            native
            className={styles.feed}
            items={this.state.filter}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            config={config.stiff}
          >
            {show =>
              show &&
              (props => (
                <animated.div style={props}> */}
          <Feed
            filter={this.state.filter}
            latFilter={this.state.latest}
            vidFilter={this.state.videos}
            artFilter={this.state.articles}
            className={styles.feed}
          />
          {/* </animated.div>
              ))
            }
          </Transition>*/}
        </div>
      </div>
    );
  }
}

export default App;
