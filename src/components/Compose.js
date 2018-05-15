import React, { Component } from "react";
import { handleSaveTweet } from "../actions/tweets";
import {connect} from 'react-redux'

class Compose extends Component {
  state = {
    text: ""
  };
  onSubmitHandler(text) {

    this.props.dispatch(handleSaveTweet({text}));
    // console.log(text);
  }
  render() {
    return (
      <div className="container">
        <h2>Compose new Tweet</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.onSubmitHandler(this.state.text)
        }}>
          <textarea
            rows="10"
            name="text"
            onChange={e => {
              this.setState({ text: e.target.value });
            }}
          />
          <button className="btn-tweet">submit</button>
        </form>
      </div>
    );
  }
}

export default connect()(Compose);
