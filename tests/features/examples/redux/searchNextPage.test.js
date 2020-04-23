import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  EXAMPLES_SEARCH_NEXT_PAGE_BEGIN,
  EXAMPLES_SEARCH_NEXT_PAGE_SUCCESS,
  EXAMPLES_SEARCH_NEXT_PAGE_FAILURE,
  EXAMPLES_SEARCH_NEXT_PAGE_DISMISS_ERROR,
} from '../../../../src/features/examples/redux/constants';

import {
  searchNextPage,
  dismissSearchNextPageError,
  reducer,
} from '../../../../src/features/examples/redux/searchNextPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('examples/redux/searchNextPage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchNextPage succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchNextPage())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', EXAMPLES_SEARCH_NEXT_PAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', EXAMPLES_SEARCH_NEXT_PAGE_SUCCESS);
      });
  });

  it('dispatches failure action when searchNextPage fails', () => {
    const store = mockStore({});

    return store.dispatch(searchNextPage({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', EXAMPLES_SEARCH_NEXT_PAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', EXAMPLES_SEARCH_NEXT_PAGE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchNextPageError', () => {
    const expectedAction = {
      type: EXAMPLES_SEARCH_NEXT_PAGE_DISMISS_ERROR,
    };
    expect(dismissSearchNextPageError()).toEqual(expectedAction);
  });

  it('handles action type EXAMPLES_SEARCH_NEXT_PAGE_BEGIN correctly', () => {
    const prevState = { searchNextPagePending: false };
    const state = reducer(
      prevState,
      { type: EXAMPLES_SEARCH_NEXT_PAGE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchNextPagePending).toBe(true);
  });

  it('handles action type EXAMPLES_SEARCH_NEXT_PAGE_SUCCESS correctly', () => {
    const prevState = { searchNextPagePending: true };
    const state = reducer(
      prevState,
      { type: EXAMPLES_SEARCH_NEXT_PAGE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchNextPagePending).toBe(false);
  });

  it('handles action type EXAMPLES_SEARCH_NEXT_PAGE_FAILURE correctly', () => {
    const prevState = { searchNextPagePending: true };
    const state = reducer(
      prevState,
      { type: EXAMPLES_SEARCH_NEXT_PAGE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchNextPagePending).toBe(false);
    expect(state.searchNextPageError).toEqual(expect.anything());
  });

  it('handles action type EXAMPLES_SEARCH_NEXT_PAGE_DISMISS_ERROR correctly', () => {
    const prevState = { searchNextPageError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: EXAMPLES_SEARCH_NEXT_PAGE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchNextPageError).toBe(null);
  });
});

