export default {
  props: ['text'],

  template: `
        <div class="long-text">
            <p>{{textToShow}}</p>

            <div class="long-text" v-if="longText">
              <button class="read-more-less" @click="readMore =! readMore">
                <span v-if="readMore">Read Less</span>
                <span v-if="!readMore">Read More</span>
              </button>
            </div>
        </div>
    `,

  data() {
    return {
      readMore: false,
      longText: false,
    };
  },

  computed: {
    textToShow() {
      if (this.text.length < 100) return this.text;

      this.longText = true;
      if (this.readMore) return this.text;
      if (!this.readMore) return this.text.substring(0, 99) + '...';
    },
  },
};
