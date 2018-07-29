import React, { PureComponent } from 'react';

class LazyImage extends PureComponent {
  state = {};
  elem = React.createRef();
  
  componentDidMount() {
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((data) => {
        if (data[0].isIntersecting) {
          this.loadImage();
          this.cleanup();
        }
      });

      this.io.observe(this.elem.current);
    } else {
      this.loadImage();
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  loadImage() {
    this.setState({ src: this.props.src });
  }

  cleanup() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  render() {
    return (
      <img ref={this.elem} alt={this.props.alt} className={this.props.classes} src={this.state.src} />
    );
  }
}

export default LazyImage;
