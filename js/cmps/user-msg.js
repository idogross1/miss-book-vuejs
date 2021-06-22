import { eventBus } from '../services/event-bus-service.js';

export default {
  template: `
    <div v-if="msg" class="user-msg" :class="msg.type">
        <p>{{msg.txt}}</p>
        <router-link v-if="msg.link" :to="msg.link">Check it out</router-link>
        <button @click="close">x</button>
    </div>
    `,

  data() {
    return {
      msg: null,
    };
  },

  created() {
    eventBus.$on('show-msg', this.showMsg);
  },

  destroyed() {
    eventBus.$off('show-msg', this.showMsg);
  },

  methods: {
    showMsg(msg) {
      this.msg = msg;
      setTimeout(() => (this.msg = null), 3000);
    },

    close() {
      this.msg = null;
    },
  },
};
