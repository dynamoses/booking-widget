<template>
  <div class="p-4 bg-white">
    <div class="breakdown-price">
      <div class="price-amount flex items-center justify-between">
        <div class="font-semibold text-sm">Your price:</div>
        <div
          class="text-right font-semibold text-base"
          :class="store.breakdownIsOpen ? 'text-red-primary' : null"
        >
          ${{ store.userSelectedData.tripOnlyTotalWithSavings }}
        </div>
      </div>
      <div class="price-amount flex items-center justify-between">
        <div class="text-xxs text-gray-800">
          Price inc. VAT and air taxes
        </div>
        <div class="flex items-center text-xxs">
          <div class="price-was line-through mr-1 text-gray-800">
            ${{ store.userSelectedData.tripOnlyTotalWithoutSavings }}
          </div>
          <div class="font-semibold price-saving text-red-primary">
            Save ${{ store.userSelectedData.discountsAndPromos.totalSavings }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
