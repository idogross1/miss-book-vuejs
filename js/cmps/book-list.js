import bookPreview from './book-preview.js';

export default {
  props: ['books'],

  template: `
    <ul class="book-list">
        <!-- <pre>{{books}}</pre> -->
        <li v-for= "book in books" :key="book.id" class="book-preview-container">
            <book-preview :book="book" @click.native="select(book)"/>
            <router-link :to="'/books/'+book.id">Details</router-link>
        </li>
    </ul>
  `,

  methods: {
    select(book) {
      console.log('selected book in book-list: ', book.title);
      this.$emit('selected', book);
    },
  },

  components: {
    bookPreview,
  },
};
