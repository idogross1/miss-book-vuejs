import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import bookApp from './pages/book-app.js';
import bookDetails from './pages/book-details.js';
import bookAdd from './pages/book-add.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },

  {
    path: '/books',
    component: bookApp,
  },

  {
    path: '/about',
    component: aboutPage,
  },

  {
    path: '/books/:bookId',
    component: bookDetails,
  },

  {
    path: '/bookAdd',
    component: bookAdd,
  },
];

export const router = new VueRouter({ routes });
