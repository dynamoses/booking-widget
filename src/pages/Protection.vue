<template>
  <transition name="slide-fade">
    <div
      class="outer-section"
      v-if="this.$store.state.pagination.activePage === 'protection'"
      :class="store.state.pagination.direction"
    >
      <button
        class="back-to-quote flex-align-center justify-center buttons buttons-back w-2/5 text-xxs py-2 mb-4"
        @click="loadNextPage('rooms', 'backwards')"
      >
        <i class="material-icons text-base mr-1">arrow_back</i>
        Back to quote
      </button>
      <div class="protection-info mb-4">
        <h1 class="text-left mb-3 font-semibold header-main">
          Travel Protection
        </h1>
        <div class="info-description text-left text-sm">
          <p class="mb-2">
            The safety and security of our guests and staff has been, and will
            always be of the upmost importance to us. As such, travel protection
            is now mandatory for all guests.
          </p>
          <p>
            Please either add our protection below, or you can arrange your own
            and pass along the details at a later date.
          </p>
        </div>
      </div>
      <div
        class="protection-benefits section-bg border rounded-sm text-left mb-3"
      >
        <div class="border-b inner-section">
          <h2 class="font-semibold">Benefits of our protection</h2>
        </div>
        <div class="checklist inner-section border-b">
          <div
            class="flex-align-center text-xs mb-1"
            v-for="benefit in insurance.protectionBenefits"
            :key="benefit.index"
          >
            <i class="material-icons mr-2 text-success">check</i>
            <div class="text-xs">{{ benefit.description }}</div>
          </div>

          <div class="policy-details-link link-text text-xs mt-3">
            Full policy details
          </div>
        </div>
        <div class="inner-section flex-align-center justify-between">
          <div class="text-sm">
            Only <strong>${{ insurance.price }}</strong>
          </div>
          <label
            for="add-insurance"
            class="add-insurance-button flex-align-center buttons buttons-small add-remove-container"
            :class="[
              insuranceAdded ? 'buttons-success added' : 'buttons-add',
              noInsuranceChecked ? 'disabled' : null,
            ]"
          >
            <input
              type="checkbox"
              id="add-insurance"
              v-model="insuranceAdded"
            />
            <span
              class="text-xxs mr-1 add-remove-text"
              v-text="insuranceAdded ? 'Added' : 'Add insurance'"
            ></span>
            <i
              class="material-icons"
              v-text="insuranceAdded ? 'check_circle' : 'add_circle'"
              >add_circle</i
            >
          </label>
        </div>
      </div>
      <div
        class="insurance-opt-in section-bg shadow-lg mb-8"
        :class="{ disabled: insuranceAdded }"
      >
        <label
          for="agree-terms"
          class="input-container cursor-pointer flex-align-center section-border inner-section"
          ><input
            type="checkbox"
            id="agree-terms"
            name="agree-terms"
            v-model="noInsuranceChecked"
          /><span class="checkmark"></span
          ><span class="text-xxs"
            >No thanks, I'll arrange my own insurance</span
          ></label
        >
      </div>
      <div class="w-full flex justify-center">
        <button
          class="buttons buttons-primary flex-align-center justify-center py-3 w-3/4 shadow-lg my-4"
          :class="{ disabled: !noInsuranceChecked && !insuranceAdded }"
          @click="loadNextPage('guest-details', 'forwards')"
        >
          <span class="mr-1 text-base">Continue</span>
          <i class="material-icons text-lg">arrow_forward</i>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      insurance: {
        price: "526",
        protectionBenefits: [
          {
            description:
              "Coverage for all guests, for the duration of your trip",
          },
          {
            description: "Up to $3,000,000 to cover any medical emergencies",
          },
          {
            description: "Lost or delayed baggage",
          },
          {
            description: "Flight delays or cancellations",
          },
          {
            description: "Cancelled or interrupted trips",
          },
        ],
      },
      insuranceAdded: false,
      noInsuranceChecked: false,
    };
  },
  computed: {
    store() {
      return this.$store;
    },
  },
  methods: {
    loadNextPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
  },
};
</script>
