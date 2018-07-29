import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';

describe('App', () => {
  it('renders heading and search box', () => {
    const component = mount(<App />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('changes state on input', () => {
    const component = mount(<App />);

    component.instance().handleInput({ target: { value: 'test movie' } });
    expect(component.state()).toEqual({ data: {}, query: 'test movie', searching: true });
  });

  it('changes state on input', () => {
    const component = mount(<App />);

    component.instance().handleInput({ target: { value: 'test movie' } });
    expect(component.state()).toEqual({ data: {}, query: 'test movie', searching: true });
  });

  it('store results updates state correctly', () => {
    const component = mount(<App />);

    component.instance().storeResults(
      JSON.stringify({
        results: []
      })
    );
    expect(component.state()).toEqual({ data: { results: [] }, query: '', searching: false });
  });

  it('handle error updates state correctly', () => {
    const component = mount(<App />);

    component.instance().handleError();

    expect(component.state()).toEqual({ data: null, error: true, query: '', searching: false });
  });
});
