import React, { PureComponent } from 'react';

class FilmCard extends PureComponent {
  render() {
    const { title, poster_path: posterPath } = this.props;
    return (
      <div className="c-card u-highest">
        <img alt="placeholder" className="o-image" src={`https://image.tmdb.org/t/p/w200${posterPath}`} />
        <header className="c-card__header">
          <h2
            className="c-heading u-medium"
            style={{ 'white-space': 'nowrap', overflow: 'hidden', 'text-overflow': 'ellipsis' }}>
            {title}
          </h2>
        </header>
        <div className="c-card__body">
          <p className="c-paragraph">
            {/* Lorem ipsum dolor sit amet, feugiat corpora ex eam. Inciderint eloquentiam sea et. */}
          </p>
        </div>
        <footer class="c-card__footer c-card__footer--block">
          <div class="c-input-group">
            <button class="c-button c-button--block c-button--brand">View</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default FilmCard;
