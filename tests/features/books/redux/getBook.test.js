import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  BOOKS_GET_BOOK_BEGIN,
  BOOKS_GET_BOOK_SUCCESS,
  BOOKS_GET_BOOK_FAILURE,
  BOOKS_GET_BOOK_DISMISS_ERROR,
} from '../../../../src/features/books/redux/constants';

import {
  getBook,
  dismissGetBookError,
  reducer,
} from '../../../../src/features/books/redux/getBook';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('books/redux/getBook', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getBook succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getBook())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BOOKS_GET_BOOK_BEGIN);
        expect(actions[1]).toHaveProperty('type', BOOKS_GET_BOOK_SUCCESS);
      });
  });

  it('dispatches failure action when getBook fails', () => {
    const store = mockStore({});

    return store.dispatch(getBook({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BOOKS_GET_BOOK_BEGIN);
        expect(actions[1]).toHaveProperty('type', BOOKS_GET_BOOK_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetBookError', () => {
    const expectedAction = {
      type: BOOKS_GET_BOOK_DISMISS_ERROR,
    };
    expect(dismissGetBookError()).toEqual(expectedAction);
  });

  it('handles action type BOOKS_GET_BOOK_BEGIN correctly', () => {
    const prevState = { getBookPending: false };
    const state = reducer(
      prevState,
      { type: BOOKS_GET_BOOK_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getBookPending).toBe(true);
  });

  it('handles action type BOOKS_GET_BOOK_SUCCESS correctly', () => {
    const prevState = { getBookPending: true };
    const state = reducer(
      prevState,
      { type: BOOKS_GET_BOOK_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getBookPending).toBe(false);
  });

  it('handles action type BOOKS_GET_BOOK_FAILURE correctly', () => {
    const prevState = { getBookPending: true };
    const state = reducer(
      prevState,
      { type: BOOKS_GET_BOOK_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getBookPending).toBe(false);
    expect(state.getBookError).toEqual(expect.anything());
  });

  it('handles action type BOOKS_GET_BOOK_DISMISS_ERROR correctly', () => {
    const prevState = { getBookError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: BOOKS_GET_BOOK_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getBookError).toBe(null);
  });
});

