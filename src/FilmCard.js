import React, { PureComponent } from 'react';
import LazyImage from './LazyImage';

class FilmCard extends PureComponent {
  state = {
    isOpen: false
  };

  storeCredits(data) {
    this.setState({
      credits: JSON.parse(data)
    });
  }

  handleError({ errors }) {
    this.setState({
      errors,
      credits: null
    });
  }

  open() {
    const id = this.props.id;
    window.theMovieDb.movies.getCredits({ id }, (data) => this.storeCredits(data), (data) => this.handleError(data));
    this.setState({ isOpen: true });
  }

  close() {
    this.setState({ isOpen: false });
  }

  toggle() {
    this.state.isOpen ? this.close() : this.open();
  }

  render() {
    const { title, poster_path: posterPath, overview, release_date: releaseDate, vote_average: rating } = this.props;
    const { isOpen, credits = {} } = this.state;
    const ratingPercentage = Math.floor(rating * 10);
    const imageClasses = isOpen ? 'u-highest' : 'o-image';
    const modalClasses = isOpen ? 'o-modal o-modal--visible o-container o-container--small' : '';
    const modalRole = isOpen ? 'dialog' : '';

    return (
      <div>
        {isOpen && <div aria-hidden className="c-overlay c-overlay--visible" onClick={() => this.close()} />}
        <div role={modalRole} className={modalClasses}>
          <div className="c-card u-highest">
            <div className="u-centered">
              <LazyImage classes={imageClasses} alt={title} src={`https://image.tmdb.org/t/p/w200${posterPath}`} />
            </div>
            <header className="c-card__header">
              <h2
                className="c-heading u-medium"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {title}
                {isOpen && (
                  <div className="c-heading__sub">
                    Released:
                    <br />
                    {new Date(releaseDate).toDateString()}
                  </div>
                )}
              </h2>
            </header>
            {isOpen && (
              <div className="c-card__body o-panel" style={{ height: '220px' }}>
                <h3 className="c-heading">Rating:</h3>
                <div className="c-progress c-progress--rounded">
                  <div
                    role="progressbar"
                    aria-valuenow={ratingPercentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${ratingPercentage}%` }}
                    className="c-progress__bar c-progress__bar--brand">
                    {ratingPercentage}%
                  </div>
                </div>
                <h3 className="c-heading">Overview</h3>
                {overview}
                <h3 className="c-heading">Cast</h3>
                {credits.cast &&
                  credits.cast.slice(0, 5).map((cast, i) => (
                    <div key={i} className="o-grid u-letter-box-small">
                      <div className="o-grid__cell o-grid__cell--width-50 u-text--quiet">{cast.character}</div>
                      <div className="o-grid__cell o-grid__cell--width-50">{cast.name}</div>
                    </div>
                  ))}
              </div>
            )}
            <footer className="c-card__footer">
              <div className="c-input-group">
                <button className="c-button c-button--block c-button--brand" onClick={() => this.toggle()}>
                  {isOpen ? 'Close' : 'View'}
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default FilmCard;
