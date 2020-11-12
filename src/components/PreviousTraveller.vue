<template>
  <div class="previous-traveller-item inner-section border-b pb-4">
    <label
      :for="inputId('prevTraveller')"
      class="input-container cursor-pointer flex-align-center"
      ><input
        type="checkbox"
        :id="inputId('prevTraveller')"
        name="previous-traveller"
        v-model="guest.isPreviousTraveller"
      /><span class="checkmark"></span
      ><span
        class="text-sm"
        :class="{ 'font-semibold': guest.isPreviousTraveller }"
        >{{ guest.firstName }} {{ guest.middleNames }} {{ guest.lastName }}
      </span></label
    >
    <div v-if="guest.isPreviousTraveller" class="form">
      <div class="form-item">
        <label :for="inputId('tripName')" class="label">Trip name</label>
        <div class="form-input-container">
          <input
            type="text"
            :id="inputId('tripName')"
            placeholder="Trip name"
            v-model="guest.previousTripName"
          />
        </div>
      </div>
      <div class="form-item">
        <label class="label">Date travelled</label>
        <div class="form-input-container date-text">
          <input
            type="text"
            placeholder="MM / YYYY"
            v-model="guest.previousTripDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["index", "guest", "mainguest", "adult", "child"],
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
    // inputId(val) {
    //   if (this.mainguest) {
    //     return val + "-mainguest-" + this.index;
    //   } else {
    //     return val + (this.adult ? "-adult-" : "-child-") + this.index;
    //   }
    // },
  },
  methods: {
    inputId(val) {
      if (this.mainguest) {
        return val + "-mainguest";
      } else {
        return val + (this.adult ? "-adult-" : "-child-") + this.index;
      }
    },
  },
};
</script>
