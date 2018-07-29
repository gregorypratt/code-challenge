import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilmCard from './FilmCard';

global.theMovieDb = {
  movies: {
    getCredits: jest.fn()
  }
};

describe('FilmCard', () => {
  const props = {
    title: 'test movie',
    poster_path: '/test-img-path',
    overview: 'this is a test',
    release_date: '1999-01-01',
    vote_average: '8.8'
  };

  it('does not fail on mount with no props', () => {
    const component = mount(<FilmCard />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('is unopened', () => {
    const component = mount(<FilmCard {...props} />);
    expect(component.state().isOpen).toEqual(false);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('changes classes on open', () => {
    const component = mount(<FilmCard {...props} />);
    component.find('.c-button').simulate('click');
    expect(toJson(component)).toMatchSnapshot();
  });

  it('fetches the credits on open', () => {
    const component = mount(<FilmCard {...props} />);
    component.find('.c-button').simulate('click');
    expect(global.theMovieDb.movies.getCredits).toBeCalled();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('change state on open', () => {
    const component = mount(<FilmCard {...props} />);
    component.find('.c-button').simulate('click');
    expect(component.state().isOpen).toEqual(true);
    expect(toJson(component)).toMatchSnapshot();
  });  
});
