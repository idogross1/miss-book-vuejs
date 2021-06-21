import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import bookApp from './pages/book-app.js';
import bookDetails from './pages/book-details.js';

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
];

export const router = new VueRouter({ routes });
