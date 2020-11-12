<template>
  <div
    class="back-to-top buttons buttons-floating flex-align-center justify-center border border-gray-300"
  >
    <i class="material-icons">arrow_upward</i>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state;
    },
  },
  methods: {},
};
</script>
