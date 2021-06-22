import longText from '../cmps/long-text.js';
import reviewAdd from '../cmps/review-add.js';
import review from '../cmps/review.js';
import { booksService } from '../services/books-service.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
  template: `
    <section v-if="book" class="book-details">
      <div class="book-title-box">
        <h3>{{book.title}}</h3>
        <h4>{{book.subtitle}}</h4>
      </div>

      <div class="details-main-box">

        <div class="image-container">
          <img :src="book.thumbnail" alt="">
        </div>


        <div class="details-text">
          <p>By: {{authors}}</p>
          <p>Year: {{book.publishedDate}}, {{age}}</p>
          <p>Page Count: {{book.pageCount}}{{level}}
          </p>
          <p class="categories">Categories: {{categories}}</p>
          <long-text v-if="book.description" :text="book.description"></long-text>
          <p>Language: {{book.language}}</p>
          <p>Price: <span :class="{green: isCheap, red: isExpensive}">{{book.listPrice.amount}}{{currency}}</span></p>
          <!-- <img v-if="book.listPrice.isOnSale" src="../../img/sale.svg"></img> -->
          </div>
        </div>

        <div class="reviews">
          <div class="reviews-container" v-for="review in book.reviews">
            <review :review="review"></review>
            <button class="delete-review-btn" @click="remove(book.id, review.id)">x</button>
          </div>
        </div>

        <router-link :to="'/books/'+prevBookId">Prev Book</router-link>
        <router-link :to="'/books/'+nextBookId">Next Book</router-link>
        
        <review-add :book="book"></review-add>
        
        <div class="close-details-container">
          <!-- <button class = "close-details"@click="$emit('close')">X</button> -->
          <router-link to="/books">Back</router-link>
        </div>
        
      </section>
    `,

  data() {
    return {
      book: null,
      nextBookId: null,
      prevBookId: null,
    };
  },

  watch: {
    '$route.params.bookId': {
      immediate: true,
      handler() {
        const { bookId } = this.$route.params;

        booksService.getById(bookId).then((book) => {
          this.book = book;
        });

        booksService
          .getNextBookId(bookId)
          .then((bookId) => (this.nextBookId = bookId));

        booksService
          .getPrevBookId(bookId)
          .then((bookId) => (this.prevBookId = bookId));
      },
    },
  },

  computed: {
    currency() {
      if (this.book.listPrice.currencyCode === 'USD') return '$';
      if (this.book.listPrice.currencyCode === 'EUR') return '€';
      return '₪';
    },

    level() {
      if (this.book.pageCount > 500) return ', Long Reading 📚';
      if (this.book.pageCount > 200) return ', Decent Reading 📕';
      if (this.book.pageCount < 100) return ', Light Reading';
    },

    age() {
      if (new Date().getFullYear() - this.book.publishedDate > 10)
        return 'Vetran Book';
      if (new Date().getFullYear() - this.book.publishedDate < 1) return 'New!';
    },

    isCheap() {
      if (this.book.listPrice.amount < 20) return true;
      return false;
    },

    isExpensive() {
      if (this.book.listPrice.amount > 150) return true;
      return false;
    },

    categories() {
      return this.book.categories?.join(', ');
    },

    authors() {
      return this.book.authors.join(', ');
    },
  },

  methods: {
    loadBook(bookId) {
      booksService.getById(bookId).then((book) => (this.book = book));
    },

    remove(bookId, reviewId) {
      booksService
        .removeReview(bookId, reviewId)
        .then(() => {
          const msg = {
            txt: 'Deleted review successfuly',
            type: 'success',
          };
          eventBus.$emit('show-msg', msg);
          this.loadBook(bookId);
        })
        .catch((err) => {
          const msg = {
            txt: 'Error, please try again',
            type: 'error',
          };
          eventBus.$emit('show-msg', msg);
        });
    },
  },

  components: {
    longText,
    reviewAdd,
    review,
  },
};
