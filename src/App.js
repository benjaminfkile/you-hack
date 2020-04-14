import React, { Component } from 'react';
import './App.css';
import Search from './Search/Search'
import MediaPlayer from './Controls/MediaPlayer/MediaPlayer'
import Results from './Results/Results'


class App extends Component {
  constructor() {
    super();
    this.state = {
      response: null,
      nowPlaying: null
    }
  }

  searchCallback = (dataFromSearch) => {
    this.setState({ response: dataFromSearch })
  }

  render() {
    return (
      <div className="App">
        <Search callbackFromParent={this.searchCallback} />
        <Results response={this.state.response} />
      </div>
    );
  }

}

export default App;
