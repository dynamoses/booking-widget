<template>
  <div class="success-header section-bg flex flex-col p-10 border-b">
    <i class="material-icons text-6xl text-success">check_circle_outline</i>
    <div class="text-4xl mt-2">Success</div>
    <div class="text-xs">{{ note }}</div>
  </div>
</template>

<script>
import SuccessHeader from "../components/SuccessHeader.vue";
export default {
  props: ["note"],
  components: { "success-header": SuccessHeader },
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
  },
  methods: {
    loadNextPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
  },
};
</script>
