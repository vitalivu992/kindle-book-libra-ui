import axios from 'axios';
import {
  BOOKS_SEARCH_BOOK_BEGIN,
  BOOKS_SEARCH_BOOK_SUCCESS,
  BOOKS_SEARCH_BOOK_FAILURE,
  BOOKS_SEARCH_BOOK_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function searchBook(args = {}) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: BOOKS_SEARCH_BOOK_BEGIN,
    });
    const { books } = getState();
    const { q, pageSize, currentPage } = books;

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      // const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      const doRequest = axios.get(
        'http://localhost:9001/api/v1/books?page=' +
          currentPage +
          '&size=' +
          pageSize +
          (q && ('&q='+q)),
      );
      // const doRequest = axios.get('http://localhost:9001/api/v1/books');

      doRequest.then(
        res => {
          dispatch({
            type: BOOKS_SEARCH_BOOK_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: BOOKS_SEARCH_BOOK_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSearchBookError() {
  return {
    type: BOOKS_SEARCH_BOOK_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case BOOKS_SEARCH_BOOK_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        searchBookPending: true,
        searchBookError: null,
      };

    case BOOKS_SEARCH_BOOK_SUCCESS:
      // The request is success
      return {
        ...state,
        foundBooks: action.data.content,
        hasPrevPage: !action.data.first,
        hasNextPage: !action.data.last,
        currentPage: action.data.number,
        pageSize: action.data.size,
        totalElements: action.data.totalElements,
        totalPages: action.data.totalPages,

        searchBookPending: false,
        searchBookError: null,
      };

    case BOOKS_SEARCH_BOOK_FAILURE:
      // The request is failed
      return {
        ...state,
        searchBookPending: false,
        searchBookError: action.data.error,
      };

    case BOOKS_SEARCH_BOOK_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        searchBookError: null,
      };

    default:
      return state;
  }
}
