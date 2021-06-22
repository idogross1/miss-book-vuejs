export default {
  props: ['book'],

  template: `
    <div class="result-container">
        <p>{{book.volumeInfo.title}}
        </p>
        <button class="add-book-btn" @click="onAddBook">+</button>
    </div>
    `,

  methods: {
    onAddBook() {
      this.$emit('add');
    },
  },
};
