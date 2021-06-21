import bookApp from './pages/book-app.js';
import appHeader from './cmps/app-header.js';
import userMsg from './cmps/user-msg.js';
import { router } from './router.js';

const options = {
  el: '#app',

  router,

  template: `
    <section>
      <userMsg></userMsg>
      <app-header></app-header>
      <router-view></router-view>
      <!-- <book-app></book-app> -->
    </section>
  `,

  components: {
    bookApp,
    appHeader,
    userMsg,
  },
};

const app = new Vue(options);
