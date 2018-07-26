import React, { PureComponent } from 'react';
import FilmCard from './FilmCard';

class SearchResults extends PureComponent {
  render() {
    const { total_pages: totalPages, total_results: totalResults, page, results = [] } = this.props;
    return (
      <section>
        <header>{totalResults} results</header>
        <div className="o-grid o-grid--wrap">
          {results.map((result) => (
            <div className="u-letter-box-medium o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@small o-grid__cell--width-33@medium  o-grid__cell--width-25@large">
              <FilmCard {...result} />
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default SearchResults;
