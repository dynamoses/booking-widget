<template>
  <div v-if="showBreakdown" class="trip-breakdown-container relative z-50">
    <div
      class="trip-breakdown absolute bottom-0 left-0 right-0 w-full bg-white shadow-xl"
    >
      <div
        class="trip-breakdown__summary px-4 border-b"
        :class="{ 'open py-2': store.breakdownIsOpen }"
      >
        <div class="breakdown-header border-b py-3">
          <h2 class="font-semibold">European Magic</h2>
          <div class="breakdown-duration text-xs">10 days, 9 nights</div>
        </div>
        <div class="breakdown-summary pt-2">
          <div class="breakdown-dates py-2 flex items-center">
            <i class="material-icons list-icon text-xl">date_range</i>
            <span class="text-sm">Sun 04 Oct - Mon 18 Oct</span>
          </div>
          <div class="breakdown-guests py-2 flex items-center">
            <i class="material-icons list-icon text-xl">people_alt</i>
            <span class="text-sm">2 adults, 1 child</span>
          </div>
          <div class="breakdown-rooms py-2 flex items-center justify-between">
            <div class="flex items-center">
              <i class="material-icons list-icon text-2xl">single_bed</i>
              <span class="text-sm">1x Triple</span>
            </div>
            <div class="text-sm">$3,195</div>
          </div>
          <div class="breakdown-discounts py-2 flex justify-between">
            <div class="flex">
              <div class="flex items-start">
                <i class="material-icons list-icon text-base pt-1"
                  >local_offer</i
                >
              </div>
              <div class="text-sm">
                <div class="text-sm">Discounts &amp; Promos</div>
                <div class="text-xs">
                  <strong>EPD</strong> - Pay before 21/11/2020
                </div>
                <div class="text-xs">
                  <strong>EBD</strong> - Book before 10/11/2020
                </div>
              </div>
            </div>
            <div class="flex items-start">
              <div class="text-sm">- $265</div>
            </div>
          </div>
          <div class="mt-2">
            <promo-code></promo-code>
          </div>
        </div>
      </div>
      <your-price-summary></your-price-summary>
      <div
        class="breakdown-trigger flex items-center justify-center cursor-pointer"
        :class="{ open: store.breakdownIsOpen }"
        @click="toggleBreakdown()"
      >
        <div
          class="trigger-text text-center mr-1 text-xxs"
          v-text="store.breakdownIsOpen ? 'Hide breakdown' : 'Trip breakdown'"
        ></div>
        <i
          class="material-icons text-xxs"
          v-text="store.breakdownIsOpen ? 'expand_more' : 'expand_less'"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import YourPriceSummary from "./YourPriceSummary.vue";
import PromoCode from "../components/PromoCode.vue";
export default {
  props: {},
  data() {
    return {};
  },
  components: {
    "your-price-summary": YourPriceSummary,
    "promo-code": PromoCode,
  },
  computed: {
    store() {
      return this.$store.state;
    },
    showBreakdown() {
      if (
        this.store.pagination.activePage === "rooms" ||
        this.store.pagination.activePage === "guest-details"
      ) {
        return true;
      }
    },
  },
  methods: {
    toggleBreakdown() {
      this.$store.dispatch("toggleBreakdown");
    },
  },
};
</script>
