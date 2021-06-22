export default {
  props: ['book'],

  template: `
  <!-- <pre>{{book}}</pre> -->
    <div class="book-preview">
    {{book}}
        <h3>{{book.title}}</h3>
        <div class="thumbnail-container">
          <img :src="book.thumbnail" alt="">
        </div>
        <p>Price: {{book.listPrice.amount}}{{currency}}</p>
    </div>
  `,

  computed: {
    currency() {
      if (this.book.listPrice.currencyCode === 'USD') return '$';
      if (this.book.listPrice.currencyCode === 'EUR') return '€';
      return '₪';
    },
  },
};
