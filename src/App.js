import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  storeResults(data) {
    this.setState({
      data
    });
  }

  handleError({ errors }) {
    this.setState({
      errors,
      data: null
    });
  }

  search(e) {
    const query = e.target.value;

    this.setState({
      query
    });

    window.theMovieDb.search.getMovie({ query }, (data) => this.storeResults(data), (data) => this.handleError(data));
  }

  render() {
    return (
      <div className="u-text u-window-box-super">
        <header>
          <h1 className="c-heading u-large">Search The Movie Database</h1>
        </header>
        <p className="c-paragraph">
          <input
            className="c-field"
            placeholder="e.g Fight Club"
            type="text"
            value={this.state.query}
            onInput={(e) => this.search(e)}
            onChange={(e) => this.search(e)}
          />
        </p>
      </div>
    );
  }
}

export default App;
