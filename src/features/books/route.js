// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  Layout,
  SearchPage,
  ShowBook,
} from './';

export default {
  path: 'books',
  name: 'Books',
  component: Layout,
  childRoutes: [
    { path: '', name: 'Search page', component: SearchPage },
    { path: 'show', name: 'Show book', component: ShowBook },
  ],
};
