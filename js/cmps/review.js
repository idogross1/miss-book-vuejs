import longText from './long-text.js';

export default {
  props: ['review'],
  template: `
    <article class="review-post">
        <h4>{{review.name}}</h4>
        <div class="date-rating">
            {{review.date}}, {{rate}}
        </div>
        <long-text :text="review.txt"></long-text>
        <!-- <p>{{review.txt}}</p> -->
    </article>
    `,

  computed: {
    rate() {
      console.log(+this.review.rate);
      return '⭐'.repeat(+this.review.rate);
    },
  },

  components: {
    longText,
  },
};
