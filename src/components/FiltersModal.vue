<template>
  <transition name="fade">
    <div
      v-if="store.filters.filtersModalIsOpen"
      class="modal flex flex-col justify-between"
    >
      <div class="outer-section">
        <div class="modal-header">
          <div class="modal-close" @click="closeFiltersModal()"></div>
          <h2 class="text-center font-semibold text-base">
            Filter departures by...
          </h2>
        </div>
        <div class="filters-container section-bg mt-8">
          <div class="filters-price border-b inner-section">
            <div class="header flex-align-center justify-between">
              <div class="text-sm font-semibold">Pricing</div>
              <div
                class="link-text text-xxs cursor-pointer"
                @click="clearPricing()"
              >
                Clear
              </div>
            </div>
            <div class="flex-align-center form">
              <div class="form-item w-5/12">
                <label class="label text-xs"
                  >Min Price&nbsp;<span class="text-tiny"
                    >(min: {{ store.currency
                    }}{{ minPriceAvailable.toLocaleString() }})</span
                  ></label
                >
                <div
                  class="form-input-container text currency"
                  :data-currency="store.currency"
                >
                  <input
                    type="text"
                    class="min-price currency"
                    v-model="minPriceFormatted"
                    @blur="minPriceLeave()"
                  />
                  <span v-if="minError" class="form-error inline left">{{
                    minError
                  }}</span>
                </div>
              </div>
              <div class="center-line mt-4 mx-3"></div>
              <div class="form-item w-5/12">
                <label class="label"
                  >Max Price&nbsp;<span class="text-tiny"
                    >(max: {{ store.currency
                    }}{{ maxPriceAvailable.toLocaleString() }})</span
                  ></label
                >
                <div
                  class="form-input-container text currency"
                  :data-currency="store.currency"
                >
                  <input
                    type="text"
                    class="max-price currency"
                    v-model="maxPriceFormatted"
                    @blur="maxPriceLeave()"
                  />
                  <span v-if="maxError" class="form-error inline right">{{
                    maxError
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="filters-discounts-promos inner-section border-b">
            <div class="header flex-align-center justify-between">
              <div class="text-sm font-semibold">Discounts &amp; Promos</div>
              <div
                class="link-text text-xxs cursor-pointer"
                @click="checkAllDiscounts()"
              >
                Check all
              </div>
            </div>
            <div class="mt-3">
              <span
                v-for="(filter, index) in filters.discounts"
                :key="index"
                class="inline-block w-1/2"
                ><label
                  :for="filter.filter"
                  class="input-container cursor-pointer flex-align-center"
                  ><input
                    type="checkbox"
                    :id="filter.filter"
                    :name="filter.filter"
                    v-model="filter.isApplied"
                  /><span class="checkmark"></span
                  ><span class="text-xs">{{ filter.name }}</span></label
                ></span
              >
            </div>
          </div>
          <div class="toggle-filters">
            <label
              v-for="(filter, index) in filters.toggleFilters"
              :key="index"
              class="flex-align-center justify-between inner-section input-container"
              :class="{
                'border-b': index < filters.toggleFilters.length - 1,
              }"
            >
              <span class="text-xs">{{ filter.name }}</span>
              <input
                type="checkbox"
                :id="filter.filter"
                :name="filter.filter"
                v-model="filter.isApplied"
              /><span class="slidecheck"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex-align-center justify-between border-t outer-section">
        <div class="flex-align-center w-1/2 justify-center">
          <button
            class="buttons flex-align-center justify-center py-3 px-6 shadow-lg my-2"
            @click="[clearFilters()]"
          >
            <span class="text-sm">Clear all</span>
          </button>
        </div>
        <div class="flex-align-center w-1/2 justify-center">
          <button
            class="buttons buttons-primary flex-align-center justify-center py-3 px-6 shadow-lg my-2"
            @click="[applyFilters()]"
            :class="{ disabled: !applyIsActive }"
          >
            <span class="text-sm">Apply filters</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      applyIsActive: true,
      filtersAreEmpty: true,
      minPriceFormatted: "",
      maxPriceFormatted: "",
      minPriceActive: false,
      maxPriceActive: true,
      minError: "ahhhh",
      maxError: "yeahhh",
      filters: {
        minPrice: 0,
        maxPrice: 0,
        discounts: [
          {
            filter: "lastMinute",
            name: "Last minute",
            isApplied: false,
          },
          {
            filter: "earlyPayment",
            name: "Early payment",
            isApplied: false,
          },
          {
            filter: "frequentTraveller",
            name: "Frequent traveller",
            isApplied: false,
          },
        ],
        toggleFilters: [
          {
            filter: "definiteDepartures",
            name: "Definite Departures",
            isApplied: false,
          },
        ],
        filtersAppliedCount: 0,
      },
    };
  },
  computed: {
    store() {
      return this.$store.state;
    },
    modalOpen() {
      return this.$store.state.filters.filtersModalIsOpen;
    },
    minSelectedPrice() {
      return this.filters.minPrice;
    },
    maxSelectedPrice() {
      return this.filters.maxPrice;
    },
    minPriceAvailable() {
      return Math.min(...this.$store.getters.tripPrices);
    },
    maxPriceAvailable() {
      return Math.max(...this.$store.getters.tripPrices);
    },
    modalOpen() {
      return this.store.filters.filtersModalIsOpen;
    },
    valueErrorMessage() {
      return (
        "Must be between " +
        this.minPriceAvailable.toLocaleString() +
        " and " +
        this.maxPriceAvailable.toLocaleString()
      );
    },
  },
  methods: {
    closeFiltersModal() {
      this.$store.dispatch("closeFiltersModal");

      this.filters.minPrice = this.store.filters.filtersApplied.minPrice;
      this.filters.maxPrice = this.store.filters.filtersApplied.maxPrice;
      this.filters.discounts[0].isApplied = this.store.filters.filtersApplied.lastMinute;
      this.filters.discounts[1].isApplied = this.store.filters.filtersApplied.earlyPayment;
      this.filters.discounts[2].isApplied = this.store.filters.filtersApplied.frequentTraveller;
      this.filters.toggleFilters[0].isApplied = this.store.filters.filtersApplied.definiteDepartures;
    },
    clearFilters() {
      this.filters.minPrice = this.minPriceAvailable;
      this.minPriceFormatted = this.filters.minPrice.toLocaleString();
      this.filters.maxPrice = this.maxPriceAvailable;
      this.maxPriceFormatted = this.filters.maxPrice.toLocaleString();
      this.filters.discounts[0].isApplied = false;
      this.filters.discounts[1].isApplied = false;
      this.filters.discounts[2].isApplied = false;
      this.filters.toggleFilters[0].isApplied = false;
      this.filtersAreEmpty = true;
    },
    applyFilters() {
      let filters = {
        minPrice: this.filters.minPrice,
        maxPrice: this.filters.maxPrice,
        lastMinute: this.filters.discounts[0].isApplied,
        earlyPayment: this.filters.discounts[1].isApplied,
        frequentTraveller: this.filters.discounts[2].isApplied,
        definiteDepartures: this.filters.toggleFilters[0].isApplied,
      };
      let filtersApplied = [
        this.filters.minPrice !== this.minPriceAvailable,
        this.filters.maxPrice !== this.maxPriceAvailable,
        this.filters.discounts[0].isApplied,
        this.filters.discounts[1].isApplied,
        this.filters.discounts[2].isApplied,
        this.filters.toggleFilters[0].isApplied,
      ];
      let filtersAppliedCount = filtersApplied.filter(Boolean).length;
      this.$store.dispatch("applyFilters", { filters, filtersAppliedCount });
      if (!filtersAppliedCount) {
        this.filtersAreEmpty = true;
      } else {
        this.filtersAreEmpty = false;
      }
    },
    clearPricing() {
      this.filters.minPrice = this.minPriceAvailable;
      this.minPriceFormatted = this.filters.minPrice.toLocaleString();
      this.filters.maxPrice = this.maxPriceAvailable;
      this.maxPriceFormatted = this.filters.maxPrice.toLocaleString();
    },
    checkAllDiscounts() {
      this.filters.discounts[0].isApplied = true;
      this.filters.discounts[1].isApplied = true;
      this.filters.discounts[2].isApplied = true;
    },
    minPriceLeave() {
      if (
        this.filters.maxPrice < this.filters.minPrice &&
        this.filters.minPrice <= this.maxPriceAvailable
      ) {
        this.filters.maxPrice = this.filters.minPrice;
        this.maxPriceFormatted = this.filters.maxPrice.toLocaleString();
      }
    },
    maxPriceLeave() {
      if (
        this.filters.minPrice > this.filters.maxPrice &&
        this.filters.maxPrice >= this.minPriceAvailable
      ) {
        this.filters.minPrice = this.filters.maxPrice;
        this.minPriceFormatted = this.filters.minPrice.toLocaleString();
      }
    },
  },
  watch: {
    minSelectedPrice() {
      if (
        this.filters.minPrice < this.minPriceAvailable ||
        this.filters.minPrice > this.maxPriceAvailable
      ) {
        this.minError = this.valueErrorMessage;
        this.applyIsActive = false;
      } else {
        this.minError = "";
        this.applyIsActive = true;
      }
    },
    maxSelectedPrice() {
      if (
        this.filters.maxPrice > this.maxPriceAvailable ||
        this.filters.maxPrice < this.minPriceAvailable
      ) {
        this.maxError = this.valueErrorMessage;
        this.applyIsActive = false;
      } else {
        this.maxError = "";
        this.applyIsActive = true;
      }
    },
    modalOpen() {
      if (this.modalOpen && this.filtersAreEmpty) {
        this.filters.minPrice = this.minPriceAvailable;
        this.filters.maxPrice = this.maxPriceAvailable;
        this.minPriceFormatted = this.minPriceAvailable.toLocaleString();
        this.maxPriceFormatted = this.maxPriceAvailable.toLocaleString();
      }
    },
    minPriceFormatted(val) {
      if (val) {
        this.filters.minPrice = parseInt(val.replaceAll(",", ""));
        this.minPriceFormatted = this.filters.minPrice.toLocaleString();
      }
    },
    maxPriceFormatted(val) {
      if (val) {
        this.filters.maxPrice = parseInt(val.replaceAll(",", ""));
        this.maxPriceFormatted = this.filters.maxPrice.toLocaleString();
      }
    },
  },
};
</script>
