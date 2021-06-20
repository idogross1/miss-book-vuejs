import bookApp from './pages/book-app.js';
import appHeader from './cmps/app-header.js';

const options = {
  el: '#app',

  template: `
    <section>
      <app-header></app-header>
      <book-app></book-app>
    </section>
  `,

  components: {
    bookApp,
    appHeader,
  },
};

const app = new Vue(options);
