<template>
  <div class="promo-code-container text-left font-semibold form">
    <div class="flex-align-center form-item">
      <div class="promo-code-input form-input-container text w-2/3">
        <input type="text" v-model="promoCode" placeholder="Enter code here" />
      </div>
      <button
        class="buttons buttons-tertiary w-1/3 text-xs py-2 ml-2"
        @click="applyPromoCode()"
      >
        Add code
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      promoCode: "",
    };
  },
  components: {},
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
  },
  methods: {
    applyPromoCode() {
      this.$store.dispatch("applyPromoCode", this.promoCode);
    },
  },
};
</script>
