<template>
  <div class="people-count-picker flex relative">
    <span
      class="label border section-border relative text-left people-count-picker__button"
      @click="$emit('open-guest-picker')"
    >
      <span class="text-xs" v-if="!adults && !children">Add guests</span>
      <span class="text-xs" v-if="adults || children">
        <span class="mr-1"
          >Adults: {{ store.filters.guestsSelected.adults }},</span
        >
        <span>Children: {{ store.filters.guestsSelected.children }}</span>
      </span>
    </span>
    <div
      v-if="guestpickeractive"
      class="absolute guest-picker section-bg border border-gray-400 w-full p-2"
    >
      <div
        @click="closeGuestPicker()"
        class="guest-picker-close close-button cursor-pointer"
      ></div>
      <div class="guest-picker-header text-center border-b-1">
        <div class="text-base font-semibold">
          How many people are travelling?
        </div>
        <div class="text-xs text-gray-800">
          You can add a maximum of 8 people
        </div>
      </div>
      <div class="pickers mt-2">
        <div
          class="pickers__adults border-b border-gray-300 flex justify-between align-center pb-2 p-2"
        >
          <span class="text-left">
            <div class="adults text-base font-semibold">Adults</div>
            <div class="age-range text-xxs text-gray-700">18+ years</div>
          </span>
          <span class="counter flex-align-center">
            <span
              :class="{
                'pointer-events-none cursor-not-allowed': adults == 0,
              }"
              class="cursor-pointer minus-adult guest-button minus"
              @click="updateSelectedAdults(-1)"
            ></span>
            <span class="count px-3 text-base" v-text="adults"></span>
            <span
              :class="{
                'pointer-events-none cursor-not-allowed': adults == adultMax,
              }"
              class="cursor-pointer plus-adult guest-button plus"
              @click="updateSelectedAdults(1)"
            ></span>
          </span>
        </div>
        <div class="pickers__children flex justify-between pt-1 p-2">
          <span class="text-left">
            <div class="children text-base font-semibold">Children</div>
            <div class="age-range text-xxs text-gray-700">5-17 years</div>
          </span>
          <span class="counter flex-align-center">
            <span
              :class="{
                'pointer-events-none cursor-not-allowed': children == 0,
              }"
              class="cursor-pointer minus-child guest-button minus"
              @click="updateSelectedChildren(-1)"
            ></span>
            <span
              class="count px-3 text-base"
              v-text="children > childrenMax ? childrenMax : children"
            ></span>
            <span
              :class="{
                'pointer-events-none cursor-not-allowed':
                  children == childrenMax,
              }"
              class="cursor-pointer add-child guest-button plus"
              @click="updateSelectedChildren(1)"
            ></span>
          </span>
        </div>
        <div
          class="terms note-info text-left text-xs section-border section-bg p-2 mt-2 mb-4"
        >
          <span class="font-semibold note mr-1">Note:</span>Children must be
          between 5-17 years old at the time of travel for this trip.
        </div>
      </div>
      <div class="guest-picker-footer flex justify-center mb-4">
        <button
          class="close-guest-picker update-guest-picker text-sm buttons buttons-primary"
          @click="updateGuests()"
        >
          Update guests
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    guestpickeractive: {
      type: Boolean,
    },
  },
  data() {
    return {
      adults: 0,
      children: 0,
    };
  },
  computed: {
    store() {
      return this.$store.state;
    },
    adultMax() {
      if (this.children == 4) {
        return 4;
      } else if (this.children == 3) {
        return 5;
      } else if (this.children == 2) {
        return 6;
      } else if (this.children == 1) {
        return 7;
      } else {
        return 8;
      }
    },
    childrenMax() {
      if (this.adults == 1) {
        return 2;
      } else if (this.adults == 2) {
        return 4;
      } else if (this.adults == 3) {
        return 5;
      } else if (this.adults == 4) {
        return 4;
      } else if (this.adults == 5) {
        return 3;
      } else if (this.adults == 6) {
        return 2;
      } else if (this.adults == 7) {
        return 1;
      } else if (this.adults == 8) {
        return 0;
      } else if (this.adults == 0) {
        return 0;
      }
    },
  },
  watch: {
    childrenMax() {
      if (this.children > this.childrenMax) {
        this.children = this.childrenMax;
      }
    },
  },
  methods: {
    updateSelectedAdults(val) {
      this.adults += val;
    },
    updateSelectedChildren(val) {
      this.children += val;
    },
    updateGuests() {
      let adults = this.adults;
      let children = this.children;
      this.$store.dispatch("updateGuests", { adults, children });
      this.$emit("close-guest-picker");
    },
    closeGuestPicker() {
      this.$emit("close-guest-picker");
      this.adults = this.store.filters.guestsSelected.adults;
      this.children = this.store.filters.guestsSelected.children;
    },
  },
};
</script>
