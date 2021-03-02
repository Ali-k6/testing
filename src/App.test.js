import { shallow } from 'enzyme';
import App from './App';

/**
 * Factory function to create shallowWrapper for App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(parseInt(count)).toBe(0);
});

test('clicking on increment button', () => {
  const wrapper = setup();

  const button = findByTestAttr(wrapper, 'increment-button');

  button.simulate('click');

  const count = findByTestAttr(wrapper, 'count').text();
  expect(parseInt(count)).toBe(1);
});

test('render decrement button', () => {
  const wrapper = setup();

  const decrementButton = findByTestAttr(wrapper, 'decrement-button');

  expect(decrementButton.length).toBe(1);
});

test('clicking on decrement button', () => {
  const wrapper = setup();

  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  const decrementButton = findByTestAttr(wrapper, 'decrement-button');

  decrementButton.simulate('click');

  const count = findByTestAttr(wrapper, 'count').text();
  expect(parseInt(count)).toBe(0);
});

test('render the error message', () => {
  const wrapper = setup();
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(1);
});

test('error message should be hidden when the error is false', () => {
  const wrapper = setup();
  const errorMessage = findByTestAttr(wrapper, 'error-message');

  const hasHiddenClass = errorMessage.hasClass('hidden');

  expect(hasHiddenClass).toBe(true);
});

test('error message should be shown when the error is true', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  const errorMessage = findByTestAttr(wrapper, 'error-message');
  const hasShowClass = errorMessage.hasClass('show');
  expect(hasShowClass).toBe(true);

  const count = findByTestAttr(wrapper, 'count').text();
  expect(parseInt(count)).toBe(0);
});

test('when counter increment or decrement based on value the error show or hidden', () => {
  const wrapper = setup();

  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  let errorMessage = findByTestAttr(wrapper, 'error-message');
  let count = findByTestAttr(wrapper, 'count').text();

  expect(parseInt(count)).toBe(0);

  decrementButton.simulate('click');
  expect(parseInt(count)).toBe(0);
  const hasHiddenClass = errorMessage.hasClass('hidden');
  expect(hasHiddenClass).toBe(true);

  incrementButton.simulate('click');
  errorMessage = findByTestAttr(wrapper, 'error-message');
  const hasShowClass = errorMessage.hasClass('show');
  expect(hasShowClass).toBe(true);
  count = findByTestAttr(wrapper, 'count').text();
  expect(parseInt(count)).toBe(1);
});
