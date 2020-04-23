import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  EXAMPLES_SEARCH_BOOK_BEGIN,
  EXAMPLES_SEARCH_BOOK_SUCCESS,
  EXAMPLES_SEARCH_BOOK_FAILURE,
  EXAMPLES_SEARCH_BOOK_DISMISS_ERROR,
} from '../../../../src/features/examples/redux/constants';

import {
  searchBook,
  dismissSearchBookError,
  reducer,
} from '../../../../src/features/examples/redux/searchBook';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('examples/redux/searchBook', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchBook succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchBook())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', EXAMPLES_SEARCH_BOOK_BEGIN);
        expect(actions[1]).toHaveProperty('type', EXAMPLES_SEARCH_BOOK_SUCCESS);
      });
  });

  it('dispatches failure action when searchBook fails', () => {
    const store = mockStore({});

    return store.dispatch(searchBook({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', EXAMPLES_SEARCH_BOOK_BEGIN);
        expect(actions[1]).toHaveProperty('type', EXAMPLES_SEARCH_BOOK_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchBookError', () => {
    const expectedAction = {
      type: EXAMPLES_SEARCH_BOOK_DISMISS_ERROR,
    };
    expect(dismissSearchBookError()).toEqual(expectedAction);
  });

  it('handles action type EXAMPLES_SEARCH_BOOK_BEGIN correctly', () => {
    const prevState = { searchBookPending: false };
    const state = reducer(
      prevState,
      { type: EXAMPLES_SEARCH_BOOK_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchBookPending).toBe(true);
  });

  it('handles action type EXAMPLES_SEARCH_BOOK_SUCCESS correctly', () => {
    const prevState = { searchBookPending: true };
    const state = reducer(
      prevState,
      { type: EXAMPLES_SEARCH_BOOK_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchBookPending).toBe(false);
  });

  it('handles action type EXAMPLES_SEARCH_BOOK_FAILURE correctly', () => {
    const prevState = { searchBookPending: true };
    const state = reducer(
      prevState,
      { type: EXAMPLES_SEARCH_BOOK_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchBookPending).toBe(false);
    expect(state.searchBookError).toEqual(expect.anything());
  });

  it('handles action type EXAMPLES_SEARCH_BOOK_DISMISS_ERROR correctly', () => {
    const prevState = { searchBookError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: EXAMPLES_SEARCH_BOOK_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchBookError).toBe(null);
  });
});

