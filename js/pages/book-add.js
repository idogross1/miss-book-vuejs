import { booksService } from '../services/books-service.js';
import searchResult from '../cmps/search-result.js';

export default {
  template: `
    <div class="book-add">
      <div class="search-bar">
        <input v-model="search" type="text" name="search" placeholder="🔍 Search..." @change=searchGoogleBooks>
      </div>
      <ul class="search-results-list">
        <li v-for= "result in results" :key="result.id" class="search-results-item">
          <search-result :book="result" @add="addBook(result)"></search-result>
        </li>
      </ul>
    </div>
    `,

  data() {
    return {
      search: '',
      results: [],
    };
  },

  methods: {
    searchGoogleBooks() {
      console.log(this.search);
      booksService.googleBooks(this.search).then((books) => {
        console.log(books);
        this.results = books.items;
      });
    },

    addBook(googleBook) {
      booksService.addGoogleBook(googleBook);
    },
  },

  components: {
    searchResult,
  },
};
