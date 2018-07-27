import React, { PureComponent } from 'react';
import LazyImage from './LazyImage';

class FilmCard extends PureComponent {
  state = {
    isOpen: false
  };

  open() {
    this.setState({ isOpen: true });
  }

  close() {
    this.setState({ isOpen: false });
  }

  toggle() {
    this.state.isOpen ? this.close() : this.open();
  }

  render() {
    const { title, poster_path: posterPath } = this.props;
    const { isOpen } = this.state;
    const modalClasses = isOpen ? 'o-modal o-modal--visible' : '';
    const modalRole = isOpen ? 'dialog' : '';

    return (
      <div>
        {isOpen ? <div aria-hidden className="c-overlay c-overlay--visible" onClick={() => this.close()} /> : null}
        <div role={modalRole} className={modalClasses}>
          <div className="c-card u-highest">
            <LazyImage alt={title} src={`https://image.tmdb.org/t/p/w200${posterPath}`} />
            <div className="c-card__body">
              <p
                className="c-heading u-medium"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {title}
              </p>
            </div>
            <footer className="c-card__footer c-card__footer--block">
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
