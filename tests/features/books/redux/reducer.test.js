import reducer from '../../../../src/features/books/redux/reducer';

describe('books/redux/reducer', () => {
  it('does nothing if no matched action', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: '__UNKNOWN_ACTION_TYPE__' }
    );
    expect(state).toEqual(prevState);
  });

  // TODO: add global reducer test if needed.
});
