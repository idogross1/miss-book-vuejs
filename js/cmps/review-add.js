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
      var txt = '';
      var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 3; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      this.review.id = txt;
      if (!this.book.reviews) this.book.reviews = [this.review];
      else this.book.reviews.push(this.review);

      const msg = {
        txt: `Review to ${this.book.title} added successfuly`,
        type: 'success',
        link: `/books/${this.book.id}`,
      };

      eventBus.$emit('show-msg', msg);

      booksService.save(this.book).then(this.$router.push('/books'));
    },
  },
};
