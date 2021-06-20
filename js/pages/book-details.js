import longText from '../cmps/long-text.js';

export default {
  props: ['book'],

  template: `
        <section class="book-details">
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
              <long-text :text="book.description"></long-text>
              <p>Language: {{book.language}}</p>
              <p>Price: <span :class="{green: isCheap, red: isExpensive}">{{book.listPrice.amount}}{{currency}}</span></p>
              <!-- <img v-if="book.listPrice.isOnSale" src="../../img/sale.svg"></img> -->
            </div>
        </div>
            <div class="close-details-container">
                <button class = "close-details"@click="$emit('close')">X</button>
            </div>
        </section>
    `,

  data() {
    return {};
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
      return this.book.categories.join(', ');
    },

    authors() {
      return this.book.authors.join(', ');
    },
  },

  components: {
    longText,
  },
};
