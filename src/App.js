import React, { Component } from 'react';
import debounce from 'debounce';
import SearchResults from './SearchResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      data: {}
    };
  }

  storeResults(data) {
    this.setState({
      data: JSON.parse(data)
    });
  }

  handleError({ errors }) {
    this.setState({
      errors,
      data: null
    });
  }

  search = debounce((query) => {
    window.theMovieDb.search.getMovie({ query }, (data) => this.storeResults(data), (data) => this.handleError(data));
  }, 1000);

  handleInput(e) {
    const query = e.target.value;

    this.setState({
      query
    });

    this.search(query);
  }

  render() {
    const { data } = this.state;

    return (
      <div className="o-container o-container--large u-text u-window-box-medium">
        <header>
          <h1 className="c-heading u-super">Search The Movie Database</h1>
        </header>
        <p className="c-paragraph">
          <input
            autoFocus
            className="c-field"
            placeholder="e.g Fight Club"
            type="text"
            value={this.state.query}
            onInput={(e) => this.handleInput(e)}
          />
        </p>
        <SearchResults {...data} />
      </div>
    );
  }
}

export default App;
