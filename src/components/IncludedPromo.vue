<template>
  <div class="included-promo-item section-border section-bg my-3">
    <div
      class="text-left inner-section"
      :class="{ 'border-b': promo.earlyPayment }"
    >
      <div class="flex-align-center justify-between">
        <div class="text-base font-semibold">{{ promo.name }}</div>
        <div class="promo-amount text-sm text-success font-semibold">
          - ${{ promo.amount }}
        </div>
      </div>
      <div v-if="promo.earlyPayment" class="text-xxs pt-2">
        Applicable when you book this trip before: {{ promo.bookByDate }}
      </div>
    </div>
    <div
      v-if="promo.earlyPayment"
      class="flex-align-center justify-between inner-section"
    >
      <div class="text-xxs text-gray-800">
        Won't make this date?
      </div>
      <div class="flight-remove text-red-primary underline flex-align-center">
        <a class="text-xxs" href="#">Remove</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["promo"],
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
  },
  methods: {},
};
</script>
