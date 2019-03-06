import React, { Component } from "react";
import Feed from "./components/feed/Feed";
import Header from "./components/header/Header";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Feed />
      </div>
    );
  }
}

export default App;
