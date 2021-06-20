export default {
  props: ['text'],

  template: `
        <div class="long-text">
            <p>{{textToShow}}</p>
            <button class="read-more-less" @click="readMore =! readMore">
                <span v-if="readMore">Read More</span>
                <span v-if="!readMore">Read Less</span>
            </button>
        </div>
    `,

  data() {
    return {
      readMore: true,
    };
  },

  computed: {
    textToShow() {
      if (!this.readMore) return this.text;
      return this.text.substring(0, 99) + '...';
    },
  },
};
