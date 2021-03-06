import bookList from '../cmps/book-list.js';
import bookFilter from '../cmps/book-filter.js';
import bookDetails from './book-details.js';

import { booksService } from '../services/books-service.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
  template: `
    <section class="book-app">
        <book-filter @filtered="setFilter"/>
        <!-- <book-list :books="booksToShow" @selected="selectBook"/> -->
        <book-list :books="booksToShow"/>
        <book-details v-if="selectedBook" :book="selectedBook" @close ="closeDetails"/>
        <div :class="{overlay: selectedBook}" @click="closeDetails"></div>
    </section>
  `,

  data() {
    return {
      books: [],
      selectedBook: null,
      filterBy: null,
    };
  },

  created() {
    this.loadBooks();
    eventBus.$on('removeReview', this.removeReview);
  },

  methods: {
    loadBooks() {
      booksService.query().then((books) => (this.books = books));
    },

    closeDetails() {
      this.selectedBook = null;
    },

    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },

  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books;
      const searchStr = this.filterBy.byName.toLowerCase();
      const booksToShow = this.books.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchStr) &&
          book.listPrice.amount > this.filterBy.fromPrice &&
          book.listPrice.amount < (this.filterBy.toPrice || Infinity)
        );
      });
      return booksToShow;
    },
  },

  components: {
    bookList,
    bookFilter,
    bookDetails,
  },
};
