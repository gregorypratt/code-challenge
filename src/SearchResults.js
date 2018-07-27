import React, { PureComponent } from 'react';
import FilmCard from './FilmCard';

class SearchResults extends PureComponent {
  renderTotals() {
    const { total_results: totalResults } = this.props;
    if (!totalResults) return null;

    return <header>{totalResults} results</header>;
  }

  render() {
    const { results = [] } = this.props;
    return (
      <section>
        {this.renderTotals()}
        <div className="o-grid o-grid--wrap">
          {results.map((result, i) => (
            <div key={i} className="u-letter-box-medium o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@small o-grid__cell--width-33@medium  o-grid__cell--width-25@large">
              <FilmCard {...result} />
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default SearchResults;
