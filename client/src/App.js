import React, { Component } from "react";
import Feed from "./components/feed/Feed";
import Header from "./components/header/Header";
import NavDrawer from "./components/navDrawer/NavDrawer";
import styles from "./App.module.css";

class App extends Component {
  state = {
    filter: "latest",
  };

  selectFilterOption = e => {
    let filterChoice = e.target.dataset.name;
    this.setState({
      filter: filterChoice,
    });
  };

  render() {
    return (
      <div className={styles.App}>
        <Header />
        <div className={styles.contentContainer}>
          <NavDrawer filterFunction={this.selectFilterOption} />
          <Feed filter={this.state.filter} />
        </div>
      </div>
    );
  }
}

export default App;
