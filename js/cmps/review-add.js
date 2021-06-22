import { booksService } from '../services/books-service.js';
import { eventBus } from '../services/event-bus-service.js';
import review from './review.js';

export default {
  props: ['book'],

  template: `
    <div class="review-add">
        <h4>Add a Review</h4>
        <form @submit.prevent="save">
            <label for="name">Full Name:</label>
            <input v-model="review.name" type="text">
            <label for="date">Read at:</label>
            <input v-model="review.date" type="date">

            <label for="rate">Rate:</label>
            <select v-model="review.rate" type="text">
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>
            <label for="">Write Review:</label>
            <textarea v-model="review.txt" name="review" cols="20" rows="5" placeholder="Review..."></textarea>
            
          <button>Save</button>
        </form>
    </div>`,

  data() {
    return {
      review: {},
    };
  },
  methods: {
    save() {
      booksService
        .addReview(this.book.id, this.review)
        .then(() => {
          const msg = {
            txt: `Review to ${this.book.title} added successfuly`,
            type: 'success',
            link: `/books/${this.book.id}`,
          };
          eventBus.$emit('show-msg', msg);
          this.loadBook(bookId);
        })
        // .catch((err) => {
        //   const msg = {
        //     txt: 'Error, please try again',
        //     type: 'error',
        //   };
        //   eventBus.$emit('show-msg', msg);
        // })
        .finally(this.$router.push('/books'));
    },
  },
};
