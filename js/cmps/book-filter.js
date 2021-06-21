export default {
  template: `
    <section class="book-filter">
        <label>Search:</label>
        <input v-model=filterBy.byName type="text" @input="filter" placeholder="Search">
        <label>Show books from:</label>
        <input v-model=filterBy.fromPrice type="number" @input="filter">
        <label>To:</label>
        <input v-model=filterBy.toPrice type="number" @input="filter">

    </section>
    `,

  data() {
    return {
      filterBy: {
        byName: '',
        fromPrice: 0,
        toPrice: Infinity,
      },
    };
  },

  methods: {
    filter() {
      this.$emit('filtered', { ...this.filterBy });
    },
  },
};
